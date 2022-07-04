import { Metaplex, walletOrGuestIdentity } from '@metaplex-foundation/js';
import { MetaplexContext } from './useMetaplex';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';

export const MetaplexProvider = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const metaplex = useMemo(() => {
    return Metaplex.make(connection)
      .use(walletOrGuestIdentity(wallet.connected ? wallet : null));
  }, [connection, wallet]);

  return (
    <MetaplexContext.Provider value={{ metaplex }}>
      {children}
    </MetaplexContext.Provider>
  )
}
