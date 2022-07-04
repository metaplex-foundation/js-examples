# Connect Wallet in the Browser

In this tutorial, we will see how to connect a wallet in the browser using the [Solana Wallet Adapter Library](https://github.com/solana-labs/wallet-adapter) and the [Metaplex JS SDK](https://github.com/metaplex-foundation/js).

Once the user has connected their wallet, we will display a random NFT from their wallet and refresh it at the click of a button.

This example has been generated using the following steps:

1. **Create a new project using Next.js.**
   Let's start by spinning off a Next.js app with the Metaplex JS SDK installed. You may achieve this by [following this tutorial](https://github.com/metaplex-foundation/js-examples/tree/main/getting-started-nextjs).

2. **Install the wallet adapter libraries.**
   ```sh
    npm install @solana/wallet-adapter-base \
         @solana/wallet-adapter-react \
         @solana/wallet-adapter-react-ui \
         @solana/wallet-adapter-wallets
   ```

3. **Create `pages/useMetaplex.js` file**

`useMetaplex.js` file is responsible for creating and using the Metaplex Context

```js
const DEFAULT_CONTEXT = {
  metaplex: null,
};

export const MetaplexContext = createContext(DEFAULT_CONTEXT);

export function useMetaplex() {
  return useContext(MetaplexContext);
}
```

As shown, It creates a context for metaplex to be accessible by the whole application, so that we could use it whenever needed.


4. **Create `pages/MetaplexProvider.js` file**

`MetaplexProvider` component is a component that uses the wallet provided by the `WalletProvider` component and return a Metaplex instance which could be used later.

```js
export const MetaplexProvider = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const metaplex = useMemo(() => {
    return Metaplex.make(connection)
      .use(walletOrGuestIdentity(wallet.connected ? wallet : null));
  }, [connection, wallet]);

  return (
    <MetaplexContext.Provider value={{ metaplex }}>
      {children}
    </MetaplexContext.Provider>
  )
}
```

As shown, It creates a new component `MetaplexProvider` that creates a new instance of metaplex to be used be the rest of the application.

5. **Create `pages/ShowNFTs.js` file**

`ShowNFTs` component is the component responsible for retrieving, picking and showing a random NFT from the connected wallet.

```js
   let myNfts = await metaplex.nfts().findAllByOwner(metaplex.identity().publicKey);
   let randIdx = Math.floor(Math.random() * myNfts.length);
   await myNfts[randIdx].metadataTask.run();
   setNft(myNfts[randIdx]);
```

As shown here, At a click of the button, we are fetching all the NFTs by the owner, and selecting a random NFT among them.

Since the JSON metadata is not downloaded automatically we download it by the insturction
```js
   await myNfts[randIdx].metadataTask.run();
```


6. **That's it!** 🎉
   You're now ready to start building your app whilst having access to the user's wallet!

   Note that now that the wallet has been integrated with the Metaplex JS SDK, you can use all of its features on behalf of the user and it will request their approval every time they need to send a transaction or sign a message.

   Let's see a few screenshots of the final result!
   
![image](https://user-images.githubusercontent.com/34144004/177217016-7b98dc84-516d-4f62-a875-9a13976ba9ce.png)
![image](https://user-images.githubusercontent.com/34144004/177217061-343cdba2-0411-4b58-884b-8ef5de157e40.png)
![image](https://user-images.githubusercontent.com/34144004/177217096-6c35559b-cd25-4e4b-aedc-9843210e6f43.png)

