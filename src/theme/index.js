import { createTheme } from "@material-ui/core/styles";
import { ptBR } from "@material-ui/core/locale";

export const theme = createTheme(
  {
    palette: {
      background: {
        default: "#EEECEC",
      },
      mode: "light",
    },
    typography: {
      fontFamily: ["Arimo"],
    },
    shape: {
      borderRadius: 20
    }
  },
  ptBR
);
