import { Image, Avatar, Box, BoxProps, Flex, Text } from '@chakra-ui/react'
import { isSft, Listing, LoadMetadataOutput } from '@metaplex-foundation/js'
import React from 'react'

import formatPrice from 'utils/formatPrice'

interface Props extends BoxProps {
  artwork: LoadMetadataOutput
  listing?: Listing
}

const ArtworkCard: React.FC<Props> = ({
  artwork,
  listing,
  children,
  ...boxProps
}) => {
  const { name } = artwork
  const imageSrc = artwork.json?.image
  const tokenType = isSft(artwork) ? 'SFT' : 'NFT'

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
      borderRadius="xl"
      backgroundColor="#292929"
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
            <Avatar
              size="2xs"
              borderRadius="2px"
              src="https://bit.ly/kent-c-dodds"
            />
          </Flex>

          <Flex flexDirection="row" justifyContent="space-between">
            <Text
              mt={4}
              fontSize="2xl"
              fontWeight="bold"
              textTransform="capitalize"
              color="white"
            >
              {name}
            </Text>

            <Text
              mt={4}
              fontSize="2xl"
              fontWeight="bold"
              textTransform="capitalize"
              color="white"
            >
              {tokenType}
            </Text>
          </Flex>
        </Box>
      </Box>

      {listing && (
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
      )}
    </Box>
  )
}

export default ArtworkCard
