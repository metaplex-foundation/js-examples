import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import type { NextPage } from 'next'
import { Box, Button, Flex, Spinner } from '@chakra-ui/react'
import { useWallet } from '@solana/wallet-adapter-react'

import { useAuctionHouse } from 'context/AuctionHouse'
import ItemsList from 'pages/createListing'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const wallet = useWallet()
  const { auctionHouse, handleCreateAuctionHouse, isPending } =
    useAuctionHouse()

  const isWalletLoaded = wallet.publicKey && !isPending
  const shouldShowCreateBtn = isWalletLoaded && !auctionHouse
  const shouldShowItems = isWalletLoaded && auctionHouse

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
        {shouldShowItems && <ItemsList />}

        {!shouldShowItems && (
          <div className={styles.main}>
            {!wallet.publicKey && <WalletMultiButton />}

            {shouldShowCreateBtn && (
              <Button
                colorScheme="yellow"
                size="lg"
                onClick={handleCreateAuctionHouse}
              >
                Create Auction House
              </Button>
            )}
            {isPending && <Spinner size="xl" />}
          </div>
        )}
      </Flex>
    </Box>
  )
}

export default Home
