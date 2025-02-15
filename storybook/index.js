import { getStorybookUI, configure } from "@storybook/react-native";
import { AppRegistry } from "react-native";

// Importa automaticamente todos os arquivos `*.stories.js` dentro de `src/components`
const req = require.context("../components", true, /\.stories\.js$/);

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);

const StorybookUIRoot = getStorybookUI({});

AppRegistry.registerComponent("%APP_NAME%", () => StorybookUIRoot);

export default StorybookUIRoot;