import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Input,
    Spinner, Text,
    useToast,
    VStack,
} from '@chakra-ui/react'
import {amount, formatAmount, lamports, Listing, SOL} from '@metaplex-foundation/js'

import ArtworkCard from 'components/ArtworkCard'
import { useAuctionHouse } from 'context/AuctionHouse'
import { useMetaplex } from 'context/Metaplex'
import { useRouter } from 'next/router'
import {useListings} from "context/Listings";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {useWallet} from "@solana/wallet-adapter-react";

const Listings: React.FC = () => {
  const { listings, loadListings, isPending: isPendingListings } = useListings()
  const wallet = useWallet()
  const { metaplex } = useMetaplex()
  const { auctionHouse, isPending } = useAuctionHouse()
  const toast = useToast()
  const router = useRouter()

  // Select listing here
  const [selectedListing, setSelectedListings] = useState<Listing>()
  const [sellerAddress, setSellerAddress] = useState<PublicKey>()

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
        confirmOptions: {
          skipPreflight: true,
        },
      })
      .run()

    toast({
      title: 'Listing created.',
      description: "We've created your listing.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    router.push('/')
  }, [ wallet, router, metaplex, auctionHouse, selectedListing, toast])

  const formatPrice = (listing: Listing) => {
      const basisAmount = lamports(listing.price.basisPoints)

      return formatAmount(basisAmount)
  }

  useEffect(() => {
    loadListings(sellerAddress)
  },[loadListings])

  return (
    <Box flexGrow={1} position="relative">
        <Flex align="center" flexDirection="row" justifyContent="center">
            <Box w="320px">
                <Input
                    placeholder="Enter a seller address"
                    mt={5}
                    value={sellerAddress ? sellerAddress.toBase58() : ''}
                    onChange={(e) => {
                        e.preventDefault()
                        setSellerAddress(new PublicKey(e.target.value))
                    }}
                />
            </Box>
            <Box marginLeft="6px">
                <Button
                    colorScheme="purple"
                    size="md"
                    mt={5}
                    w="100%"
                    onClick={() => loadListings(sellerAddress)}
                    disabled={!sellerAddress}
                >
                    Fetch Listings
                </Button>
            </Box>
        </Flex>
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
            <Heading size="lg">Fetch Listings</Heading>
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
                List
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
                >{formatPrice(listing)}</Text>
                 {/* <Text
                      key={listing.asset.address.toBase58()}
                      mt={4}
                      fontSize="2xl"
                      fontWeight="bold"
                      textTransform="capitalize"
                      color="white"
                  >
                      `{}Sol`
                  </Text>*/}
              </ArtworkCard>
            ))}
          </Grid>
        )}
      </Flex>
    </Box>
  )
}

export default Listings
