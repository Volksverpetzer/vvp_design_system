import type { Meta, StoryObj } from "@storybook/react-vite";

import radiusTokens from "../../../../tokens/tokens/radius.json";

interface DimensionToken {
  $value: number;
  $type: "dimension";
  $description?: string;
}

const tokens = radiusTokens.radius as Record<string, DimensionToken>;

const meta: Meta = {
  title: "Tokens/Radius",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const AllValues: Story = {
  render: () => (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>Token</th>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>Value</th>
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
              --vvp-radius-{name.toLowerCase()}
            </td>
            <td style={{ padding: "10px 12px", fontFamily: "monospace" }}>
              {token.$value}px
            </td>
            <td style={{ padding: "10px 12px" }}>
              <div
                style={{
                  height: 48,
                  width: 48,
                  background: "#1B7194",
                  borderRadius: Math.min(token.$value, 48),
                }}
              />
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
