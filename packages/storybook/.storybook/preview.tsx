import type { Decorator, Preview } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useEffect } from "react";

import volksverpetzerCss from "@volksverpetzer/design-tokens/css/volksverpetzer.css?raw";
import mimikamaCss from "@volksverpetzer/design-tokens/css/mimikama.css?raw";

const BRAND_CSS: Record<string, string> = {
  volksverpetzer: volksverpetzerCss,
  mimikama: mimikamaCss,
};

const TOKENS_STYLE_ID = "vvp-tokens";

function TokensProvider({
  brand,
  scheme,
  children,
}: {
  brand: string;
  scheme: string;
  children: ReactNode;
}) {
  useEffect(() => {
    let style = document.getElementById(
      TOKENS_STYLE_ID,
    ) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.id = TOKENS_STYLE_ID;
      document.head.appendChild(style);
    }
    style.textContent = BRAND_CSS[brand] ?? BRAND_CSS.volksverpetzer;

    document.documentElement.classList.toggle("dark", scheme === "dark");
    document.body.style.background = "var(--vvp-background)";
    document.body.style.color = "var(--vvp-text)";
    document.body.style.fontFamily =
      "system-ui, -apple-system, Segoe UI, sans-serif";
  }, [brand, scheme]);

  return children;
}

const withTokens: Decorator = (Story, context) => {
  const brand = context.globals.brand ?? "volksverpetzer";
  const scheme = context.globals.scheme ?? "light";

  return (
    <TokensProvider brand={brand} scheme={scheme}>
      <Story />
    </TokensProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    brand: {
      description: "Design token brand",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [
          { value: "volksverpetzer", title: "Volksverpetzer" },
          { value: "mimikama", title: "Mimikama" },
        ],
        dynamicTitle: true,
      },
    },
    scheme: {
      description: "Color scheme",
      toolbar: {
        title: "Scheme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    brand: "volksverpetzer",
    scheme: "light",
  },
  decorators: [withTokens],
};

export default preview;
