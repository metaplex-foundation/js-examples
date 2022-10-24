import {
  isMetadata,
  LoadMetadataOutput,
  Metadata,
  Nft,
  Sft,
  TokenGpaBuilder,
} from '@metaplex-foundation/js'
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

  const fetchAssetsMetadata = useCallback(async () => {
    if (!metaplex || !wallet || !wallet.publicKey) return null

    const mints = await new TokenGpaBuilder(metaplex)
      .selectMint()
      .whereOwner(wallet.publicKey)
      .getDataAsPublicKeys()

    const nfts = await metaplex.nfts().findAllByMintList({ mints })

    return nfts.filter((nft): nft is Metadata | Nft | Sft => nft !== null)
  }, [metaplex, wallet])

  const loadUserAssets = useCallback(async () => {
    if (client && wallet.publicKey) {
      try {
        setIsPending.on()

        // Finds and loads user's assets.
        const userAssetsMetadata = await fetchAssetsMetadata() // todo: JS SDK method as it will be developed
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
  }, [client, wallet, setIsPending, fetchAssetsMetadata])

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
