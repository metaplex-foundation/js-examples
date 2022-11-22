import "./App.css";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from "react";


function App() {
  const [address, setAddress] = useState(
    "3ijFZcJKmp1EnDbbuaumWYvEFbztx9NRupwTXTchK9bP"
  );

  const [candy, setCandy] = useState(null);

  const connection = new Connection(clusterApiUrl("devnet"));
  const wallet = useWallet();
  const mx = Metaplex.make(connection);
  mx.use(walletAdapterIdentity(wallet));
  const collectionUpdateAuthority = new PublicKey("9eYgKf44KuPocpSpC3QtLqkjtMjHTbUP4KgrC7mYz4GM");
  
  const mintNft = async () => {
    const { nft } = await mx.candyMachines().mint({
      address,
      collectionUpdateAuthority,
    });



    //setNft(asset);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">NFT Mint Address</h1>
        <div className="nftForm">
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <button onClick={mintNft}>Fetch</button>
        </div>
        {/* {nft && (
          <div className="nftPreview">
            <h1>{nft.name}</h1>
            <img
              src={nft.json.image}
              alt="The downloaded illustration of the provided NFT address."
            />
          </div>
        )} */}
      </div>
    </div>
  );
}

export default App;
