import { Image, Avatar, Box, BoxProps, Flex, Text } from '@chakra-ui/react'
import {isSft, LoadMetadataOutput} from '@metaplex-foundation/js'
import React from 'react'

interface Props extends BoxProps {
  artwork: LoadMetadataOutput
}

const ArtworkCard: React.FC<Props> = ({ artwork, children, ...boxProps }) => {
  const { name } = artwork
  const imageSrc = artwork.json?.image
  const tokenType = isSft(artwork) ? 'SFT' : 'NFT';

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
            { tokenType }
          </Text>
          </Flex>
        </Box>
      </Box>
      {children}
    </Box>
  )
}

export default ArtworkCard
