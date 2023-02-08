const React = require("react");

const H1 = ({ children, qeid }) => <h1 data-qeid={qeid}>{children}</h1>;

const Header = ({ qeid, children }) => (
  <header data-qeid={qeid}>
    <H1>sub heading</H1>
    {children}
  </header>
);

module.exports = (props) => <Header {...props} />;
