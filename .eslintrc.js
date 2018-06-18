module.exports = {
    "parser": "babel-eslint",
    'env': {
        'node': true,
        'es6': true
    },
    'extends': ["standard", "standard-react"],
    'rules': {
        'indent': [2, 4],
        'semi': [2, 'always'],
        'no-unused-vars': [1],

    },
    "parserOptions": {
        "sourceType": "module",
    }
}