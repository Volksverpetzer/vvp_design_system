import type { Meta, StoryObj } from "@storybook/react-vite";

import volksverpetzerColors from "../../../../tokens/tokens/color/volksverpetzer.json";
import mimikamaColors from "../../../../tokens/tokens/color/mimikama.json";

interface ColorToken {
  $value: string;
  $type: "color";
}

interface ColorScale {
  color: {
    light: Record<string, ColorToken>;
    dark: Record<string, ColorToken>;
  };
}

const BRANDS: { name: string; scale: ColorScale }[] = [
  { name: "Volksverpetzer", scale: volksverpetzerColors as ColorScale },
  { name: "Mimikama", scale: mimikamaColors as ColorScale },
];

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: hex,
          border: "1px solid rgba(128,128,128,0.3)",
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontFamily: "monospace", fontSize: 13 }}>{name}</div>
        <div style={{ fontFamily: "monospace", fontSize: 12, opacity: 0.6 }}>
          {hex}
        </div>
      </div>
    </div>
  );
}

function ColorTable({ scale }: { scale: ColorScale }) {
  const names = Object.keys(scale.color.light);
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>Token</th>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>Light</th>
          <th style={{ textAlign: "left", padding: "8px 12px" }}>Dark</th>
        </tr>
      </thead>
      <tbody>
        {names.map((name) => (
          <tr
            key={name}
            style={{ borderTop: "1px solid rgba(128,128,128,0.2)" }}
          >
            <td style={{ padding: "10px 12px", fontFamily: "monospace" }}>
              --vvp-{name.replace(/([A-Z])/g, "-$1").toLowerCase()}
            </td>
            <td style={{ padding: "10px 12px" }}>
              <Swatch name={name} hex={scale.color.light[name].$value} />
            </td>
            <td style={{ padding: "10px 12px" }}>
              <Swatch name={name} hex={scale.color.dark[name].$value} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const meta: Meta = {
  title: "Tokens/Colors",
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj;

export const Volksverpetzer: Story = {
  render: () => <ColorTable scale={BRANDS[0].scale} />,
};

export const Mimikama: Story = {
  render: () => <ColorTable scale={BRANDS[1].scale} />,
};

export const AllBrands: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {BRANDS.map(({ name, scale }) => (
        <div key={name}>
          <h3>{name}</h3>
          <ColorTable scale={scale} />
        </div>
      ))}
    </div>
  ),
};
