import { useBoolean } from '@chakra-ui/react'
import {
  AuctionHouse,
  sol,
  WRAPPED_SOL_MINT,
  Option,
  AuctionHouseClient,
  toPublicKey,
} from '@metaplex-foundation/js'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  FC,
  PropsWithChildren,
  useMemo,
  useState,
  useCallback,
  createContext,
  useContext,
} from 'react'
import {PublicKey} from "@solana/web3.js";
import { useMetaplex } from './Metaplex'

interface AuctionHouseState {
  auctionHouse?: Option<AuctionHouse>
  client?: Option<AuctionHouseClient>
  handleCreateAuctionHouse(): Promise<void>
  handleAuctionHouseDisconnect(): Promise<void>
  loadAuctionHouse(ahAddress: PublicKey): Promise<void>
  loadUserAuctionHouse(): Promise<void>
  isPending: boolean
}

const DEFAULT_CONTEXT = {
  auctionHouse: null,
  client: null,
  handleCreateAuctionHouse: () => Promise.resolve(),
  handleAuctionHouseDisconnect: () => Promise.resolve(),
  loadAuctionHouse: () => Promise.resolve(),
  loadUserAuctionHouse: () => Promise.resolve(),
  isPending: false,
}

const AuctionHouseContext = createContext<AuctionHouseState>(DEFAULT_CONTEXT)

export const AuctionHouseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auctionHouse, setAuctionHouse] = useState<AuctionHouse>()
  const [isPending, setIsPending] = useBoolean()

  const { metaplex } = useMetaplex()
  const wallet = useWallet()

  const client = useMemo(() => metaplex?.auctionHouse(), [metaplex])

  const handleCreateAuctionHouse = useCallback(async () => {
    if (!client || !metaplex) {
      return
    }

    // Create Auction House.
    const response = await client
      .create({
        sellerFeeBasisPoints: 200, // 2% Fee
      })

    // Airdrop SOL to AH Fee account.
    // It won't work in mainnet, you will need to send SOLs to this account.
    await metaplex
      .rpc()
      .airdrop(response.auctionHouse.feeAccountAddress, sol(1))

    setAuctionHouse(response.auctionHouse)
  }, [metaplex, client])

  const loadAuctionHouse = useCallback(async (ahAddress: PublicKey) => {
    if (!auctionHouse && client && wallet.publicKey) {
      setIsPending.on()

      try {
        // Finds and loads user's auction house.
        const userAuctionHouse = await client.findByAddress({
            address: ahAddress
          });


        setAuctionHouse(userAuctionHouse)
      } catch {
        // do nothing, user doesn't have AH
      }

      setIsPending.off()
    }
  }, [auctionHouse, client, wallet, setIsPending])

  const loadUserAuctionHouse = useCallback(async () => {
    if (!auctionHouse && client && wallet.publicKey) {
      setIsPending.on()

      try {
        // Finds and loads auction house by address.
         const userAuctionHouse = await client
              .findByCreatorAndMint({
                creator: toPublicKey(wallet.publicKey),
                treasuryMint: WRAPPED_SOL_MINT
              });
        setAuctionHouse(userAuctionHouse)
      } catch {
        // do nothing, user doesn't have AH
      }

      setIsPending.off()
    }
  }, [auctionHouse, client, wallet, setIsPending])

  const value = useMemo(
    () => ({
      auctionHouse,
      client,
      loadAuctionHouse,
      loadUserAuctionHouse,
      handleCreateAuctionHouse,
      handleAuctionHouseDisconnect: () => Promise.resolve(setAuctionHouse(undefined)),
      isPending,
    }),
    [auctionHouse, client, handleCreateAuctionHouse,loadAuctionHouse, loadUserAuctionHouse, isPending]
  )

  return (
    <AuctionHouseContext.Provider value={value}>
      {children}
    </AuctionHouseContext.Provider>
  )
}

export function useAuctionHouse() {
  return useContext(AuctionHouseContext)
}
