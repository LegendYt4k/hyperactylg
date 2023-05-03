module.exports = {
    env: {
      browser: true,
      es2022: true,
      node: true,
    },
    extends: [
      "plugin:react/recommended",
      "prettier"
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2023,
      sourceType: "module",
    },
    plugins: ["react", "react-hooks"],
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    ignorePatterns: ['dist/'],
    overrides: [
      {
        files: ["**/*.js", "**/*.jsx"],
        parser: "@babel/eslint-parser",
        parserOptions: {
          ecmaVersion: 2023,
          sourceType: "module",
          requireConfigFile: false,
          babelOptions: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
    "settings": {
        "react": {
          "version": "detect"
        }
    },
  };