import globals from "globals"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import { defineConfig } from "eslint/config"

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
    pluginVue.configs["flat/essential"],
    {
        files: ["**/*.vue"],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
    },
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn", // or "error" if you prefer
                {
                    argsIgnorePattern: "^_", // ignore unused parameters starting with "_"
                    varsIgnorePattern: "^_", // ignore unused variables starting with "_"
                },
            ],
        },
    },
])
