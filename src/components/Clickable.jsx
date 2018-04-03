import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

class Clickable extends React.PureComponent {
  render() {
    return React.cloneElement(
      React.Children.only(this.props.children),
      {
        onClick: this.props.onClick,
        onKeyPress: (e) => {
          if (e.key === 'Enter') {
            this.props.onClick();
          }
        },
        tabIndex: 0,
        role: 'button',
      },
    );
  }
}

Clickable.propTypes = propTypes;

export default Clickable;
