import React from 'react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useAuctionHouse } from '../../context/AuctionHouse'

const NavBar: React.FC = () => {
  const { auctionHouse, handleAuctionHouseDisconnect } = useAuctionHouse()

  return (
    <Box flexGrow={1}>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="start"
      >
        <Box marginTop="20px">
          <WalletMultiButton />{' '}
        </Box>
        {auctionHouse && (
          <>
            <Text
              mt={5}
              fontSize="xl"
              fontWeight="bold"
              textTransform="capitalize"
              color="white"
            >
              {`Auction House Address: ${auctionHouse.address.toBase58()}`}
            </Text>
            <Button
              colorScheme="purple"
              size="md"
              mt={5}
              onClick={handleAuctionHouseDisconnect}
            >
              Disconnect from Auction House
            </Button>
          </>
        )}
      </Flex>
    </Box>
  )
}

export default NavBar
