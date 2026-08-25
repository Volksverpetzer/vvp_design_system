import type { Meta, StoryObj } from "@storybook/react-vite";

import elevationTokens from "../../../../tokens/tokens/elevation.json";

interface ElevationToken {
  $value: { offsetY: number; blur: number; opacity: number; android: number };
  $description?: string;
}

const tokens = elevationTokens.elevation as Record<string, ElevationToken>;

const meta: Meta = {
  title: "Tokens/Elevation",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj;

export const AllValues: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 48,
        flexWrap: "wrap",
        padding: 24,
        background: "#f0f0f0",
      }}
    >
      {Object.entries(tokens).map(([name, token]) => (
        <div key={name} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 12,
              background: "#fff",
              boxShadow: `0 ${token.$value.offsetY}px ${token.$value.blur}px rgba(0,0,0,${token.$value.opacity})`,
            }}
          />
          <div
            style={{
              marginTop: 12,
              fontFamily: "monospace",
              fontSize: 13,
            }}
          >
            elevation.{name}
          </div>
          <div style={{ fontSize: 12, opacity: 0.6, maxWidth: 160 }}>
            {token.$description}
          </div>
        </div>
      ))}
    </div>
  ),
};
