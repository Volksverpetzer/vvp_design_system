/**
 * Emits Sass custom-property color vars wrapped with the `--brand-*` runtime
 * override hook vvp_divi5_extensions relies on (Divi's WP-admin Global
 * Colors overrides these at runtime). Only the light palette is emitted —
 * Divi's frontend does not currently have a dark-mode concept.
 */
export function scssBrandVars({ dictionary }) {
  const lines = dictionary.allTokens
    .filter((token) => token.path[1] === "light")
    .map((token) => {
      const key = token.path[token.path.length - 1];
      const cssName = key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      return `  --vvp-color-${cssName}: var(--brand-${cssName}, ${token.original.$value});`;
    });
  return `:root {\n${lines.join("\n")}\n}\n`;
}
