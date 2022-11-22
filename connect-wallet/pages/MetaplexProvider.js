import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { MetaplexContext } from './useMetaplex';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';

export const MetaplexProvider = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const metaplex = useMemo(
    () => Metaplex.make(connection).use(walletAdapterIdentity(wallet)),
    [connection, wallet]
  );

  const MintNFTs = async ({ onClusterChange }) => {
  const candyMachine = await metaplex
  .candyMachines()
  .findByAddress({ address: candyMachineAddress });


  const guard = candyMachine.candyGuard.guards;
  console.log(guard.tokenBurn?.amount.basisPoints.toNumber())
  };
  return (
    <MetaplexContext.Provider value={{ metaplex }}>
      {children}
    </MetaplexContext.Provider>
  )
}
