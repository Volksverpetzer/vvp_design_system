/**
 * Custom Style Dictionary format: emits a `export const x = {...} as const`
 * module matching vvp_app's existing hand-written constants style (JSDoc
 * per-property, optional file-level header, optional derived type export).
 */
export function rnTsConst({ dictionary, options }) {
  const { exportName, typeName, headerText, extraExports } = options;

  const lines = dictionary.allTokens.map((token) => {
    const key = token.path[token.path.length - 1];
    const desc = token.original.$description ? `  /** ${token.original.$description} */\n` : "";
    return `${desc}  ${key}: ${JSON.stringify(token.original.$value)},`;
  });

  const header = headerText ? `/**\n${headerText.split("\n").map((l) => ` * ${l}`).join("\n")}\n */\n` : "";

  const body = `export const ${exportName} = {\n${lines.join("\n")}\n} as const;\n`;

  const typeExport = typeName
    ? `\nexport type ${typeName} = keyof typeof ${exportName};\n`
    : "";

  return `${header}${body}${typeExport}${extraExports ?? ""}`;
}

/**
 * Emits fontSizes + FontSizeToken + CONTENT_LINE_HEIGHT + LINE_HEIGHTS,
 * reading the paired line-height off each token's `$extensions.lineHeight`.
 */
export function rnFontSizes({ dictionary, options }) {
  const { headerText } = options;
  const sizeTokens = dictionary.allTokens.filter((t) => t.path[0] === "fontSize");
  const contentLineHeight = dictionary.allTokens.find((t) => t.path[0] === "contentLineHeight");

  const sizeLines = sizeTokens.map((t) => {
    const key = t.path[t.path.length - 1];
    const desc = t.original.$description ? `  /** ${t.original.$description} */\n` : "";
    return `${desc}  ${key}: ${JSON.stringify(t.original.$value)},`;
  });

  const lineHeightLines = sizeTokens.map((t) => {
    const key = t.path[t.path.length - 1];
    const lh = t.original.$extensions?.lineHeight;
    return `  ${key}: ${JSON.stringify(lh)}, // ${t.original.$value} × ~1.33–1.4`;
  });

  const header = headerText ? `/**\n${headerText.split("\n").map((l) => ` * ${l}`).join("\n")}\n */\n` : "";

  return `${header}export const fontSizes = {
${sizeLines.join("\n")}
} as const;

export type FontSizeToken = keyof typeof fontSizes;

/**
 * ${contentLineHeight.original.$description}
 */
export const CONTENT_LINE_HEIGHT = ${contentLineHeight.original.$value};

/**
 * Recommended line heights per font size for optimal text readability.
 * Formula: size × ~1.33–1.4 for comfortable linespacing without looking loose.
 */
export const LINE_HEIGHTS = {
${lineHeightLines.join("\n")}
} as const;
`;
}

/**
 * Emits iconSizes + IconSizeToken + a standalone MIN_TOUCH_TARGET export
 * (kept out of the iconSizes scale object — it's a hit-area constant, not a
 * valid icon `size` step).
 */
export function rnIconSizes({ dictionary, options }) {
  const { headerText } = options;
  const sizeTokens = dictionary.allTokens.filter((t) => t.path[0] === "iconSize");
  const minTouchTarget = dictionary.allTokens.find((t) => t.path[0] === "minTouchTarget");

  const sizeLines = sizeTokens.map((t) => {
    const key = t.path[t.path.length - 1];
    const desc = t.original.$description ? `  /** ${t.original.$description} */\n` : "";
    return `${desc}  ${key}: ${JSON.stringify(t.original.$value)},`;
  });

  const header = headerText ? `/**\n${headerText.split("\n").map((l) => ` * ${l}`).join("\n")}\n */\n` : "";

  return `${header}export const iconSizes = {
${sizeLines.join("\n")}
} as const;

export type IconSizeToken = keyof typeof iconSizes;

/**
 * ${minTouchTarget.original.$description}
 */
export const MIN_TOUCH_TARGET = ${minTouchTarget.original.$value};
`;
}

/**
 * Emits a colorScheme object shaped `{ light: {...}, dark: {...} }`,
 * matching vvp_app's `colorSchemeType`.
 */
export function rnColorScheme({ dictionary, options }) {
  const { exportName } = options;
  const byMode = { light: [], dark: [] };

  for (const token of dictionary.allTokens) {
    const mode = token.path[1]; // color.<mode>.<key>
    const key = token.path[token.path.length - 1];
    byMode[mode].push(`    ${key}: ${JSON.stringify(token.original.$value)},`);
  }

  return `export const ${exportName} = {
  light: {
${byMode.light.join("\n")}
  },
  dark: {
${byMode.dark.join("\n")}
  },
} as const;
`;
}
