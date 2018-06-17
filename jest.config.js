module.exports = {
    "verbose": true,
    "moduleDirectories": [
        "node_modules",
        "src"
    ],
    "moduleNameMapper": {
        "\\.(css|less)$": "identity-obj-proxy"
    },
    "transform": {
        "^.+\\.js$": "babel-jest",
        "^.+\\.jsx$": "babel-jest"
    }
}