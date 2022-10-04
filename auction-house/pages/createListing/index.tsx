import React, { useCallback, useEffect } from 'react'
import { Flex, Heading, VStack } from '@chakra-ui/react'
import { useAssets } from 'context/Assets'
import { LoadMetadataOutput } from '@metaplex-foundation/js'

import ListItem from './ListItem'

const ItemsList: React.FC = () => {
  const { assets, loadUserAssets } = useAssets()

  const renderListItem = useCallback(
    (artwork: LoadMetadataOutput) => (
      <ListItem artwork={artwork} key={artwork.address.toBase58()} />
    ),
    []
  )

  useEffect(() => {
    loadUserAssets()
  }, [loadUserAssets])

  return (
    <div>
      <VStack spacing={4} p={3} align="stretch" mb={5}>
        <Flex justifyContent="space-between">
          <Heading size="lg">Select the asset to list</Heading>
        </Flex>
      </VStack>

      {assets?.map(renderListItem)}
    </div>
  )
}

export default ItemsList
