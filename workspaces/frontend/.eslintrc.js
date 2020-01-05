const defaultSettings = require("../../.eslintrc.js");

module.exports = {
  ...defaultSettings, env: { node: true, "jest": true, "browser": true }, extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect",
    }
  }
}
