import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Spinner,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { Listing } from '@metaplex-foundation/js'
import { NextPage } from 'next'

import ArtworkCard from 'components/ArtworkCard'
import { useAuctionHouse } from 'context/AuctionHouse'
import { useMetaplex } from 'context/Metaplex'
import { useRouter } from 'next/router'
import { useWallet } from '@solana/wallet-adapter-react'

import useListings from 'hooks/useListings'

const MyListings: NextPage = () => {
  const { listings, loadListings, isPending: isPendingListings } = useListings()
  const wallet = useWallet()
  const { metaplex } = useMetaplex()
  const { auctionHouse, isPending } = useAuctionHouse()
  const toast = useToast()
  const router = useRouter()

  const [activeLists, setActiveLists] = useState<Listing[]>()
  const isLoading = isPendingListings || isPending

  const handleCancelListing = useCallback(
    async (listing: Listing) => {
      if (!auctionHouse || !metaplex || !wallet || !wallet.publicKey) {
        return
      }

      await metaplex.auctionHouse().cancelListing({
        auctionHouse,
        listing,
      })

      toast({
        title: 'Listing was cancelled.',
        description: 'You should receive an asset in your wallet.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      router.push('/')
    },
    [wallet, router, metaplex, auctionHouse, toast]
  )

  useEffect(() => {
    if (wallet.publicKey) {
      loadListings(wallet.publicKey)
    }
  }, [loadListings, wallet])

  useEffect(() => {
    // Filter canceled listings.
    setActiveLists(listings?.filter((l) => !l.canceledAt))
  }, [listings])

  return (
    <Box flexGrow={1} position="relative">
      <Flex
        minH="100vh"
        direction="column"
        maxW="1600px"
        marginX="auto"
        flexGrow={1}
        px={88}
      >
        <VStack spacing={4} p={3} align="stretch" mb={5}>
          <Flex justifyContent="space-between">
            <Heading size="lg">Assets you listed</Heading>
          </Flex>
        </VStack>

        {isLoading && (
          <VStack spacing={4} p={3} align="stretch" mb={5}>
            <Flex justifyContent="center">
              <Spinner size="xl" />
            </Flex>
          </VStack>
        )}

        {!isLoading && (
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {activeLists?.map((listing) => (
              <Box key={listing.receiptAddress?.toBase58()}>
                <ArtworkCard
                  artwork={listing.asset}
                  listing={listing}
                  key={listing.asset.address.toBase58()}
                />
                <Button
                  colorScheme="purple"
                  size="lg"
                  mt={5}
                  w="100%"
                  onClick={() => handleCancelListing(listing)}
                >
                  Cancel Listing
                </Button>
              </Box>
            ))}
          </Grid>
        )}
      </Flex>
    </Box>
  )
}

export default MyListings
