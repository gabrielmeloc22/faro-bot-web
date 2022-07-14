import { extendTheme } from "@chakra-ui/react";

import { colors, fonts, shadows } from "./config";
import { components } from "./components";

export const theme = extendTheme({
  colors,
  fonts,
  shadows,
  components,
});
