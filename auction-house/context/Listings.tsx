import {
    AuctionHouseProgram,
    LazyListing,
    Listing,
    toLazyListing,
    toListingReceiptAccount
} from '@metaplex-foundation/js'
import { useCallback, useMemo, useState,} from 'react'
import {useBoolean} from '@chakra-ui/react'
import {PublicKey} from "@solana/web3.js";
import {useMetaplex} from './Metaplex'
import {useAuctionHouse} from "./AuctionHouse";

export const useListings = () => {
    const [listings, setListings] = useState<(Listing)[]>()
    const [isPending, setIsPending] = useBoolean()

    const { metaplex } = useMetaplex()
    const { auctionHouse } = useAuctionHouse()

    const client = useMemo(() => metaplex?.auctionHouse(), [metaplex])

    const loadListings = useCallback(async (seller?: PublicKey) => {
        if (client && metaplex && auctionHouse) {
            let lazyListings: (Listing | LazyListing)[];
            try {
                if(!seller) {
                    const listingQuery = AuctionHouseProgram.listingAccounts(
                        metaplex
                    ).whereAuctionHouse(
                        auctionHouse.address
                    )

                    lazyListings = await listingQuery.getAndMap((account) =>
                        toLazyListing(toListingReceiptAccount(account), auctionHouse)
                    );
                    console.log('ssss');
                    console.log(lazyListings);
                } else {
                        setIsPending.on()

                        // Finds and loads seller's listings.
                        lazyListings = await client
                            .findListingsBy({type: 'seller', auctionHouse, publicKey: seller})
                            .run()
                }
                if(!lazyListings) {
                    return
                }

                // Fetch listing for lazy listings
                const fetchedListings = await Promise.all(lazyListings
                    .map(listing => !listing.lazy ? Promise.resolve(listing)
                        : client.loadListing({lazyListing: listing}).run()))

                setListings(fetchedListings)
            } catch {
                // do nothing, user doesn't have AH
            }

            setIsPending.off()
        }
    }, [ auctionHouse, client, setIsPending])

    return useMemo(
        () => ({
            listings,
            isPending,
            loadListings,
        }),
        [listings, isPending, loadListings]
    )
}
