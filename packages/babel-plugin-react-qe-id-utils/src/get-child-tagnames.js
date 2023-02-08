const getChildTagnames = (path) => {
  return path.node.children
    .filter((child) => child.type === "JSXElement")
    .map((child) => get(child, "openingElement.name.name"));
};

export default getChildTagnames;
