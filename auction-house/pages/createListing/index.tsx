import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Spinner,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { isSft, LoadMetadataOutput, sol } from '@metaplex-foundation/js'
import { useRouter } from 'next/router'

import ArtworkCard from 'components/ArtworkCard'
import { useAuctionHouse } from 'context/AuctionHouse'
import { useMetaplex } from 'context/Metaplex'
import useAssets from 'hooks/useAssets'

const CreateListing: React.FC = () => {
  const { assets, loadUserAssets, isPending: isPendingAssets } = useAssets()
  const { metaplex } = useMetaplex()
  const { auctionHouse, isPending } = useAuctionHouse()
  const toast = useToast()
  const router = useRouter()

  const [selectedAsset, setSelectedAsset] = useState<LoadMetadataOutput>()
  const [price, setPrice] = useState<number>()
  const [tokenAmount, setTokenAmount] = useState<number>()

  const isLoading = isPendingAssets || isPending

  const handleCreateListing = useCallback(async () => {
    if (
      !selectedAsset ||
      !auctionHouse ||
      !metaplex ||
      price === null ||
      price === undefined
    ) {
      return
    }

    const mintAccount = selectedAsset.address
    const listingPrice = sol(price)

    await metaplex.auctionHouse().list({
      auctionHouse,
      mintAccount,
      price: listingPrice,
    })

    toast({
      title: 'Listing created.',
      description: "We've created your listing.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    router.push('/')
  }, [router, metaplex, auctionHouse, selectedAsset, price, toast])

  const handleSetPrice = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value))
  }, [])

  const handleSetTokenAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTokenAmount(Number(event.target.value))
    },
    []
  )

  useEffect(() => {
    loadUserAssets()
  }, [loadUserAssets])

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
            <Heading size="lg">Create a listing</Heading>
          </Flex>
        </VStack>

        {isLoading && (
          <VStack spacing={4} p={3} align="stretch" mb={5}>
            <Flex justifyContent="center">
              <Spinner size="xl" />
            </Flex>
          </VStack>
        )}

        {!isLoading && selectedAsset && (
          <Flex align="center" flexDirection="column">
            <Box w="320px">
              <ArtworkCard
                artwork={selectedAsset}
                key={selectedAsset.address.toBase58()}
              />

              {isSft(selectedAsset) && (
                <Input
                  placeholder="Enter amount of tokens to sale"
                  mt={5}
                  value={tokenAmount}
                  onChange={handleSetTokenAmount}
                />
              )}

              <Input
                placeholder="Enter a listing price in SOL"
                mt={5}
                value={price}
                onChange={handleSetPrice}
              />

              <Button
                colorScheme="purple"
                size="lg"
                mt={5}
                w="100%"
                onClick={handleCreateListing}
                disabled={price === null || price === undefined}
              >
                List
              </Button>
            </Box>
          </Flex>
        )}

        {!isLoading && !selectedAsset && (
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {assets?.map((asset) => (
              <ArtworkCard
                artwork={asset}
                key={asset.address.toBase58()}
                onClick={() => setSelectedAsset(asset)}
              />
            ))}
          </Grid>
        )}
      </Flex>
    </Box>
  )
}

export default CreateListing
