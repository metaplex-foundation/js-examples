import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

const fontFallback = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

export const fonts = {
  heading: `Inter, ${fontFallback}`,
  body: `Inter, ${fontFallback}`,
};

export const letterSpacings = {
  tighter: "-0.03em",
  tight: "-0.02em",
  normal: "0",
  wide: "0.02em",
  wider: "0.03em",
  widest: "0.5em",
};

export const lineHeights = {
  normal: "normal",
  none: 1,
  tinier: 1.125,
  tiny: 1.2,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
  taller: 1.725,
};

export const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2rem",
  "5xl": "2.25rem",
  "6xl": "3rem",
  "7xl": "4rem",
  "8xl": "4.5rem",
  "9xl": "6rem",
  "10xl": "8rem",
};
