import {
  walletAdapterIdentity,
  Metaplex,
  Option,
  bundlrStorage,
  IdentitySigner,
} from '@metaplex-foundation/js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react'

const DEFAULT_CONTEXT = {
  metaplex: null,
}

type MetaplexState = {
  metaplex: Option<Metaplex>
}

export const MetaplexContext = createContext<MetaplexState>(DEFAULT_CONTEXT)

export const MetaplexProvider: FC<PropsWithChildren> = ({ children }) => {
  const { connection } = useConnection()
  const wallet = useWallet()

  const metaplex = useMemo(
    () =>
      Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(
          bundlrStorage({
            address: 'https://devnet.bundlr.network',
          })
        ),
    [connection, wallet]
  )

  const value = useMemo(
    () => ({
      metaplex,
    }),
    [metaplex]
  )

  return (
    <MetaplexContext.Provider value={value}>
      {children}
    </MetaplexContext.Provider>
  )
}

export function useMetaplex() {
  return useContext(MetaplexContext)
}
