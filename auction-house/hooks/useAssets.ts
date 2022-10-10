import { isMetadata, LoadMetadataOutput } from '@metaplex-foundation/js'
import { useWallet } from '@solana/wallet-adapter-react'
import { useMemo, useState, useCallback } from 'react'
import { useBoolean } from '@chakra-ui/react'
import { useMetaplex } from '../context/Metaplex'

const useAssets = () => {
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

        if (!userAssetsMetadata) {
          return
        }

        const promises: Promise<LoadMetadataOutput>[] = []
        userAssetsMetadata.forEach((metadata) => {
          if (isMetadata(metadata)) {
            promises.push(client.load({ metadata }))
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

  return useMemo(
    () => ({
      assets,
      isPending,
      loadUserAssets,
    }),
    [assets, isPending, loadUserAssets]
  )
}

export default useAssets
