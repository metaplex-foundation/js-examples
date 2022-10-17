const {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} = require("@metaplex-foundation/js");
const {
  Connection,
  clusterApiUrl,
  PublicKey,
  Keypair,
} = require("@solana/web3.js");
const fs = require("fs");
const express = require("express");

const pathToMyKeypair = process.env.HOME + "/.config/solana/id.json";
const keypairFile = fs.readFileSync(pathToMyKeypair);
const secretKey = Buffer.from(JSON.parse(keypairFile.toString()));
const keypair = Keypair.fromSecretKey(secretKey);

const app = express();

const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(keypair))
  .use(bundlrStorage({ address: "https://devnet.bundlr.network" }));

app.get("/getNFT", async (req, res) => {
  let mintAddress = req.query.mint;

  if (!mintAddress) {
    res.status(400).json({
      err: "Mint Address Not Provided",
    });
  }

  try {
    const nft = await metaplex.nfts().findByMint({ mintAddress: new PublicKey(mintAddress) });
    res.json(nft);
  } catch (err) {
    res.send(err);
  }
});

app.listen(3000, () => console.log("Server is running over PORT 3000"));
