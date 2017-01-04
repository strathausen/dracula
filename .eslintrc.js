module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "globals": {
    "it": true,
    "$": true,
    "describe": true
  },
  "plugins": [
    "babel",
    "import",
  ],
  "extends": "airbnb-base",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "semi": 0,
  }
};
