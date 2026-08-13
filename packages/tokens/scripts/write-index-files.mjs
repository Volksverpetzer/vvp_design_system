import { writeFileSync } from "node:fs";

writeFileSync(
  "gen-rn/rn/shared/index.ts",
  `export * from "./Spacing";
export * from "./FontSizes";
export * from "./BorderRadius";
export * from "./IconSizes";
`,
);

for (const brand of ["volksverpetzer", "mimikama"]) {
  writeFileSync(`gen-rn/rn/${brand}/index.ts`, `export * from "./Colors";\n`);
}

console.log("Index files written.");
