// Copies each component's .css next to its compiled .js (so the component's
// own `import "./Button.css"` side-effect import resolves at dist/ runtime),
// and also concatenates everything into dist/styles.css as a single
// convenience import for consumers that prefer to load styles once.
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
} from "node:fs";
import { join } from "node:path";

const srcDir = "src";
const distDir = "dist";

// Sorted explicitly: readdirSync's order is platform/filesystem-dependent,
// not guaranteed alphabetical, and dist/styles.css concatenates these
// rules into one cascade — an unstable order can silently flip which
// same-specificity rule wins (e.g. a component's own class vs. a shared
// base class it depends on being overridden last).
const cssFiles = readdirSync(srcDir)
  .filter((f) => f.endsWith(".css"))
  .sort();

let combined = "";
for (const file of cssFiles) {
  copyFileSync(join(srcDir, file), join(distDir, file));
  combined += readFileSync(join(srcDir, file), "utf8") + "\n";
}

writeFileSync(join(distDir, "styles.css"), combined);
console.log(`Copied ${cssFiles.length} CSS files, wrote dist/styles.css.`);
