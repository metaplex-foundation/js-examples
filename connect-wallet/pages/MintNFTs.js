import styles from "../styles/Home.module.css";
import { useMetaplex } from "./useMetaplex";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export const MintNFTs = ({ onClusterChange }) => {
  const { metaplex } = useMetaplex();
  const wallet = useWallet();

  const [nft, setNft] = useState(null);

  const [disableMint, setDisableMint] = useState(true);

  const candyMachineAddress = new PublicKey(
    process.env.NEXT_PUBLIC_CANDY_MACHINE_ID
  );
  let candyMachine;
  let walletBalance;

  const refreshStatus = async () => {
    candyMachine = await metaplex
      .candyMachines()
      .findByAddress({ address: candyMachineAddress });

    //wallet connected?
    if (!wallet.connected) {
      setDisableMint(true);
      return;
    }

    //enough items available?
    if (
      candyMachine.itemsMinted.toString(10) -
      candyMachine.itemsAvailable.toString(10) >
      0
    ) {
      console.error("not enough items available");
      setDisableMint(true);
      return;
    }

    // guard checks have to be done for the relevant guard group! Example is for the default group

    const guard = candyMachine.candyGuard.guards;
    console.log(guard);

    if (guard.startDate != null) {
      // Calculate current time based on Solana BlockTime which the on chain program is using! 
      const slot = await metaplex.connection.getSlot();
      const solanaTime = await metaplex.connection.getBlockTime(slot);
      const candyStartDate = guard.startDate.date.toString(10);
      if (solanaTime < candyStartDate) {
        console.log("startDate: CM not live yet");
        setDisableMint(true);
        return;
      }
    }

    if (guard.mintLimit != null) {
      const mitLimitCounter = metaplex.candyMachines().pdas().mintLimitCounter({
        id: 1,                                // use value from your config
        user: metaplex.identity().publicKey,
        candyMachine: candyMachine.address,
        candyGuard: candyMachine.candyGuard.address,
      });
      //Read Data from chain
      const mintedAmountBuffer = await metaplex.connection.getAccountInfo(mitLimitCounter, "processed");
      const mintedAmount = mintedAmountBuffer.data.readUintLE(0, 1);
      if (mintedAmount >= guard.mintLimit.limit) {
        console.error("mintLimit: mintLimit reached!");
        setDisableMint(true);
        return;
      }
    }

    if (guard.solPayment != null) {
      walletBalance = await metaplex.connection.getBalance(
        metaplex.identity().publicKey
      );

      const costInLamports = guard.solPayment.amount.basisPoints.toString(10);

      if (costInLamports > walletBalance) {
        console.error("solPayment: Not enough SOL!");
        setDisableMint(true);
        return;
      }
    }

    if (guard.nftPayment != null) {
      const ownedNfts = await metaplex.nfts().findAllByOwner({ owner: metaplex.identity().publicKey });
      const nftsInCollection = ownedNfts.filter(obj => {
        return (obj.collection?.address.toBase58() === guard.nftPayment.requiredCollection.toBase58()) && (obj.collection?.verified === true);
      });
      if (nftsInCollection.length < 1) {
        console.error("nftPayment: The user has no NFT to pay with!");
        setDisableMint(true);
        return;
      }
    }

    if (guard.redeemedAmount != null) {
      if (guard.redeemedAmount.maximum.toString(10) <= candyMachine.itemsMinted.toString(10)) {
        console.error("redeemedAmount: Too many NFTs have already been minted!");
        setDisableMint(true);
        return;
      }
    }

    if (guard.tokenBurn != null) {
      const ata = await metaplex.tokens().pdas().associatedTokenAccount({ mint: guard.tokenBurn.mint, owner: metaplex.identity().publicKey });
      const balance = await metaplex.connection.getTokenAccountBalance(ata);
      if (balance < guard.tokenBurn.amount.basisPoints.toNumber()) {
        console.error("tokenBurn: Not enough SPL tokens to burn!");
        setDisableMint(true);
        return;
      }
    }

    if (guard.tokenGate != null) {
      const ata = await metaplex.tokens().pdas().associatedTokenAccount({ mint: guard.tokenGate.mint, owner: metaplex.identity().publicKey });
      const balance = await metaplex.connection.getTokenAccountBalance(ata);
      console.log(ata.toBase58());

      if (balance < guard.tokenGate.amount.basisPoints.toNumber()) {
        console.error("tokenGate: Not enough SPL tokens!");
        setDisableMint(true);
        return;
      }
    }

    if (guard.tokenPayment != null) {
      const ata = await metaplex.tokens().pdas().associatedTokenAccount({ mint: guard.tokenPayment.mint, owner: metaplex.identity().publicKey });
      const balance = await metaplex.connection.getTokenAccountBalance(ata);
      if (balance < guard.tokenPayment.amount.basisPoints.toNumber()) {
        console.error("tokenPayment: Not enough SPL tokens to pay!");
        setDisableMint(true);
        return;
      }
    }

    //good to go!
    setDisableMint(false);
  };

  if (!wallet.connected) {
    return null;
  } else {
    refreshStatus();
  }

  const onClick = async () => {
    const { nft } = await metaplex.candyMachines().mint({
      candyMachine,
      collectionUpdateAuthority: candyMachine.authorityAddress,
    });

    setNft(nft);
  };

  return (
    <div>
      <select onChange={onClusterChange} className={styles.dropdown}>
        <option value="devnet">Devnet</option>
        <option value="mainnet">Mainnet</option>
        <option value="testnet">Testnet</option>
      </select>
      <div>
        <div className={styles.container}>
          <h1 className={styles.title}>NFT Mint Address</h1>
          <div className={styles.nftForm}>
            <input
              type="text"
              value={nft ? nft.mint.address.toBase58() : ""}
              readOnly
            />
            <button onClick={onClick} disabled={disableMint}>
              mint NFT
            </button>
          </div>
          {nft && (
            <div className={styles.nftPreview}>
              <h1>{nft.name}</h1>
              <img
                src={nft?.json?.image || "/fallbackImage.jpg"}
                alt="The downloaded illustration of the provided NFT address."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
