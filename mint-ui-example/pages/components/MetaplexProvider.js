import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { MetaplexContext } from "./useMetaplex";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

const MetaplexProvider = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const metaplex = useMemo(
    () => Metaplex.make(connection).use(walletAdapterIdentity(wallet)),
    [connection, wallet]
  );

  console.log(MetaplexContext.Provider.metaplex);
  return (
    <MetaplexContext.Provider value={{ metaplex }}>
      {children}
    </MetaplexContext.Provider>
    //    <MetaplexContext._currentValue>
    //    {children}
    //  </MetaplexContext._currentValue>
  );
};
export default MetaplexProvider;
