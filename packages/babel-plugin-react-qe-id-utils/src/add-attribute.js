const { types: t } = require("@babel/core");

const addAttribute = (object, name, value) => {
  object.attributes.push(
    t.jSXAttribute(t.jSXIdentifier(name), t.stringLiteral(value))
  );
};

export default addAttribute;
