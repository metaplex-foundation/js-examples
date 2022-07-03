# Connect Wallet in the Browser

This example sets up a new React app with Metaplex using Next.js.

This tutorial shows how to connect your wallet to the browser via [Solana Wallet Adapter Library](https://github.com/solana-labs/wallet-adapter), and use the [Metaplex JS SDK](https://github.com/metaplex-foundation/js) to display a random NFT from the wallet and refresh it when a button is clicked.

This example has been generated using the following steps:

1. **Create a new project using Next.js.**
    Redirect to [this](https://github.com/metaplex-foundation/js-examples/tree/main/getting-started-nextjs) link to know how to create next.js application and install metaplex successfully.

2. **Install the needed dependencies.**

   ```sh
    npm install @solana/wallet-adapter-base \
         @solana/wallet-adapter-react \
         @solana/wallet-adapter-react-ui \
         @solana/wallet-adapter-wallets
   ```

3. **Create the script files and copy the code from the corresponding file in the repository**
   ```
      cd pages
      touch ShowNFTs.js MetaplexProvider.js useMetaplex.js
   ```

4. **That's it!** 🎉

   You're now ready to start building your app. You can use the following commands to build and serve your app.

   ```sh
   # Build and serve for development.
   npm run dev

   # Build and serve for production.
   npm run build && npm run start
   ```

   If you're interested in how this example app is using the Metaplex SDK, check out the [`index.js`](./pages/index.js), [`ShowNFTs.js`](./pages/ShowNFTs.js), [`MetaplexProvider.js`](./pages/MetaplexProvider.js), [`useMetaplex.js`](./pages/useMetaplex.js) and [`Home.module.css`](./styles/Home.module.css) files in the `pages` and `styles` directories.
