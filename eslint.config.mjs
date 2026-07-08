import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Cosmetic only: unescaped quotes/apostrophes render fine. The Mon/Thu auto-blog
      // generates prose with straight quotes, which would otherwise fail the production
      // deploy lint (react/no-unescaped-entities) and block every deploy.
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
