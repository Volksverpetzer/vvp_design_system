import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (viteConfig) => {
    viteConfig.base = process.env.STORYBOOK_BASE_PATH ?? "/";
    return viteConfig;
  },
};

export default config;
