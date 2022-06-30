import styles from '../styles/Home.module.css'
import { useMetaplex } from "./useMetaplex";
import { useState } from "react";

export const ShowNFTs = () => {
    const { metaplex } = useMetaplex();

    const [nft, setNft] = useState(null);
    const onClick = async () => {
        const myNfts = await metaplex.nfts().findAllByOwner(metaplex.identity().publicKey);
        let randIdx = Math.floor(Math.random() * myNfts.length);
        setNft(myNfts[randIdx]);
    };

    return (
      <div>
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
                  src={nft.metadata.image}
                  alt="The downloaded illustration of the provided NFT address."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
};
