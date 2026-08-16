import StyleDictionary from "style-dictionary";

import {
  rnTsConst,
  rnFontSizes,
  rnIconSizes,
  rnElevation,
  rnColorScheme,
} from "./formats/rn-ts-const.mjs";
import {
  cssColorVars,
  cssScaleVars,
  cssElevationVars,
} from "./formats/css-vars.mjs";
import { scssBrandVars } from "./formats/scss-vars.mjs";

StyleDictionary.registerFormat({ name: "rn/ts-const", format: rnTsConst });
StyleDictionary.registerFormat({ name: "rn/font-sizes", format: rnFontSizes });
StyleDictionary.registerFormat({ name: "rn/icon-sizes", format: rnIconSizes });
StyleDictionary.registerFormat({ name: "rn/elevation", format: rnElevation });
StyleDictionary.registerFormat({
  name: "rn/color-scheme",
  format: rnColorScheme,
});
StyleDictionary.registerFormat({
  name: "css/color-vars",
  format: cssColorVars,
});
StyleDictionary.registerFormat({
  name: "css/scale-vars",
  format: cssScaleVars,
});
StyleDictionary.registerFormat({
  name: "css/elevation-vars",
  format: cssElevationVars,
});
StyleDictionary.registerFormat({
  name: "scss/brand-vars",
  format: scssBrandVars,
});

const SPACING_HEADER = `Central spacing scale for the app.

Every margin/padding/gap value should come from this scale so vertical and
horizontal rhythm reads as one system. The steps aren't a strict arithmetic
progression — 10 and 20 are the app's most common values, so the scale keeps
those two fixed and folds everything else onto its nearest neighbour.

Source of truth: vvp_design_system/packages/tokens/tokens/spacing.json`;

const RADIUS_HEADER = `Central corner-radius scale for the app.

Every rounded corner should come from this scale so surfaces read as one
system. Not for circles and pills — those derive their radius from their own
size, not from this scale.

Source of truth: vvp_design_system/packages/tokens/tokens/radius.json`;

const ICON_SIZE_HEADER = `Central icon-size scale for the app.

Every icon \`size\` prop should come from this scale so icons read as one
system alongside \`radii\`/\`fontSizes\`/\`spacing\`.

Source of truth: vvp_design_system/packages/tokens/tokens/icon-size.json`;

const FONT_SIZE_HEADER = `Central font-size scale for the app.

Every text size should come from this scale so the typographic hierarchy
stays consistent and auditable.

Source of truth: vvp_design_system/packages/tokens/tokens/font-size.json`;

async function buildScale({
  source,
  exportName,
  typeName,
  headerText,
  rnFile,
  cssPrefix,
  cssUnit,
  scss = false,
}) {
  const platforms = {
    rn: {
      transformGroup: "js",
      buildPath: "gen-rn/rn/shared/",
      files: [
        {
          destination: rnFile,
          format: "rn/ts-const",
          options: { exportName, typeName, headerText },
        },
      ],
    },
    css: {
      transformGroup: "css",
      buildPath: "dist/css/",
      files: [
        {
          destination: `${cssPrefix}.css`,
          format: "css/scale-vars",
          options: { prefix: cssPrefix, unit: cssUnit ?? "" },
        },
      ],
    },
  };

  // Sass doesn't inline `@import "foo.css"` at build time (it passes it
  // through as a literal runtime CSS import instead) — consumers that want
  // this scale via Sass (e.g. vvp_divi5_extensions) need a real .scss file.
  if (scss) {
    platforms.scss = {
      transformGroup: "css",
      buildPath: "dist/scss/",
      files: [
        {
          destination: `${cssPrefix}.scss`,
          format: "css/scale-vars",
          options: { prefix: cssPrefix, unit: cssUnit ?? "" },
        },
      ],
    };
  }

  const sd = new StyleDictionary({
    usesDtcg: true,
    source: [source],
    platforms,
  });
  await sd.buildAllPlatforms();
}

