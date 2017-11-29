import React from 'react';
import { Link, PrefetchWhenSeen as _PrefetchWhenSeen } from 'react-static';
import { withRouter } from 'react-router';

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

class LinkWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(ev) {
    this.props.history.push(this.props.to);
    ev.preventDefault();
    return false;
  }

  render() {
    const props = this.props;

    if (!props.to) {
      return (
        <a target="_blank" {...props} rel="noopener noreferrer">
          {props.children}
        </a>
      );
    }

    const { to, ...rest } = props;
    return (
      <PrefetchWhenSeen {...rest} style={{ ...rest.style, cursor: 'pointer' }} path={to}>
        <Link to={to} onClick={this.onClick}>
          {props.children}
        </Link>
      </PrefetchWhenSeen>
    );
  }
}

export default withRouter(LinkWrapper);
