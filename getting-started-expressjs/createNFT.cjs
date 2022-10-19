const {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} = require("@metaplex-foundation/js");
const { Connection, clusterApiUrl, Keypair } = require("@solana/web3.js");
const fs = require("fs");

const pathToMyKeypair = process.env.HOME + "/.config/solana/id.json";
const keypairFile = fs.readFileSync(pathToMyKeypair);
const secretKey = Buffer.from(JSON.parse(keypairFile.toString()));
const myKeyPair = Keypair.fromSecretKey(secretKey);

const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(myKeyPair))
  .use(bundlrStorage({ address: "https://devnet.bundlr.network" }));

const uploadNFT = async () => {
  const { uri } = await metaplex.nfts().uploadMetadata({
    name: "Metadata NFT",
  });

  const { nft } = await metaplex.nfts().create({
    name: "First NFT",
    uri: uri,
  });

  console.log(nft.mint.address.toBase58());
};

uploadNFT();
