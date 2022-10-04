import React from 'react'
import { Flex, HStack, StackDivider } from '@chakra-ui/react'

import { LoadMetadataOutput } from '@metaplex-foundation/js'
import Header from './components/Header'

interface Props {
  artwork: LoadMetadataOutput
}

const ListItem: React.FC<Props> = ({ artwork }) => {
  const { json, name } = artwork

  return (
    <HStack
      bg="#EDF2F7"
      spacing={4}
      p={4}
      borderRadius="xl"
      mb={4}
      cursor="pointer"
    >
      <Flex direction="column" w="100%">
        <Flex align="center">
          <HStack
            spacing={4}
            w="calc(100% - 140px)"
            align="middle"
            divider={<StackDivider borderColor="rgba(255, 255, 255, 0.1)" />}
          >
            <Header imgUrl={json?.image} name={name} />
          </HStack>
        </Flex>
      </Flex>
    </HStack>
  )
}

export default ListItem
