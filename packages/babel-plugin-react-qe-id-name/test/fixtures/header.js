const React = require("react");

const Header = ({ children, qeid }) => (
  <header data-qeid={qeid}>
    <label for="test" class="test">
      Test
    </label>
    {children}
  </header>
);

module.exports = (props) => <Header {...props} />;
