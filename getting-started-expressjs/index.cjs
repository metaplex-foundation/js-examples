const { Metaplex, keypairIdentity, mockStorage } = require("@metaplex-foundation/js");
const { Connection, clusterApiUrl, PublicKey, Keypair } = require("@solana/web3.js");
const express = require('express');

const kp = require('./keypair.json');
const app = express();

const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const myKeyPair = Keypair.fromSecretKey(secret);


const connection = new Connection(clusterApiUrl('devnet'));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(myKeyPair))
  .use(mockStorage());

app.get('/getNFT', async (req, res) => {
    let mintAddress = req.query.mint;

    if(!mintAddress){
        res.status(404).json({
            err:"Mint Address Not Provided"
        });
    }

    try {
        const mint = new PublicKey(mintAddress);
        const nft = await metaplex.nfts().findByMint(mint);
        res.json(nft);
    } catch(err){
        res.send(err);
    }

});

app.listen(3000, () => console.log("Server is running over PORT 3000"));
