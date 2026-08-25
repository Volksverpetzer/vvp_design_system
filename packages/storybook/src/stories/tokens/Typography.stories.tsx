import type { Meta, StoryObj } from "@storybook/react-vite";

import fontSizeTokens from "../../../../tokens/tokens/font-size.json";

interface FontSizeToken {
  $value: number;
  $type: "dimension";
  $description?: string;
  $extensions?: { lineHeight?: number };
}

const tokens = fontSizeTokens.fontSize as Record<string, FontSizeToken>;

const meta: Meta = {
  title: "Tokens/Typography",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const FontSizes: Story = {
  render: () => (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>Token</th>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>
            Size / Line height
          </th>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>Preview</th>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>Usage</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(tokens).map(([name, token]) => (
          <tr
            key={name}
            style={{ borderTop: "1px solid rgba(128,128,128,0.2)" }}
          >
            <td style={{ padding: "10px 12px", fontFamily: "monospace" }}>
              --vvp-font-size-{name.toLowerCase()}
            </td>
            <td style={{ padding: "10px 12px", fontFamily: "monospace" }}>
              {token.$value}px / {token.$extensions?.lineHeight}px
            </td>
            <td
              style={{
                padding: "10px 12px",
                fontSize: token.$value,
                lineHeight: `${token.$extensions?.lineHeight}px`,
              }}
            >
              Volksverpetzer
            </td>
            <td style={{ padding: "10px 12px", fontSize: 13, opacity: 0.8 }}>
              {token.$description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
