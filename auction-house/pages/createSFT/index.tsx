import React, {ChangeEvent, useCallback, useState} from 'react'
import {
  Box,
  Button,
  Flex,
  Heading, Image, Input,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { token} from '@metaplex-foundation/js'
import { useRouter } from 'next/router'

import { useAuctionHouse } from 'context/AuctionHouse'
import { useMetaplex } from 'context/Metaplex'

const CreateSFT: React.FC = () => {
  const [image, setImage] = useState('');
  const [tokenAmount, setTokenAmount] = useState<number>();
  const { metaplex } = useMetaplex()
  const { auctionHouse } = useAuctionHouse()
  const toast = useToast()
  const router = useRouter()

  const handleCreateSFT = useCallback(async () => {
    if (
      !auctionHouse ||
      !metaplex ||
      !image ||
      !tokenAmount
    ) {
      return
    }

    const { uri } = await metaplex.nfts().uploadMetadata({
      name: 'SFT name',
      description: 'SFT description',
      image: image
    })

    await metaplex.nfts().createSft({
      uri,
      name: 'On-chain SFT name',
      sellerFeeBasisPoints: 200,
      tokenAmount: token(12)
    });

    toast({
      title: 'SFT created.',
      description: "We've created your SFT.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    router.push('/')
  }, [router, metaplex, auctionHouse, toast])

  const handleTokenAmountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTokenAmount(Number(event.target.value))
  }, [])

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
            <Heading size="lg">Create SFT</Heading>
          </Flex>
        </VStack>

        <Flex align="start" flexDirection="column">
          <Heading size="md">Choose Image: </Heading>
          <input type="file" onChange={(e) => e.target.files && setImage(URL.createObjectURL(e.target.files[0]))} />
        </Flex>
        {image && (
          <Flex align="center" flexDirection="column">
            <Box w="320px">
              <Image
                  pos="relative"
                  _groupHover={{
                    zIndex: -1,
                    filter: 'none',
                  }}
                  src={image}
                  objectFit="cover"
                  w="full"
                  h="360px"
                  filter="drop-shadow(0px 0px 24px rgba(0, 0, 0, 0.2))"
                  borderRadius="xl"
                  alt="NFT"
              />
              <Input
                  placeholder="Enter token amount"
                  mt={5}
                  value={tokenAmount}
                  onChange={handleTokenAmountChange}
              />
              <Button
                  colorScheme="purple"
                  size="lg"
                  mt={5}
                  w="100%"
                  onClick={handleCreateSFT}
                  disabled={!image || !tokenAmount}
              >
                Create SFT
              </Button>
            </Box>
          </Flex>
        )}

      </Flex>
    </Box>
  )
}

export default CreateSFT
