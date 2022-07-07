# Getting Started with Metaplex and Express.js

This example sets up a new Express.js app with Metaplex.

The Express.js app contains one route that accepts a mint address and returns the associated NFT object as the response. It requires [Node.js](https://nodejs.org/) to run.

1. **Create a new Express.js project.**

   ```sh
    mkdir getting-started-expressjs
    cd getting-started-expressjs
    npm init -y
    npm install express
   ```

2. **Install the Metaplex and Solana SDKs.**

   ```sh
   npm install @metaplex-foundation/js @solana/web3.js
   ```

3. **Create your index file.**

   Create a new index file that will be the main entry point for your app.

   ```sh
   touch index.cjs
   ```

   Then, **copy/paste the source code from [`index.cjs`](./index.cjs)** inside that file.

4. **Provide the path to your keypair.**

   Ensure the `pathToMyKeypair` points to whichever local keypair you want to use.

   ```js
   const pathToMyKeypair = process.env.HOME + "/.config/solana/id.json";
   ```

5. **Run the server.**

   ```sh
   node index.cjs
   ```

6. **Send a request to your server.**

   Open the following URL in your browser:
   
   [http://localhost:3000/getNFT?mint=xxx](http://localhost:3000/getNFT?mint=xxx)
   
   Where `xxx` is the mint address of the NFT you want to query.

7. **That's it.** 🎉

   Feel free to play with the [`index.cjs`](./index.cjs) to see what else you can do with the Metaplex JS SDK.


## Learn More

Here are some useful resources for you if you'd like to learn more about the Metaplex JS SDK:
- [Metaplex JS SDK](https://github.com/metaplex-foundation/js).
- [Metaplex JS Examples](https://github.com/metaplex-foundation/js-examples).
