import React, { useCallback, useEffect, useState } from 'react'
import { Box, Flex, Grid, Heading, VStack } from '@chakra-ui/react'
import { useAssets } from 'context/Assets'
import { LoadMetadataOutput } from '@metaplex-foundation/js'

import ArtworkCard from 'components/ArtworkCard'

const ItemsList: React.FC = () => {
  const { assets, loadUserAssets } = useAssets()
  const [selectedAsset, setSelectedAsset] = useState<LoadMetadataOutput>()

  const renderListItem = useCallback(
    (asset: LoadMetadataOutput) => (
      <ArtworkCard
        artwork={asset}
        key={asset.address.toBase58()}
        onClick={() => setSelectedAsset(asset)}
      />
    ),
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

        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {assets?.map(renderListItem)}
        </Grid>
      </Flex>
    </Box>
  )
}

export default ItemsList
