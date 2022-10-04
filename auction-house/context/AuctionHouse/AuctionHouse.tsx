import { createContext, useContext } from 'react'
import { AuctionHouseState } from './interface'

const DEFAULT_CONTEXT = {
  auctionHouse: null,
  handleCreateAuctionHouse: () => Promise.resolve(),
  isPending: false,
}

export const AuctionHouseContext =
  createContext<AuctionHouseState>(DEFAULT_CONTEXT)

export function useAuctionHouse() {
  return useContext(AuctionHouseContext)
}
