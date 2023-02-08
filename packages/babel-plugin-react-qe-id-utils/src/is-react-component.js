const isReactComponent = (tagName) => {
  if (/^[A-Z].*/.test(tagName)) return true;
  return false;
};

export default isReactComponent;
