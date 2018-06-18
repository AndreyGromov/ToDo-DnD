module.exports = {
  "parser": "babel-eslint",
  'env': {
    'node': true,
    'es6': true
  },
  'extends': ["standard", "standard-react"],
  "plugins": [
    "compat",
    "jest",
    "react"
  ],
  "parserOptions": {
    "sourceType": "module",
  }
}
