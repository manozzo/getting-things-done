import { createTheme } from "@material-ui/core/styles";
import { ptBR } from "@material-ui/core/locale";

export const theme = createTheme(
  {
    palette: {
      background: {
        default: "#F4F6F8",
        paper: "#F4F6F8",
      },
      mode: "light",
    },
    typography: {
      fontFamily: ["Arimo"],
    },
  },
  ptBR
);
