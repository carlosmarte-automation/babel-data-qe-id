const { declare } = require("@babel/helper-plugin-utils");
const utils = require("babel-plugin-react-qe-id-utils/src/index.js");

module.exports = declare((api, options) => {
  api.assertVersion(7);

  const store = new utils.Store();
  const { filePath } = utils.getOptions(options);

  return {
    name: "babel-plugin-react-qe-code",
    visitor: {
      JSXElement: (path) => {
        const tagName = path.node.openingElement.name.name;

        if (utils.isReactComponent(tagName) === false) return;

        const hashKey = utils.createHash(tagName, { code: path.hub.getCode() });
        store.add(tagName, hashKey);

        utils.addAttribute(path.node.openingElement, "qeid", hashKey);
      },
      Program: {
        enter() {
          utils.ensureFileExist(filePath);
        },
        exit(path, state) {
          utils.appendToFile(filePath, store.toJSON());
        },
      },
    },
  };
});
