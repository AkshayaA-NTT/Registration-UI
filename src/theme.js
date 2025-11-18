import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
 
  colors: {
    brand: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1976d2", 
      700: "#1565c0",
      800: "#0d47a1",
      900: "#0b3c91",
    },
  },

  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },

  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
      a: {
        color: "brand.600",
        _hover: {
          textDecoration: "none",
          color: "brand.700",
        },
      },
    },
  },


  components: {
    Button: {
      baseStyle: {
        borderRadius: "xl",
        fontWeight: "medium",
        _focusVisible: {
          boxShadow: "0 0 0 3px var(--chakra-colors-brand-300)",
        },
      },
      sizes: {
        sm: { fontSize: "sm", px: 3, py: 2, h: 8 },
        md: { fontSize: "md", px: 4, py: 2.5, h: 10 },
        lg: { fontSize: "lg", px: 6, py: 3, h: 12 },
      },
      variants: {
        primary: {
          bg: "brand.500",
          color: "white",
          _hover: { bg: "brand.600" },
          _active: { bg: "brand.700" },
        },
        secondary: {
          bg: "gray.100",
          color: "gray.800",
          _hover: { bg: "gray.200" },
          _active: { bg: "gray.300" },
        },
        danger: {
          bg: "red.500",
          color: "white",
          _hover: { bg: "red.600" },
          _active: { bg: "red.700" },
        },
        ghost: {
          bg: "transparent",
          color: "brand.600",
          _hover: { bg: "gray.100" },
        },
      },
      defaultProps: {
        variant: "primary",
        size: "md",
      },
    },

    Stat: {
      baseStyle: {
        container: {
          borderRadius: "lg",
          shadow: "sm",
          border: "1px solid",
          borderColor: "gray.100",
        },
      },
      sizes: {
        sm: { container: { p: 2 } },
        md: { container: { p: 4 } },
        lg: { container: { p: 6 } },
      },
      variants: {
        solid: {
          container: {
            bg: "brand.50",
            borderColor: "brand.200",
          },
        },
        subtle: {
          container: {
            bg: "gray.50",
            borderColor: "gray.200",
          },
        },
        outlined: {
          container: {
            borderWidth: "2px",
            borderColor: "brand.400",
          },
        },
      },
      defaultProps: {
        variant: "subtle",
        size: "md",
      },
    },

    Table: {
      sizes: {
        sm: { th: { px: 2, py: 1 }, td: { px: 2, py: 1 } },
        md: { th: { px: 3, py: 2 }, td: { px: 3, py: 2 } },
        lg: { th: { px: 4, py: 3 }, td: { px: 4, py: 3 } },
      },
      variants: {
        simple: {
          th: { fontWeight: "semibold", color: "gray.700" },
        },
        striped: {
          table: { borderCollapse: "collapse" },
          th: { fontWeight: "semibold", color: "gray.700" },
          tbody: {
            tr: {
              _even: { bg: "gray.50" },
            },
          },
        },
        unstyled: {
          table: { border: "none" },
          th: { fontWeight: "normal" },
          td: { border: "none" },
        },
      },
      defaultProps: {
        variant: "striped",
        size: "md",
      },
    },

    Select: {
      sizes: {
        sm: { field: { fontSize: "sm", h: 8, px: 2 } },
        md: { field: { fontSize: "md", h: 10, px: 3 } },
        lg: { field: { fontSize: "lg", h: 12, px: 4 } },
      },
      variants: {
        outline: {
          field: {
            borderColor: "gray.300",
            _hover: { borderColor: "brand.400" },
            _focus: {
              borderColor: "brand.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
            },
          },
        },
        filled: {
          field: {
            bg: "gray.100",
            _hover: { bg: "gray.200" },
            _focus: { borderColor: "brand.500" },
          },
        },
        flushed: {
          field: {
            borderBottom: "2px solid",
            borderColor: "gray.300",
            _focus: { borderColor: "brand.500" },
          },
        },
        unstyled: {
          field: {
            border: "none",
            bg: "transparent",
          },
        },
      },
      defaultProps: {
        variant: "outline",
        size: "md",
      },
    },

    Menu: {
      baseStyle: {
        list: {
          borderRadius: "md",
          boxShadow: "md",
        },
      },
      sizes: {
        sm: { button: { fontSize: "sm", h: 8, px: 3 } },
        md: { button: { fontSize: "md", h: 10, px: 4 } },
        lg: { button: { fontSize: "lg", h: 12, px: 6 } },
      },
      variants: {
        solid: {
          button: {
            bg: "brand.500",
            color: "white",
            _hover: { bg: "brand.600" },
          },
        },
        ghost: {
          button: {
            bg: "transparent",
            color: "brand.600",
            _hover: { bg: "gray.100" },
          },
        },
        danger: {
          button: {
            bg: "red.500",
            color: "white",
            _hover: { bg: "red.600" },
          },
        },
      },
      defaultProps: {
        variant: "solid",
        size: "md",
      },
    },
  },
});

export default theme;
