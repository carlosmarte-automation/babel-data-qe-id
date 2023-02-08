const { declare } = require("@babel/helper-plugin-utils");
const utils = require("babel-plugin-react-qe-id-utils/src/index.js");

module.exports = declare((api) => {
  api.assertVersion(7);

  return {
    name: "babel-plugin-react-qe-id-name",
    visitor: {
      JSXElement: (path) => {
        const tagName = path.node.openingElement.name.name;
        if (utils.isReactComponent(tagName) === false) return;
        utils.addAttribute(path.node.openingElement, "qeid", tagName);
      },
      JSXOpeningElement: (path) => {
        const tagName = path.node.name.name;
        if (utils.isReactComponent(tagName) === false) return;
        utils.addAttribute(path.node, "qeid", tagName);
      },
    },
  };
});
