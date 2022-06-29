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
          <div className="container">
            <h1 className="title">NFT Mint Address</h1>
            <div className="nftForm">
              <input
                type="text"
                value={nft ? nft.mint.toBase58() : ""}
                readOnly
              />
            <button onClick={onClick}>Pick Random NFT</button>
            </div>
            {nft && (
              <div className="nftPreview">
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
