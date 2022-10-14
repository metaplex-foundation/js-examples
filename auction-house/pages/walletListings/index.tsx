import React, {useCallback, useEffect, useState} from 'react'
import {Box, Button, Flex, Grid, Heading, Spinner, Text, useToast, VStack,} from '@chakra-ui/react'
import {formatAmount, lamports, Listing} from '@metaplex-foundation/js'

import ArtworkCard from 'components/ArtworkCard'
import {useAuctionHouse} from 'context/AuctionHouse'
import {useMetaplex} from 'context/Metaplex'
import {useRouter} from 'next/router'
import {useWallet} from '@solana/wallet-adapter-react'

import useListings from 'hooks/useListings'

const WalletListings: React.FC = () => {
    const {listings, loadListings, isPending: isPendingListings} = useListings()
    const wallet = useWallet()
    const {metaplex} = useMetaplex()
    const {auctionHouse, isPending} = useAuctionHouse()
    const toast = useToast()
    const router = useRouter()

    const [activeLists, setActiveLists] = useState()
    const isLoading = isPendingListings || isPending

    const handleCancelListing = useCallback(async (listing: Listing) => {
        if (
            !auctionHouse ||
            !metaplex ||
            !wallet ||
            !wallet.publicKey
        ) {
            return
        }
        console.log(listing);

        await metaplex
            .auctionHouse()
            .cancelListing({
                auctionHouse,
                listing,
            })

        toast({
            title: 'Listing was cancel.',
            description: 'You should receive an asset in your wallet.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })

        router.push('/')
    }, [wallet, router, metaplex, auctionHouse, toast])

    const formatPrice = (listing: Listing) => {
        const basisAmount = lamports(listing.price.basisPoints)

        return formatAmount(basisAmount)
    }

    useEffect(() => {
        wallet.publicKey && loadListings(wallet.publicKey)
            .then(() => {
                listings && setActiveLists(listings.filter((l) => !l.canceledAt))
            })
    }, [loadListings, wallet])

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
                            <Spinner size="xl"/>
                        </Flex>
                    </VStack>
                )}

                {!isLoading && (
                    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                        {activeLists?.map((listing) => (
                            <Box>
                                <ArtworkCard
                                    artwork={listing.asset}
                                    key={listing.asset.address.toBase58()}
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
                                <Button
                                    colorScheme="purple"
                                    size="lg"
                                    mt={5}
                                    w="100%"
                                    onClick={(e) => handleCancelListing(listing)}
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

export default WalletListings
