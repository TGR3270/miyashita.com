import React from 'react';
import { Link, PrefetchWhenSeen as _PrefetchWhenSeen } from 'react-static';

class PrefetchWhenSeen extends _PrefetchWhenSeen {
  render() {
    const { path, ...rest } = this.props;
    return (
      <span {...rest} ref={this.handleRef}>
        {this.props.children}
      </span>
    );
  }
}

const LinkWrapper = props => {
  if (!props.to) {
    return (
      <a target="_blank" {...props} rel="noopener noreferrer">
        {props.children}
      </a>
    );
  }
  const { to, ...rest } = props;
  return (
    <PrefetchWhenSeen {...rest} path={to}>
      <Link to={to}>{props.children}</Link>
    </PrefetchWhenSeen>
  );
};

export default LinkWrapper;
