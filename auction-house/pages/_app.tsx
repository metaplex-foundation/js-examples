import 'styles/globals.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import { ChakraProvider } from '@chakra-ui/react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import type { AppProps } from 'next/app'
import { FC, useMemo } from 'react'
import { clusterApiUrl } from '@solana/web3.js'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

import { MetaplexProvider } from 'context/Metaplex'
import { AuctionHouseProvider } from 'context/AuctionHouse'
import theme from 'theme'
import NavBar from "../components/NavBar";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      /**
       * Select the wallets you wish to support, by instantiating wallet adapters here.
       *
       * Common adapters can be found in the npm package `@solana/wallet-adapter-wallets`.
       * That package supports tree shaking and lazy loading -- only the wallets you import
       * will be compiled into your application, and only the dependencies of wallets that
       * your users connect to will be loaded.
       */
      new PhantomWalletAdapter(),
    ],
    []
  )

  return (
    <ChakraProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <MetaplexProvider>
              <AuctionHouseProvider>
                <>
                  <NavBar />
                  <Component {...pageProps} />
                </>
              </AuctionHouseProvider>
            </MetaplexProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ChakraProvider>
  )
}

export default MyApp
