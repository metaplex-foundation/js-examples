# Paginating NFTs for a given wallet address

Pagination is not really a thing when it comes to the `getProgramAcccount` RPC method. This tutorial demonstrates how you can still simulate NFT pagination by lazy loading NFTs and fetching their metadata on demand.

We will be using the [findAllByOwner](https://github.com/metaplex-foundation/js#findallbyowner) method in the Metaplex SDK which will give us the list of NFTs without their metadata JSON loaded. (This is crucial because if we have to fetch 1000 NFTs with their metadata, it will take a lot of time and hugely impact the performance of application and will fetch a large amount data in a single go).

This example uses a new NextJS app with Metaplex which can be created by following the instructions listed in [Getting Started with Metaplex and Next.js](../getting-started-nextjs).

In this tutorial, we are going to:
- Use the `findAllByOwner` method
- Store the list of lazy-loaded NFTs
- Fetch the metadata of for each NFT in the current page

![image](https://user-images.githubusercontent.com/56197821/176737427-43df0aca-6ea9-443f-b9e9-718bdb654ab4.png)

Okay, let's get started 🔥 ( You can find all the code in this [file](./pages/index.js))

1. **`fetchNFTs` Function is called**
   
   Once the user fills in the wallet address and clicks Fetch button, `fetchNFTs` function is called.

   ```js
   const fetchNFTs = async () => {
      try {
         setLoading(true);
         setCurrentView(null);
         const list = await mx.nfts().findAllByOwner(new PublicKey(address));
         setNftList(list);
         setCurrentPage(1);
      } catch (e) {
         console.error(e);
      }
   };
   ```
   This sets the `Loading` state to true, invalidates the current view and makes a call to `findAllByOwner` method with wallet address as input.

   The data is set to `nftList` state and current page is set to default 1 (first page).

2. **UseEffect gets Triggered**
   
   Once the nftList is in place and currentPage is set to 1, it triggers the useEffect.

   ```js
   useEffect(() => {
   if (nftList) {
   const execute = async () => {
   const startIndex = (currentPage - 1) * perPage;
   const endIndex = currentPage * perPage;
   await loadData(startIndex, endIndex);
   setCurrentView(nftList.slice(startIndex, endIndex));
   setLoading(false);
   };
   execute();
   }
   }, [nftList, currentPage]);
   ```

   This useEffect calls the `loadData` function which goes through the NFTs falling in the index range of current page and loads the NFT metadata which aren't loaded yet.

   ```js
   const loadData = async (startIndex, endIndex) => {
    const nftsToLoad = nftList.filter((nft, index) => {
      return (
        index >= startIndex && index < endIndex && nft.metadataTask.isPending()
      );
    });

    const promises = nftsToLoad.map((nft) => nft.metadataTask.run());
    await Promise.all(promises);
   };
   ```

   The index range of NFTs falling in current page is then set to the currentView state and is displayed.

3. **If Page is changed**
   
   Once the user clicks `Next Page` or `Prev Page`, the useEffect is again triggered, the index range for new page is checked for any NFTs with metadata not loaded and the new view index range is set to current view.

4. **If Fetch button is clicked again**
   
   If the user clicks Fetch button with a different wallet address or with same wallet address to get a refreshed list of NFTs, the process repeats from step 1.

Let's see the final output 🥳

Landing Screen
![image](./output1.png)

Fetched NFTs (First Page)
![image](./output2.png)

