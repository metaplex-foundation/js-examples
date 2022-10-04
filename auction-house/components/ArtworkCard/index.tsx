import { Image, Avatar, Box, BoxProps, Flex, Text } from '@chakra-ui/react'
import { LoadMetadataOutput } from '@metaplex-foundation/js'
import React from 'react'

interface Props extends BoxProps {
  artwork: LoadMetadataOutput
}

const ArtworkCard: React.FC<Props> = ({ artwork, children, ...boxProps }) => {
  const { name } = artwork
  const imageSrc = artwork.json?.image

  return (
    <Box
      layerStyle="base"
      p={0}
      overflow="hidden"
      w="full"
      maxW="full"
      {...boxProps}
      role="group"
      transition="transform 100ms ease-in-out"
      _hover={{
        transform: 'translateY(-2px)',
      }}
      cursor="pointer"
    >
      <Box layerStyle="base" p={0}>
        <Box
          borderRadius="xl"
          transition="background 100ms ease-in-out"
          _groupHover={{
            bg: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <Image
            pos="relative"
            _groupHover={{
              zIndex: -1,
              filter: 'none',
            }}
            src={imageSrc}
            objectFit="cover"
            w="full"
            h="360px"
            filter="drop-shadow(0px 0px 24px rgba(0, 0, 0, 0.2))"
            borderRadius="xl"
            alt="NFT"
          />
        </Box>

        <Box p={4}>
          <Flex alignItems="center">
            <Avatar size="2xs" borderRadius="2px" />
          </Flex>

          <Text
            mt={4}
            fontSize="2xl"
            fontWeight="bold"
            textTransform="capitalize"
          >
            {name}
          </Text>
        </Box>
      </Box>
      {children}
    </Box>
  )
}

export default ArtworkCard
