import React, { useState } from 'react';
import { Metaplex } from '@metaplex-foundation/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import './App.css';

const test = {
  data: [
    'BPxGoOzeGGjxly7jXqYh1hIw7l6AJBXe8im3LLzc9LXoKGf14QjBQXKV1rIL+ncyYUmzPnalPz5GFRgmpPNCtpogAAAAR29sZGVuIFNvbGZsYWtlAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAMgAAABodHRwczovL2Fyd2VhdmUubmV0LzViZDU4ZjRWNFVFdVRsMU1HRlgxZG4xdHUzZFFUS1dvN2ZDZVp5RXFRemMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPQBAQQAAAD1QOMMYBRP5T5vyxs8z94/5HDyZNyc6oR3kyuaShpmBgEAlJ/LIo3zYjKjDiDhxGgf6JjcA1x5ONmW8BBXnlBemvEBIQtnSjh1Pd0x6DqBr/sQt2njrr8sOH1/FkmKaJwUS5XDACEBKiPSwaeJrABSHfscrCYN3cMu34ExqLbUKTFiIazMXQAiAQEB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
    'base64',
  ],
  executable: false,
  lamports: 5616720,
  owner: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  rentEpoch: 337,
};

const connection = new Connection(clusterApiUrl('devnet'));
const mx = Metaplex.make(connection);

function App() {
  const [address, setAddress] = useState(
    '3ijFZcJKmp1EnDbbuaumWYvEFbztx9NRupwTXTchK9bP',
  );
  const [nft, setNft] = useState(null);

  function getAccountParsingFunction(parser) {
  function parse(account) {
    if ('exists' in account && !account.exists) {
      return account;
    }

    try {
      const data = parser.deserialize(account.data)[0];
      return { ...account, data };
    } catch (error) {
      console.log(error);
    }
  }

  return parse;
}
  const fetchNft = async () => {

    console.log(Buffer.from(
      'BPxGoOzeGGjxly7jXqYh1hIw7l6AJBXe8im3LLzc9LXoKGf14QjBQXKV1rIL+ncyYUmzPnalPz5GFRgmpPNCtpogAAAAR29sZGVuIFNvbGZsYWtlAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAMgAAABodHRwczovL2Fyd2VhdmUubmV0LzViZDU4ZjRWNFVFdVRsMU1HRlgxZG4xdHUzZFFUS1dvN2ZDZVp5RXFRemMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPQBAQQAAAD1QOMMYBRP5T5vyxs8z94/5HDyZNyc6oR3kyuaShpmBgEAlJ/LIo3zYjKjDiDhxGgf6JjcA1x5ONmW8BBXnlBemvEBIQtnSjh1Pd0x6DqBr/sQt2njrr8sOH1/FkmKaJwUS5XDACEBKiPSwaeJrABSHfscrCYN3cMu34ExqLbUKTFiIazMXQAiAQEB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
      'base64'
    ).readUInt8(23));

    const parse = getAccountParsingFunction(Metadata);
    console.log(parse(test));

    const nft = await mx.nfts().findByMint(new PublicKey(address));
    setNft(nft);
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
          <button onClick={fetchNft}>Fetch</button>
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
  );
}

export default App;
