/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import type {
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleObject,
} from "@chakra-ui/theme-tools";
import { getColor } from "@chakra-ui/theme-tools";

const size: Record<string, SystemStyleObject> = {
  lg: {
    fontSize: "lg",
    p: 4,
    pl: 5,
    h: 16,
    borderRadius: "xl",
  },

  md: {
    fontSize: "md",
    p: 4,
    pl: 5,
    h: 14,
    borderRadius: "xl",
  },

  sm: {
    fontSize: "sm",
    p: 3,
    pl: 4,
    h: 12,
    borderRadius: "xl",
  },

  xs: {
    fontSize: "xs",
    p: 2,
    pl: 3,
    h: 10,
    borderRadius: "lg",
  },
};

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  lg: {
    field: size.lg,
    addon: size.lg,
  },
  md: {
    field: size.md,
    addon: size.md,
  },
  sm: {
    field: size.sm,
    addon: size.sm,
  },
  xs: {
    field: size.xs,
    addon: size.xs,
  },
};

function getDefaults(props: Record<string, string>): Record<string, string> {
  const { focusBorderColor: fc, errorBorderColor: ec } = props;
  return {
    focusBorderColor: fc || "green.500",
    errorBorderColor: ec || "pink.600",
  };
}

const variantOutline: PartsStyleFunction<typeof parts> = (props) => {
  const { theme } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      border: "none",
      borderColor: "inherit",
      bg: "gray.800",
      color: "whiteAlpha.700",
      _hover: {
        color: "white",
      },
      _readOnly: {
        boxShadow: "none !important",
        color: `${getColor(theme, "whiteAlpha.700")} !important`,
        fontWeight: "normal !important",
        userSelect: "all",
      },
      _disabled: {
        opacity: 0.4,
        color: `${getColor(theme, "whiteAlpha.700")} !important`,
        cursor: "not-allowed",
      },
      _invalid: {
        border: "2px solid #D83AEB",
        borderColor: getColor(theme, ec),
        boxShadow: `inset 0 0 0 1px ${getColor(theme, ec)}`,
      },
      _focus: {
        zIndex: 1,
        fontWeight: "bold",
        color: "white",
        boxShadow: `inset 0 0 0 1px ${getColor(theme, fc)}`,
      },
    },
  };
};

export const Input = {
  variants: {
    outline: variantOutline,
  },
  sizes,
};
