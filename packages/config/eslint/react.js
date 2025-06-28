module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}; 