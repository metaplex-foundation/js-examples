# Auction House usage example

In this example, we will see how to use [Auction House](https://docs.metaplex.com/programs/auction-house/overview) program using the [Metaplex JS SDK](https://github.com/metaplex-foundation/js).

Once the user has connected their wallet, we display input for the Auction House address and allow the user to create their own Auction House marketplace.

This is achieved by using AuctionHouse context from `./context/AuctionHouse.tsx`.

**Auction House context**

The `./context/AuctionHouse.tsx` file is responsible for creating and exposing a new Auction House Context which will be used within our components to access the Auction House SDK.

It gives the ability to create an auction house.

  ```ts
  const response = await client.create({
    sellerFeeBasisPoints: 200, // 2% Fee
  })
  ```

To fetch the user's auction house.

  ```ts
  const userAuctionHouse = await client.findByCreatorAndMint({
    creator: toPublicKey(wallet.publicKey),
    treasuryMint: WRAPPED_SOL_MINT,
  })
  ```

To load auction house by address.

  ```ts
  const userAuctionHouse = await client.findByAddress({
    address: ahAddress,
  })
  ```

**Assets Loading hook**

The `./hooks/useAssets.tsx` file is responsible to fetch the user's NFTs and SFTs that can be then listed in the auction house.

  ```ts
  // Finds and loads user's assets.
  const userAssetsMetadata = await fetchAssetsMetadata() // todo: JS SDK method as it will be developed
  if (!userAssetsMetadata) {
    return
  }

  const promises: Promise<LoadMetadataOutput>[] = []
  userAssetsMetadata.forEach((metadata) => {
    if (isMetadata(metadata)) {
      promises.push(client.load({ metadata }))
    }
  })

  const userAssets = await Promise.all(promises)
  ```


**Listings Loading hook**

The `./hooks/useListings.tsx` file is responsible to fetch the user's listings or listings of a given user in the current auction house.

  ```ts
  // Finds and loads listings from auction house.
  const lazyListings = seller
    ? await client.findListings({
        auctionHouse,
        seller
      })
    : await client.findListings({
        auctionHouse
      })

  if (!lazyListings) {
    return
  }

  // Fetch listing for lazy listings
  const fetchedListings = await Promise.all(
    lazyListings.map((listing) =>
      !listing.lazy
        ? Promise.resolve(listing)
        : client.loadListing({ lazyListing: listing })
    )
  )
  ```