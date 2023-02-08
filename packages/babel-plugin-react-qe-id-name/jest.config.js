module.exports = {
  roots: ["<rootDir>/"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  setupFiles: ["react-app-polyfill/jsdom"],
  setupFilesAfterEnv: [require.resolve("cicd/jest-setup-standard.js")],
  testMatch: ["**/(src|__tests__|test)/**/?(*.)+(spec|test).[jt]s?(x)"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": require.resolve(
      "cicd/jest-babel-transform.js"
    ),
    "^.+\\.css$": require.resolve("cicd/css-transform.mjs"),
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": require.resolve(
      "cicd/file-transform.mjs"
    ),
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  modulePaths: [],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  resetMocks: true,
};
