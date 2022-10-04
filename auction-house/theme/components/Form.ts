import type { SystemStyleObject } from "@chakra-ui/theme-tools";

import { Text } from "./Text";

const baseStyleRequiredIndicator: SystemStyleObject = {
  marginStart: 1,
  color: "inherit",
};

const baseStyleHelperText: SystemStyleObject = {
  ...Text.variants.subtitle,
  mt: -2,
  mb: 5,
  color: "whiteAlpha.500",
  whiteSpace: "pre-wrap",
};

export const Form = {
  baseStyle: {
    requiredIndicator: baseStyleRequiredIndicator,
    helperText: baseStyleHelperText,
  },
};
