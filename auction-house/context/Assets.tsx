import { Option, isMetadata, LoadMetadataOutput } from '@metaplex-foundation/js'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react'
import { useBoolean } from '@chakra-ui/react'
import { useMetaplex } from './Metaplex'

const DEFAULT_CONTEXT = {
  assets: null,
  isPending: false,
  loadUserAssets: () => Promise.resolve(),
}

type AssetsState = {
  assets?: Option<LoadMetadataOutput[]>
  isPending: boolean
  loadUserAssets(): Promise<void>
}

export const AssetsContext = createContext<AssetsState>(DEFAULT_CONTEXT)

export const AssetsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [assets, setAssets] = useState<LoadMetadataOutput[]>()
  const [isPending, setIsPending] = useBoolean()

  const { metaplex } = useMetaplex()
  const wallet = useWallet()

  const client = useMemo(() => metaplex?.nfts(), [metaplex])

  const loadUserAssets = useCallback(async () => {
    if (client && wallet.publicKey) {
      try {
        setIsPending.on()

        // Finds and loads user's assets.
        const userAssetsMetadata = await client
          .findAllByOwner({ owner: wallet.publicKey })
          .run()

        if (!userAssetsMetadata) {
          return
        }

        const promises: Promise<LoadMetadataOutput>[] = []
        userAssetsMetadata.forEach((metadata) => {
          if (isMetadata(metadata)) {
            promises.push(client.load({ metadata }).run())
          }
        })

        const userAssets = await Promise.all(promises)
        setAssets(userAssets)
      } catch {
        // do nothing, user doesn't have AH
      }

      setIsPending.off()
    }
  }, [client, wallet, setIsPending])

  const value = useMemo(
    () => ({
      assets,
      isPending,
      loadUserAssets,
    }),
    [assets, isPending, loadUserAssets]
  )

  return (
    <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>
  )
}

export function useAssets() {
  return useContext(AssetsContext)
}
