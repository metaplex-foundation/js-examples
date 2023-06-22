import { Listing } from '@metaplex-foundation/js'
import { useCallback, useMemo, useState } from 'react'
import { useBoolean } from '@chakra-ui/react'

import { useMetaplex } from '../context/Metaplex'
import { useAuctionHouse } from '../context/AuctionHouse'
import { PublicKey } from "@solana/web3.js";

const useListings = () => {
  const [listings, setListings] = useState<Listing[]>()
  const [isPending, setIsPending] = useBoolean()

  const { metaplex } = useMetaplex()
  const { auctionHouse } = useAuctionHouse()

  const client = useMemo(() => metaplex?.auctionHouse(), [metaplex])

  const loadListings = useCallback(
    async (seller?: PublicKey) => {
      if (client && metaplex && auctionHouse) {
        try {
          setIsPending.on()

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

          setListings(fetchedListings)
        } catch {
          // do nothing, user doesn't have AH
        }

        setIsPending.off()
      }
    },
    [auctionHouse, metaplex, client, setIsPending]
  )

  return useMemo(
    () => ({
      listings,
      isPending,
      loadListings
    }),
    [listings, isPending, loadListings]
  )
}

export default useListings
