import { extendTheme, ThemeConfig } from '@chakra-ui/react'

import colors from './colors'
import layerStyles from './layerStyles'
import shadows from './shadows'
import styles from './styles'
import { fonts, fontSizes, letterSpacings, lineHeights } from './typography'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  colors,
  config,
  fontSizes,
  fonts,
  letterSpacings,
  lineHeights,
  shadows,
  styles,
  layerStyles,
})

export default theme
