"use strict";

const babelJest = require("babel-jest").default;

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === "true") {
    return false;
  }

  try {
    require.resolve("react/jsx-runtime");
    return true;
  } catch (e) {
    return false;
  }
})();

module.exports = babelJest.createTransformer({
  presets: [
    "@babel/preset-env",
    [
      require.resolve("babel-preset-react-app"),
      {
        runtime: hasJsxRuntime ? "automatic" : "classic",
      },
    ],
  ],
  babelrc: false,
  configFile: false,
});

// process.env.BABEL_ENV = 'development';
// process.env.NODE_ENV = 'development';
