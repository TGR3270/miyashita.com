import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

class WithStylesContext extends Component {
  getChildContext() {
    return { insertCss: this.props.onInsertCss };
  }

  render() {
    const { children } = this.props;
    if (Children.count(children) !== 1) {
      return <div>{children}</div>;
    } else {
      return Children.only(children);
    }
  }
}

WithStylesContext.propTypes = {
  onInsertCss: PropTypes.func.isRequired,
};

WithStylesContext.childContextTypes = {
  insertCss: PropTypes.func.isRequired,
};

export default WithStylesContext;
