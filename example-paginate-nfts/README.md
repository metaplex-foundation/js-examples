# Paginating NFTs for a given wallet address

This example uses a new Next app with Metaplex which can be created by following the instructions listed in [Getting Started with Metaplex and Next.js](../getting-started-nextjs).

Pagination is not really a thing when it comes to `getProgramAcccount` RPC method. This tutorial demonstrates how you can still implement pagination using the [Metaplex JS SDK](https://github.com/metaplex-foundation/js).

## Workflow

- We use the [findAllByOwner](https://github.com/metaplex-foundation/js#findallbyowner) method in the Metaplex SDK which will give us the list of NFTs without their metadata JSON loaded. (This is crucial because if we have to fetch 1000 NFTs with their metadata, it will take a lot of time and hugely impact the performance of application and will fetch a large amount data in a single go).

- Once we have the NFT List we will be storing it in a state and we will be loading the metadata of NFTs on the current page only. For demonstration perPage value is set to 1, you are free to change it according to your needs.

- Whenever the currentPage changes we will be calling a loadData function which will load the Metadata of NFTs which haven't been loaded yet.

## Code Reference

1. Once the user fills in the wallet address and clicks Fetch button, `fetchNFTs` function is called.

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

2. Once the nftList is in place and currentPage is set to 1, it triggers the useEffect

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

   The index range of NFTs falling in current page is then set to the currentView state and is displayed.

3. Once the user clicks `Next Page` or `Prev Page`, the useEffect is again triggered, the index range for new page is checked for any NFTs with metadata not loaded and the new view index range is set to current view.

4. If the user clicks Fetch button with a different wallet address or with same wallet address to get a refreshed list of NFTs, the process repeats from step 1.
