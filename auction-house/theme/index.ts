import { extendTheme, ThemeConfig } from "@chakra-ui/react";

import { colors } from "./colors";
import { components } from "./components";
import { layerStyles } from "./layerStyles";
import { shadows } from "./shadows";
import { styles } from "./styles";
import { fonts, fontSizes, letterSpacings, lineHeights } from "./typography";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  colors,
  components,
  config,
  fontSizes,
  fonts,
  letterSpacings,
  lineHeights,
  shadows,
  styles,
  layerStyles,
});
