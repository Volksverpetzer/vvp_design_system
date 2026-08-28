/**
 * Emits `:root { --color-x: ...; }` and `.dark { --color-x: ...; }` blocks
 * from a color dictionary shaped `color.<light|dark>.<key>`.
 */
export function cssColorVars({ dictionary }) {
  const byMode = { light: [], dark: [] };

  for (const token of dictionary.allTokens) {
    const mode = token.path[1];
    const key = token.path[token.path.length - 1];
    const cssName = key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    byMode[mode].push(`  --vvp-${cssName}: ${token.original.$value};`);
  }

  return `:root {\n${byMode.light.join("\n")}\n}\n\n.dark {\n${byMode.dark.join("\n")}\n}\n`;
}

/**
 * Emits flat `:root { --vvp-spacing-x: ...px; }` style variables from a
 * non-color scale dictionary (spacing, radius, icon-size, font-size).
 */
export function cssScaleVars({ dictionary, options }) {
  const { prefix, unit } = options;
  const lines = dictionary.allTokens.map((token) => {
    const key = token.path[token.path.length - 1];
    const cssName = key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    return `  --vvp-${prefix}-${cssName}: ${token.original.$value}${unit ?? ""};`;
  });
  return `:root {\n${lines.join("\n")}\n}\n`;
}

/**
 * Emits the single `--vvp-font-family` CSS var from the `webFontFamily`
 * token — the sibling `fontFamily.*` React Native PostScript names have no
 * CSS output (they aren't registered @font-face family names on the web).
 */
export function cssFontFamily({ dictionary }) {
  const token = dictionary.allTokens.find((t) => t.path[0] === "webFontFamily");
  if (!token) {
    throw new Error(
      "cssFontFamily: no `webFontFamily` token found — check tokens/font-family.json",
    );
  }
  return `:root {\n  --vvp-font-family: ${token.original.$value};\n}\n`;
}

/**
 * Emits ready-to-use `:root { --vvp-elevation-x: 0px Ypx Bpx rgba(...); }`
 * box-shadow values (one property per step, not decomposed) — used directly
 * as `box-shadow: var(--vvp-elevation-x)`. Color is always neutral black;
 * see `cssElevationAccentVars` below for the brand-tinted exception.
 */
export function cssElevationVars({ dictionary }) {
  const lines = dictionary.allTokens.map((token) => {
    const key = token.path[token.path.length - 1];
    const { offsetY, blur, opacity } = token.original.$value;
    return `  --vvp-elevation-${key}: 0px ${offsetY}px ${blur}px rgba(0, 0, 0, ${opacity});`;
  });
  return `:root {\n${lines.join("\n")}\n}\n`;
}

/**
 * Emits `:root { --vvp-elevation-accent-x: 0px Ypx Bpx color-mix(...); }` —
 * the one deliberate exception to the neutral-black rule above. Color is
 * always `--vvp-primary-muted` (so it tracks the active brand and light/dark
 * mode automatically) at a per-step tint percentage, not a literal color, so
 * this can't be expressed in the plain `offsetY/blur/opacity` shape the
 * neutral scale uses.
 */
export function cssElevationAccentVars({ dictionary }) {
  const lines = dictionary.allTokens.map((token) => {
    const key = token.path[token.path.length - 1];
    const { offsetY, blur, tint } = token.original.$value;
    return `  --vvp-elevation-accent-${key}: 0px ${offsetY}px ${blur}px color-mix(in srgb, var(--vvp-primary-muted, #3893c0) ${tint}%, transparent);`;
  });
  return `:root {\n${lines.join("\n")}\n}\n`;
}
