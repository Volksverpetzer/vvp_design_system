import type { Meta, StoryObj } from "@storybook/react-vite";

import fontSizeTokens from "../../../../tokens/tokens/font-size.json";
import fontFamilyTokens from "../../../../tokens/tokens/font-family.json";

interface FontSizeToken {
  $value: number;
  $type: "dimension";
  $description?: string;
  $extensions?: { lineHeight?: number };
}

interface FontFamilyToken {
  $value: string;
  $type: "fontFamily";
  $description?: string;
}

const tokens = fontSizeTokens.fontSize as Record<string, FontSizeToken>;
const rnFontFamilies = fontFamilyTokens.fontFamily as Record<
  string,
  FontFamilyToken
>;
const webFontFamily = fontFamilyTokens.webFontFamily as FontFamilyToken;

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
              Sample text
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

export const FontFamilies: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h3 style={{ margin: "0 0 8px" }}>Web</h3>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>Token</th>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>Value</th>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>
                Preview
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderTop: "1px solid rgba(128,128,128,0.2)" }}>
              <td style={{ padding: "10px 12px", fontFamily: "monospace" }}>
                --vvp-font-family
              </td>
              <td style={{ padding: "10px 12px", fontFamily: "monospace" }}>
                {webFontFamily.$value}
              </td>
              <td
                style={{
                  padding: "10px 12px",
                  fontFamily: webFontFamily.$value,
                  fontSize: 18,
                }}
              >
                The quick brown fox jumps over the lazy dog
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3 style={{ margin: "0 0 8px" }}>React Native</h3>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>Token</th>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>
                PostScript name
              </th>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>Usage</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rnFontFamilies).map(([name, token]) => (
              <tr
                key={name}
                style={{ borderTop: "1px solid rgba(128,128,128,0.2)" }}
              >
                <td style={{ padding: "10px 12px", fontFamily: "monospace" }}>
                  fontFamily.{name}
                </td>
                <td style={{ padding: "10px 12px", fontFamily: "monospace" }}>
                  {token.$value}
                </td>
                <td
                  style={{ padding: "10px 12px", fontSize: 13, opacity: 0.8 }}
                >
                  {token.$description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 13, opacity: 0.7, marginTop: 8 }}>
          These are PostScript names loaded via expo-font in vvp_app — they
          aren&apos;t registered as web fonts here, so there&apos;s no live
          preview.
        </p>
      </div>
    </div>
  ),
};
