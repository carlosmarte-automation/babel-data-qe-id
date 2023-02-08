const fg = require("fast-glob").sync;
const path = require("path");
const fs = require("fs");
const { camelCase } = require("camel-case");
const { upperCaseFirst } = require("upper-case-first");
const mkdirp = require("mkdirp");

const entries = fg(["!generated/**", "!*.spec.js", "!*.spec-*.js", "**/*.js"], {
  cwd: path.join(process.cwd(), "./src"),
});

const code = entries.map((filePath) => [
  filePath,
  camelCase(String(filePath).replace(/\.[^/.]+$/, "")),
]);

mkdirp.sync(path.join(process.cwd(), "./build/cjs"));
mkdirp.sync(path.join(process.cwd(), "./build/mjs"));

fs.writeFileSync(
  path.join(process.cwd(), "./src/index.js"),
  `
  const defaultExport = {};
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  ` +
    code
      .map(
        ([filePath, methodName]) => `
    const ${methodName} = require('./${filePath}') || {};

    defaultExport[${methodName}] = ${methodName}; 
    exports.${methodName} = ${methodName}.default || ${methodName}; 
    exports.${upperCaseFirst(
      methodName
    )} = ${methodName}.default || ${methodName}; 
    `
      )
      .join("\r\n") +
    `
    exports.default = defaultExport
    `,
  "utf-8"
);

// fs.writeFileSync(
//   path.join(process.cwd(), "./build/mjs/index.mjs"),
//   code
//     .map(
//       ([filePath, methodName]) => `
//       import ${upperCaseFirst(methodName)} from './${filePath}';
//       export * from './${filePath}';
//       export { ${upperCaseFirst(methodName)} as ${methodName} };
//       export { ${upperCaseFirst(methodName)} };
//     `
//     )
//     .join("\r\n"),
//   "utf-8"
// );
