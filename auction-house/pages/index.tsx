import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import type { NextPage } from 'next'
import { Button, Spinner } from '@chakra-ui/react'
import { useWallet } from '@solana/wallet-adapter-react'

import { useAuctionHouse } from 'context/AuctionHouse'
import Footer from 'components/Footer'

import styles from 'styles/Home.module.css'
import { useAssets } from 'context/Assets'

const Home: NextPage = () => {
  const wallet = useWallet()
  const { auctionHouse, handleCreateAuctionHouse } = useAuctionHouse()
  const { isPending: isPendingAssets } = useAssets()

  const shouldShowCreateBtn =
    wallet.publicKey && !auctionHouse && !isPendingAssets

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
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

          {isPendingAssets && <Spinner size="xl" />}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
