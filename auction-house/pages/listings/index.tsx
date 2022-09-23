import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { formatAmount, lamports, Listing } from '@metaplex-foundation/js'

import ArtworkCard from 'components/ArtworkCard'
import { useAuctionHouse } from 'context/AuctionHouse'
import { useMetaplex } from 'context/Metaplex'
import { useRouter } from 'next/router'
import { useWallet } from '@solana/wallet-adapter-react'

import useListings from 'hooks/useListings'

const Listings: React.FC = () => {
  const { listings, loadListings, isPending: isPendingListings } = useListings()
  const wallet = useWallet()
  const { metaplex } = useMetaplex()
  const { auctionHouse, isPending } = useAuctionHouse()
  const toast = useToast()
  const router = useRouter()

  const [selectedListing, setSelectedListings] = useState<Listing>()

  const isLoading = isPendingListings || isPending

  const handleExecuteSale = useCallback(async () => {
    if (
      !selectedListing ||
      !auctionHouse ||
      !metaplex ||
      !wallet ||
      !wallet.publicKey
    ) {
      return
    }

    await metaplex
      .auctionHouse()
      .buy({
        auctionHouse,
        listing: selectedListing,
      })
      .run()

    toast({
      title: 'Sale was executed.',
      description: 'You should receive asset in your wallet.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    router.push('/')
  }, [wallet, router, metaplex, auctionHouse, selectedListing, toast])

  const formatPrice = (listing: Listing) => {
    const basisAmount = lamports(listing.price.basisPoints)

    return formatAmount(basisAmount)
  }

  useEffect(() => {
    loadListings()
  }, [loadListings])

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
            <Heading size="lg">Select an asset to buy it</Heading>
          </Flex>
        </VStack>

        {isLoading && (
          <VStack spacing={4} p={3} align="stretch" mb={5}>
            <Flex justifyContent="center">
              <Spinner size="xl" />
            </Flex>
          </VStack>
        )}

        {!isLoading && selectedListing && (
          <Flex align="center" flexDirection="column">
            <Box w="320px">
              <ArtworkCard
                artwork={selectedListing.asset}
                key={selectedListing.asset.address.toBase58()}
              />

              <Button
                colorScheme="purple"
                size="lg"
                mt={5}
                w="100%"
                onClick={handleExecuteSale}
              >
                Buy
              </Button>
            </Box>
          </Flex>
        )}

        {!isLoading && !selectedListing && (
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {listings?.map((listing) => (
              <ArtworkCard
                artwork={listing.asset}
                key={listing.asset.address.toBase58()}
                onClick={() => setSelectedListings(listing)}
              >
                <Text
                  mt={4}
                  fontSize="2xl"
                  fontWeight="bold"
                  textTransform="capitalize"
                  textAlign="start"
                  padding="2px 10px 10px 5px"
                  color="white"
                >
                  {formatPrice(listing)}
                </Text>
              </ArtworkCard>
            ))}
          </Grid>
        )}
      </Flex>
    </Box>
  )
}

export default Listings
