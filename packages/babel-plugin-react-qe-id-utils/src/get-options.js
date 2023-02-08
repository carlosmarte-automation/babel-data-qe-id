const path = require("path");

const getOptions = (options) => {
  const noHashing = options.noHashing ? true : false;
  const hashType = options.type ? options.type : "name";
  const filePath = options.filePath
    ? options.filePath
    : path.join(process.cwd(), "./qeid.json");

  return {
    noHashing,
    hashType,
    filePath,
    errorMsg: {
      hashTypeChildren: noHashing && hashType === "children",
      hashTypeCode: noHashing && hashType === "code",
    },
    hashTypes: {
      hashTypeChildren: !noHashing && hashType === "children",
      hashTypeCode: !noHashing && hashType === "code",
    },
  };
};

export default getOptions;
