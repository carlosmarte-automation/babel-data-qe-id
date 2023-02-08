const jsonfile = require("jsonfile");

export const ensureFileExist = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      jsonfile.writeFileSync(filePath, []);
    } else {
      JSON.parse(JSON.stringify(jsonfile.readFileSync(filePath)));
    }
  } catch (error) {
    jsonfile.writeFileSync(filePath, []);
  }
};

export const appendToFile = (filePath, collection) => {
  if (!Array.isArray(collection)) throw Error("collection must be an Array");
  const data = jsonfile.readFileSync(filePath);
  data.push(...collection);
  jsonfile.writeFileSync(filePath, data);
};
