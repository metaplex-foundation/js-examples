const { Metaplex, keypairIdentity, bundlrStorage } = require("@metaplex-foundation/js");
const { Connection, clusterApiUrl, PublicKey, Keypair } = require("@solana/web3.js");
const fs = require('fs');
const express = require('express');

const pathToMyKeypair = process.env.HOME + '/.config/solana/id.json';
const keypairFile = fs.readFileSync(pathToMyKeypair);
const secretKey = Buffer.from(JSON.parse(keypairFile.toString()));
const myKeyPair = Keypair.fromSecretKey(secretKey);

const app = express();

const connection = new Connection(clusterApiUrl('devnet'));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(myKeyPair))
  .use(bundlrStorage());

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
