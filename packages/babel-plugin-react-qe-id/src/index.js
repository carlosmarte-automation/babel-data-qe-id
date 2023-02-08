const { declare } = require("@babel/helper-plugin-utils");
const utils = require("babel-plugin-react-qe-id-utils/src/index.js");

module.exports = declare((api, options) => {
  api.assertVersion(7);

  const store = new utils.Store();
  const { noHashing, hashType, filePath, errorMsg, hashTypes } =
    utils.getOptions(options);

  return {
    name: "babel-plugin-react-qe-id",
    visitor: {
      JSXElement: (path) => {
        const tagName = path.node.openingElement.name.name;

        if (utils.isReactComponent(tagName) === false) return;
        if (errorMsg.hashTypeChildren)
          throw new Error("hash-type: children` with no-hashing is not allow");

        if (hashTypes.hashTypeChildren) {
          const hashKey = utils.createHash(tagName, {
            children: utils.getChildTagnames(path),
          });

          store.add(tagName, hashKey);

          utils.addAttribute(path.node.openingElement, "qeid", hashKey);
        }

        if (errorMsg.hashTypeCode)
          throw new Error("hash-type: `code` with no-hashing is not allow");

        if (hashTypes.hashTypeCode) {
          const hashKey = utils.createHash(tagName, {
            code: path.hub.getCode(),
          });

          store.add(tagName, hashKey);

          utils.addAttribute(path.node.openingElement, "qeid", hashKey);
        }
      },
      JSXOpeningElement: (path) => {
        const tagName = path.node.name.name;
        if (utils.isReactComponent(tagName) === false) return;
        const hashKey = utils.createHash(tagName);

        if (hashType === "name") {
          store.add(tagName, hashKey);

          utils.addAttribute(path.node, "qeid", noHashing ? tagName : hashKey);
        }
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
