import { createTheme } from "@material-ui/core/styles";
import { ptBR } from "@material-ui/core/locale";

export const theme = createTheme(
  {
    palette: {
      background: {
        default: "#E0E0E0",
        paper: "#E0E0E0",
      },
      mode: "light",
    },
    typography: {
      fontFamily: ["Arimo"],
    },
    shape: {
      borderRadius: 20,
    },
    components: {
      // MuiInputBase: {
      //   styleOverrides: {
      //     root: {
      //       backgroundColor: "#E0E0E0",
      //     },
      //   },
      // },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            backgroundColor: "#E0E0E0",
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          // The props to change the default for.
          disableRipple: true, // No more ripple!
        },
      },
    },
  },
  ptBR
);
