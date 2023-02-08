const hash = require("object-hash");

const createHash = (tagName, options = {}) => {
  const object = { tagName };
  if (options.children) object.children = options.children;
  if (options.code) object.code = options.code;
  return hash(object);
};

export default createHash;
