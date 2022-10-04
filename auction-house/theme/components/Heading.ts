import { Text } from "./Text";

export const Heading = {
  variants: {
    h1: {
      fontSize: "7xl",
      lineHeight: "tinier",
      letterSpacing: "tight",
    },
    h2: {
      fontSize: "6xl",
      lineHeight: "none",
    },
    h3: {
      fontSize: "4xl",
      lineHeight: "tiny",
      letterSpacing: "tight",
    },
    h4: {
      fontSize: "2xl",
      lineHeight: "tiny",
    },
    h5: {
      fontSize: "lg",
      lineHeight: "short",
    },
    button: {
      ...Text.variants.button,
    },
  },
};
