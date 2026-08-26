import js from "@eslint/js";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: ["node_modules/**", "**/dist/**", "**/gen-rn/**", "**/*.tgz"],
  },
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  js.configs.recommended,
  ...tsPlugin.configs["flat/recommended"],
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // Matches vvp_app's convention — a dedicated `import type { ... }`
      // rather than inlining `type` on individual named imports.
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
    },
  },
  {
    // React/JSX rules apply to ui-web and storybook — packages/tokens is
    // plain Node/TypeScript (Style Dictionary build scripts + generated
    // output), no JSX involved.
    files: [
      "packages/ui-web/**/*.{ts,tsx}",
      "packages/storybook/**/*.{ts,tsx}",
    ],
    plugins: {
      ...reactPlugin.configs.flat.recommended.plugins,
      ...reactHooks.configs.flat["recommended-latest"].plugins,
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: { ...globals.browser },
    },
    settings: {
      react: { version: "19" },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooks.configs.flat["recommended-latest"].rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  eslintPluginPrettierRecommended,
];
