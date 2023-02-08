const jsonfile = require("jsonfile");
const path = require("path");
const mkdirp = require("mkdirp");

const { name, version } = jsonfile.readFileSync(
  path.join(process.cwd(), "./package.json")
);

mkdirp.sync(path.join(process.cwd(), "./build/mjs"));
mkdirp.sync(path.join(process.cwd(), "./build/cjs"));

jsonfile.writeFileSync(
  path.join(process.cwd(), "./build/mjs/package.json"),
  {
    name: `${name}_build-mjs`,
    version,
    type: "module",
  },
  { spaces: 2 }
);

jsonfile.writeFileSync(
  path.join(process.cwd(), "./build/cjs/package.json"),
  {
    name: `${name}_build-cjs`,
    version,
    type: "commonjs",
  },
  { spaces: 2 }
);
