import { createContext, useContext } from "react";

const DEFAULT_CONTEXT = {
  metaplex: null,
};

const MetaplexContext = createContext(DEFAULT_CONTEXT);

export function useMetaplex() {
  return useContext(MetaplexContext);
}
export default MetaplexContext