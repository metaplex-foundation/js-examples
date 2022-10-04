import type { SystemStyleObject } from "@chakra-ui/theme-tools";

import { Text } from "./Text";

const baseStyle: SystemStyleObject = {
  ...Text.variants["label-bold"],
  marginEnd: 3,
  mb: 3,
};

export const FormLabel = {
  baseStyle,
};
