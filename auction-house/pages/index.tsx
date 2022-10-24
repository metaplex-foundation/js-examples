import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import type { NextPage } from 'next'
import {Box, Button, Flex, Input, Spinner} from '@chakra-ui/react'
import { useWallet } from '@solana/wallet-adapter-react'

import { useAuctionHouse } from 'context/AuctionHouse'

import Link from 'next/link'
import React, {ChangeEvent, useCallback, useState} from "react";
import {PublicKey} from "@solana/web3.js";
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [auctionHouseAddress, setAHAddress] = useState<PublicKey>();
  const wallet = useWallet();
  const { auctionHouse, loadUserAuctionHouse, loadAuctionHouse, handleCreateAuctionHouse, isPending } =
    useAuctionHouse();

  const isWalletLoaded = wallet.publicKey && !isPending;
  const shouldShowCreateBtn = isWalletLoaded && !auctionHouse;
  const isAuctionHouseLoaded = isWalletLoaded && auctionHouse;

  const handleAuctionHouseChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setAHAddress(new PublicKey(e.target.value))
    }, []);

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
              <Flex flexDirection="column">
            <Link href="/createListing">
              <Button colorScheme="purple" width="100%" size="lg">
                Create Listing
              </Button>
            </Link>
            <Link href="/createNFT">
              <Button colorScheme="purple" width="100%" size="lg">
                Create NFT
              </Button>
            </Link>
            <Link href="/listings">
              <Button colorScheme="purple" width="100%" size="lg">
                Show Listings
              </Button>
            </Link>
            <Link href="/myListings">
              <Button colorScheme="purple" width="100%" size="lg">
                My Listings
              </Button>
            </Link>
              </Flex>
          </div>
        )}

        {!isAuctionHouseLoaded && wallet.connected && (
          <div className={styles.main}>
            {!wallet.publicKey && <WalletMultiButton />}
            <Flex flexDirection="column">
              <Input
                  placeholder="Enter Auction House address"
                  mt={5}
                  value={auctionHouseAddress ? auctionHouseAddress.toBase58() : ''}
                  onChange={handleAuctionHouseChange}
              />
              <Button
                  colorScheme="purple"
                  size="lg"
                  onClick={() => loadAuctionHouse(auctionHouseAddress as PublicKey)}
                  disabled={!auctionHouseAddress}
              >
                  Connect Auction House
              </Button>
              <Button
                  colorScheme="purple"
                  size="lg"
                  onClick={loadUserAuctionHouse}
              >
                  Connect User`s Auction House
              </Button>

            {shouldShowCreateBtn && (
              <Button
                colorScheme="purple"
                size="lg"
                width="100%"
                onClick={handleCreateAuctionHouse}
              >
                Create Auction House
              </Button>
            )}
            </Flex>
            {isPending && <Spinner size="xl" />}
          </div>
        )}
      </Flex>
    </Box>
  )
}

export default Home
