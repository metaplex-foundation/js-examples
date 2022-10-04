import { useBoolean } from '@chakra-ui/react'
import { AuctionHouse, sol, WRAPPED_SOL_MINT } from '@metaplex-foundation/js'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  FC,
  PropsWithChildren,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { useMetaplex } from '../Metaplex'
import { AuctionHouseContext } from './AuctionHouse'

const AuctionHouseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auctionHouse, setAuctionHouse] = useState<AuctionHouse>()
  const [isPending, setIsPending] = useBoolean()

  const { metaplex } = useMetaplex()
  const wallet = useWallet()

  const client = useMemo(() => metaplex?.auctions(), [metaplex])

  const handleCreateAuctionHouse = useCallback(async () => {
    if (!client || !metaplex) {
      return
    }

    // Create Auction House.
    const response = await client
      .createAuctionHouse({
        sellerFeeBasisPoints: 200, // 2% Fee
      })
      .run()

    // Airdrop SOL to AH Fee account.
    // It won't work in mainnet, you will need to send SOLs to this account.
    await metaplex
      .rpc()
      .airdrop(response.auctionHouse.feeAccountAddress, sol(100))

    setAuctionHouse(response.auctionHouse)
  }, [metaplex, client])

  const loadUserAuctionHouse = useCallback(async () => {
    if (!auctionHouse && client && wallet.publicKey) {
      setIsPending.on()

      try {
        // Finds and loads user's auction house.
        const userAuctionHouse = await client
          .findAuctionHouseByCreatorAndMint(wallet.publicKey, WRAPPED_SOL_MINT)
          .run()

        setAuctionHouse(userAuctionHouse)
      } catch {
        // do nothing, user doesn't have AH
      }

      setIsPending.off()
    }
  }, [auctionHouse, client, wallet, setIsPending])

  useEffect(() => {
    loadUserAuctionHouse()
  }, [loadUserAuctionHouse])

  const value = useMemo(
    () => ({
      auctionHouse,
      handleCreateAuctionHouse,
      isPending,
    }),
    [auctionHouse, handleCreateAuctionHouse, isPending]
  )

  return (
    <AuctionHouseContext.Provider value={value}>
      {children}
    </AuctionHouseContext.Provider>
  )
}

export default AuctionHouseProvider
