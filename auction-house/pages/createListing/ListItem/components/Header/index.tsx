import { Box, HStack, Image, Text } from '@chakra-ui/react'

interface Props {
  imgUrl?: string
  name: string
  type?: string
}

const Header: React.FC<Props> = ({ imgUrl, name }) => (
  <HStack spacing={8} overflow="hidden" width="35%">
    <Image w="64px" h="64px" borderRadius={12} src={imgUrl} alt="NFT" />
    <Box overflow="hidden">
      <Text
        variant="body-bold"
        mb="5px"
        maxW="200px"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {name}
      </Text>
    </Box>
  </HStack>
)

export default Header
