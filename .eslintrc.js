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
    "no-param-reassign": 0,
    "no-bitwise": 0,
    "no-mixed-operators": 0,
    "no-plusplus": 0,
    "import/no-extraneous-dependencies": 0,
    "no-nested-ternary": 0,
    "no-restricted-properties": 0,
  }
};
