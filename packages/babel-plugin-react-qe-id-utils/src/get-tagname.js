const getTagName = (path) => {
  if (path.node.openingElement) {
    return path.node.openingElement.name.name;
  }
};

export default getTagName;
