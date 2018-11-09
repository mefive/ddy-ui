import React from 'react';
import PropTypes from 'prop-types';

class Focusable extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    return React.cloneElement(
      React.Children.only(this.props.children),
      {
        tabIndex: 0,
      },
    );
  }
}

export default Focusable;
