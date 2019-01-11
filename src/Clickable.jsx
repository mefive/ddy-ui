import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { domRelatedProps } from './utils/dom';

class Clickable extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    onClick: null,
  };

  render() {
    return React.Children.map(this.props.children, (child, index) => {
      if (index === 0) {
        const domProps = pick(this.props, domRelatedProps);

        return React.cloneElement(
          child,
          {
            ...domProps,
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

      return child;
    });
  }
}

export default Clickable;
