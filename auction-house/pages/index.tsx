import {WalletMultiButton} from '@solana/wallet-adapter-react-ui'
import type {NextPage} from 'next'
import {Box, Button, Flex, Spinner} from '@chakra-ui/react'
import {useWallet} from '@solana/wallet-adapter-react'

import {useAuctionHouse} from 'context/AuctionHouse'

import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    const wallet = useWallet()
    const {auctionHouse, handleCreateAuctionHouse, isPending} =
        useAuctionHouse()

    const isWalletLoaded = wallet.publicKey && !isPending
    const shouldShowCreateBtn = isWalletLoaded && !auctionHouse
    const isAuctionHouseLoaded = isWalletLoaded && auctionHouse

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
                {isAuctionHouseLoaded && (
                        <div className={styles.main}>
                            <Link href="/createListing">
                                <Button colorScheme="purple" size="lg">
                                    Create Listing
                                </Button>
                            </Link>
                            <Link href="/listings">
                                <Button colorScheme="purple" size="lg">
                                    Show Listings
                                </Button>
                            </Link>
                        </div>
                )}

                {!isAuctionHouseLoaded && (
                    <div className={styles.main}>
                        {!wallet.publicKey && <WalletMultiButton/>}

                        {shouldShowCreateBtn && (
                            <Button
                                colorScheme="purple"
                                size="lg"
                                onClick={handleCreateAuctionHouse}
                            >
                                Create Auction House
                            </Button>
                        )}
                        {isPending && <Spinner size="xl"/>}
                    </div>
                )}
            </Flex>
        </Box>
    )
}

export default Home
