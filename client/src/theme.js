import { extendTheme } from "@chakra-ui/react";
import "@fontsource/titillium-web/900.css";
import "@fontsource/montserrat/300.css";

const theme = extendTheme({
  colors: {
    black: "#001219",
    darkest_teal: "#005f73",
    teal: "#0a9396",
    light_teal: "#94d2bd",
    cream: "#e9d8a6",
    yellowish: "#ee9b00",
    orange: "#ca6702",
    orange_red: "#bb3e03",
    red: "#ae2012",
    brick_red: "#9b2226",
  },
  fonts: {
    header: `'Titillium Web'`,
    body: `'Montserrat'`,
  },
});

export default theme;
