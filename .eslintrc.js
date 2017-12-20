module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "extends": ["eslint:recommended", "standard", "plugin:react/recommended"],
  "plugins": ["react"],
  "rules": {
    "quotes": ["error", "double"],
    "react/prop-types": ["off"]
  }
}
