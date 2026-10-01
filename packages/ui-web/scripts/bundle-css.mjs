// Copies each component's .css next to its compiled .js (so the component's
// own `import "./Button.css"` side-effect import resolves at dist/ runtime),
// and also concatenates everything into dist/styles.css as a single
// convenience import for consumers that prefer to load styles once.
//
// Also vendors the house webfont (Source Sans Pro, weights 400/600/700 plus italics) from
// @fontsource/source-sans-pro — a build-time-only devDependency — into
// dist/fonts/, and prepends its rewritten @font-face CSS to dist/styles.css.
// This is what lets consumers get the actual font just by importing
// "@volksverpetzer/ui-web/styles.css" (already required for the components'
// own CSS), instead of each app separately depending on @fontsource and
// importing its per-weight CSS in their root layout.
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  mkdirSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const srcDir = "src";
const distDir = "dist";
// Each entry is a fontsource CSS file: upright weights, then their italics.
const fontVariants = [
  "400",
  "600",
  "700",
  "400-italic",
  "600-italic",
  "700-italic",
];

function bundleFont() {
  const fontDistDir = join(distDir, "fonts");
  mkdirSync(fontDistDir, { recursive: true });

  const fontPackageDir = dirname(
    require.resolve("@fontsource/source-sans-pro/package.json"),
  );

  // Ship the OFL text alongside the binaries it covers -- required by the
  // license when redistributing the font files themselves, not just the
  // package that happens to depend on them.
  copyFileSync(join(fontPackageDir, "LICENSE"), join(fontDistDir, "OFL.txt"));

  let fontCss = `/*\n * Source Sans Pro, vendored at build time from\n * @fontsource/source-sans-pro (SIL Open Font License 1.1 -- see\n * ./fonts/OFL.txt). Variants: ${fontVariants.join(", ")}. woff2 only --\n * every browser this app supports has shipped woff2 support since 2016,\n * so the legacy woff fallback @fontsource also ships is dropped.\n */\n`;

  for (const variant of fontVariants) {
    const weightCssPath = join(fontPackageDir, `${variant}.css`);
    const css = readFileSync(weightCssPath, "utf8");

    // Each rule's `src` lists a woff2 and a woff url(); drop the woff
    // clause entirely and copy only the woff2 files it references.
    const woff2OnlyCss = css.replace(
      /url\(\.\/files\/([^)]+\.woff2)\) format\('woff2'\), url\(\.\/files\/[^)]+\.woff\) format\('woff'\);/g,
      "url(./fonts/$1) format('woff2');",
    );

    const referencedFiles = new Set(
      [...woff2OnlyCss.matchAll(/url\(\.\/fonts\/([^)]+)\)/g)].map((m) => m[1]),
    );
    for (const fileName of referencedFiles) {
      copyFileSync(
        join(fontPackageDir, "files", fileName),
        join(fontDistDir, fileName),
      );
    }

    fontCss += "\n" + woff2OnlyCss + "\n";
  }

  writeFileSync(join(distDir, "fonts.css"), fontCss);
  console.log(
    `Vendored ${fontVariants.length} font variants into dist/fonts/, wrote dist/fonts.css.`,
  );
  return fontCss;
}

// Sorted explicitly: readdirSync's order is platform/filesystem-dependent,
// not guaranteed alphabetical, and dist/styles.css concatenates these
// rules into one cascade — an unstable order can silently flip which
// same-specificity rule wins (e.g. a component's own class vs. a shared
// base class it depends on being overridden last).
const cssFiles = readdirSync(srcDir)
  .filter((f) => f.endsWith(".css"))
  .sort();

let combined = bundleFont();
for (const file of cssFiles) {
  copyFileSync(join(srcDir, file), join(distDir, file));
  combined += readFileSync(join(srcDir, file), "utf8") + "\n";
}

writeFileSync(join(distDir, "styles.css"), combined);
console.log(`Copied ${cssFiles.length} CSS files, wrote dist/styles.css.`);
