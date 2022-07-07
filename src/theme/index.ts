import { extendTheme } from "@chakra-ui/react";

import { colors, fonts, shadows } from "./globalStyleConfig";
import { Form, Button, FormLabel, CustomToast } from "./componentsStyleConfig";

export const theme = extendTheme({
  colors,
  fonts,
  shadows,
  components: { Form, Button, FormLabel, CustomToast },
});
