import { formatAmount, lamports, Listing } from '@metaplex-foundation/js'

const formatPrice = (listing: Listing) => {
  const basisAmount = lamports(listing.price.basisPoints)

  return formatAmount(basisAmount)
}

export default formatPrice
