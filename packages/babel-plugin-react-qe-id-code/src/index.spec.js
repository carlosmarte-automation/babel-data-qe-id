const fs = require("fs");
const path = require("path");
import renderer from "react-test-renderer";
const Babel = require("@babel/core");
const requireFromString = require("require-from-string");
const hash = require("object-hash");

const transform = (sourceCode, options = {}) => {
  const { code } = Babel.transform(sourceCode, {
    babelrc: false,
    comments: false,
    plugins: [[path.join(__dirname), options]],
    presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react"],
  });

  const Component = requireFromString(code);
  return {
    Component,
    code,
  };
};

const headerSourceCode = fs.readFileSync(
  path.join(__dirname, "../test/fixtures/header.js"),
  "utf-8"
);

const headerH1SourceCode = fs.readFileSync(
  path.join(__dirname, "../test/fixtures/header-h1.js"),
  "utf-8"
);

const headerChildrenSourceCode = fs.readFileSync(
  path.join(__dirname, "../test/fixtures/header-children.js"),
  "utf-8"
);

describe("component code", () => {
  test("root component", () => {
    const sourceCode = headerSourceCode;
    const { code, Component } = transform(sourceCode, {
      type: "code",
    });
    const component = renderer.create(<Component />);
    const componentJson = component.toJSON();

    expect(componentJson.props["data-qeid"]).toEqual(
      hash({ tagName: "Header", code: sourceCode })
    );

    expect({
      componentJson,
      sourceCode,
      code,
    }).toMatchSnapshot();
  });

  test("root + sub components", () => {
    const sourceCode = headerH1SourceCode;

    const { code, Component } = transform(sourceCode, {
      type: "code",
    });
    const component = renderer.create(<Component />);
    const componentJson = component.toJSON();

    expect(componentJson.props["data-qeid"]).toEqual(
      hash({ tagName: "Header", code: sourceCode })
    );
    expect(componentJson.children[0].props["data-qeid"]).toBeDefined();

    expect({
      componentJson,
      sourceCode,
      code,
    }).toMatchSnapshot();
  });
});
