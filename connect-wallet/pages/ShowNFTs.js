import styles from '../styles/Home.module.css'
import { useMetaplex } from "./useMetaplex";
import { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';

export const ShowNFTs = (props) => {
    const { metaplex } = useMetaplex();
    const wallet = useWallet();

    const [nft, setNft] = useState(null);
    const onClick = async () => {
        let myNfts = await metaplex.nfts().findAllByOwner(metaplex.identity().publicKey);
        if(!myNfts.length) {
          setNft(null);
          return;
        }
        let randIdx = Math.floor(Math.random() * myNfts.length);
        await myNfts[randIdx].metadataTask.run();
        setNft(myNfts[randIdx]);
    };

    return wallet.connected && (
      <div>
        <select onChange={props.onClusterChange} className={styles.dropdown}>
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
                value={nft ? nft.mint.toBase58() : ""}
                readOnly
              />
            <button onClick={onClick}>Pick Random NFT</button>
            </div>
            {nft && (
              <div className={styles.nftPreview}>
                <h1>{nft.name}</h1>
                <img
                  src={nft.metadata.image || '/fallbackImage.jpg'}
                  alt="The downloaded illustration of the provided NFT address."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
};
