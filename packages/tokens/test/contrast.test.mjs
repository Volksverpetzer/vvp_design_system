// Guards the text/link role of `linkText`: it must reach WCAG AA (4.5:1)
// against both surfaces it is rendered on, in every brand and scheme, so a
// later palette change can't regress link contrast silently.
import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const BRANDS = ["volksverpetzer", "mimikama"];
const SCHEMES = ["light", "dark"];
const SURFACES = ["background", "surface"];
const WCAG_AA_TEXT = 4.5;

// Known pre-existing failures, reported as `todo` so they stay visible in the
// test output without failing CI. Remove an entry once the palette is fixed.
const KNOWN_FAILURES = {
  // #DB0301 on #EEE is 4.496:1 — rounds to 4.50 but misses AA. Light mode
  // deliberately keeps linkText === primary, so fixing it is a palette call.
  "mimikama/light/surface":
    "Mimikama light linkText on surface is 4.496:1 (pre-existing)",
};

function loadColors(brand) {
  const url = new URL(`../tokens/color/${brand}.json`, import.meta.url);
  return JSON.parse(readFileSync(url, "utf8")).color;
}

function parseHex(hex) {
  let h = hex.replace(/^#/, "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  assert.match(h, /^[0-9a-f]{6}$/i, `unsupported color value: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

// WCAG 2.x relative luminance.
function relativeLuminance(hex) {
  const [r, g, b] = parseHex(hex).map((c) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a, b) {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x,
  );
  return (hi + 0.05) / (lo + 0.05);
}

test("contrastRatio matches known WCAG reference values", () => {
  assert.equal(contrastRatio("#000", "#FFF"), 21);
  assert.equal(contrastRatio("#777", "#777"), 1);
  assert.equal(contrastRatio("#767676", "#FFF").toFixed(2), "4.54");
});

for (const brand of BRANDS) {
  const colors = loadColors(brand);
  for (const scheme of SCHEMES) {
    for (const surface of SURFACES) {
      const fg = colors[scheme].linkText.$value;
      const bg = colors[scheme][surface].$value;
      const todo = KNOWN_FAILURES[`${brand}/${scheme}/${surface}`];
      const name = `${brand} ${scheme}: linkText ${fg} on ${surface} ${bg} ≥ ${WCAG_AA_TEXT}:1`;
      test(name, { todo }, () => {
        const ratio = contrastRatio(fg, bg);
        assert.ok(
          ratio >= WCAG_AA_TEXT,
          `${brand} ${scheme} linkText ${fg} on ${surface} ${bg} is ${ratio.toFixed(3)}:1, needs ≥ ${WCAG_AA_TEXT}:1`,
        );
      });
    }
  }
}
