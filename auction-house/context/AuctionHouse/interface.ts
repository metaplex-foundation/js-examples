import { AuctionHouse, Option } from '@metaplex-foundation/js'

export interface AuctionHouseState {
  auctionHouse?: Option<AuctionHouse>
  handleCreateAuctionHouse(): Promise<void>
  isPending: boolean
}