async function buildColorBrand(brand) {
  const sd = new StyleDictionary({
    usesDtcg: true,
    source: [`tokens/color/${brand}.json`],
    platforms: {
      rn: {
        transformGroup: "js",
        buildPath: `gen-rn/rn/${brand}/`,
        files: [
          {
            destination: "Colors.ts",
            format: "rn/color-scheme",
            options: { exportName: "colorScheme" },
          },
        ],
      },
      css: {
        transformGroup: "css",
        buildPath: "dist/css/",
        files: [
          { destination: `${brand}.css`, format: "css/color-vars" },
          // Same --vvp-color-* names + --brand-* override wrapper as the
          // .scss export below, just as plain CSS — for consumers that
          // need the WP-admin-overridable form without using Sass (e.g.
          // vvp_divi5_extensions, after it dropped Sass).
          { destination: `${brand}-brand.css`, format: "scss/brand-vars" },
        ],
      },
      scss: {
        transformGroup: "css",
        buildPath: "dist/scss/",
        files: [{ destination: `${brand}.scss`, format: "scss/brand-vars" }],
      },
    },
  });
  await sd.buildAllPlatforms();
}

async function buildIconSizes() {
  const sd = new StyleDictionary({
    usesDtcg: true,
    source: ["tokens/icon-size.json"],
    platforms: {
      rn: {
        transformGroup: "js",
        buildPath: "gen-rn/rn/shared/",
        files: [
          {
            destination: "IconSizes.ts",
            format: "rn/icon-sizes",
            options: { headerText: ICON_SIZE_HEADER },
          },
        ],
      },
      css: {
        transformGroup: "css",
        buildPath: "dist/css/",
        files: [
          {
            destination: "icon-size.css",
            format: "css/scale-vars",
            options: { prefix: "icon-size", unit: "px" },
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}

const ELEVATION_HEADER = `Central elevation/shadow scale for the app.

Every drop-shadow should come from this scale so surfaces read as one
consistent depth system. Color is always neutral black — a brand-colored
shadow (e.g. a pink CTA glow) is a local, one-off design choice, not part of
this scale, and should stay hand-written at the call site.

Source of truth: vvp_design_system/packages/tokens/tokens/elevation.json`;

async function buildElevation() {
  const sd = new StyleDictionary({
    usesDtcg: true,
    source: ["tokens/elevation.json"],
    platforms: {
      rn: {
        transformGroup: "js",
        buildPath: "gen-rn/rn/shared/",
        files: [
          {
            destination: "Elevation.ts",
            format: "rn/elevation",
            options: { headerText: ELEVATION_HEADER },
          },
        ],
      },
      css: {
        transformGroup: "css",
        buildPath: "dist/css/",
        files: [{ destination: "elevation.css", format: "css/elevation-vars" }],
      },
    },
  });
  await sd.buildAllPlatforms();
}

async function buildFontSizes() {
  const sd = new StyleDictionary({
    usesDtcg: true,
    source: ["tokens/font-size.json"],
    platforms: {
      rn: {
        transformGroup: "js",
        buildPath: "gen-rn/rn/shared/",
        files: [
          {
            destination: "FontSizes.ts",
            format: "rn/font-sizes",
            options: { headerText: FONT_SIZE_HEADER },
          },
        ],
      },
      css: {
        transformGroup: "css",
        buildPath: "dist/css/",
        files: [
          {
            destination: "font-size.css",
            format: "css/scale-vars",
            options: { prefix: "font-size", unit: "px" },
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}

await buildScale({
  source: "tokens/spacing.json",
  exportName: "spacing",
  typeName: "SpacingToken",
  headerText: SPACING_HEADER,
  rnFile: "Spacing.ts",
  cssPrefix: "spacing",
  cssUnit: "px",
});

await buildScale({
  source: "tokens/radius.json",
  exportName: "radii",
  typeName: "RadiusToken",
  headerText: RADIUS_HEADER,
  rnFile: "BorderRadius.ts",
  cssPrefix: "radius",
  cssUnit: "px",
  scss: true,
});

await buildIconSizes();
await buildFontSizes();
await buildElevation();
await buildColorBrand("volksverpetzer");
await buildColorBrand("mimikama");

console.log("Tokens built.");
