import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';

import './style.scss';

class Animate extends React.PureComponent {
  static propTypes = {
    enterClassName: PropTypes.string,
    leaveClassName: PropTypes.string,
    enterDuration: PropTypes.number,
    leaveDuration: PropTypes.number,
    activeClass: PropTypes.string,
    children: PropTypes.node,
    visible: PropTypes.bool,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
  };

  static defaultProps = {
    enterDuration: 200,
    leaveDuration: 200,
    enterClassName: 'enter',
    leaveClassName: 'leave',
    activeClass: 'active',
    children: null,
    visible: false,
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
  };

  render() {
    return (
      <Transition
        in={this.props.visible}
        timeout={{
          enter: this.props.enterDuration,
          exit: this.props.leaveDuration,
        }}
        onEnter={this.props.onEnter}
        onEntering={this.props.onEntering}
        onEntered={this.props.onEntered}
        unmountOnExit
      >
        {(state) => {
          const child = React.Children.only(this.props.children);

          return React.cloneElement(child, {
            className: classNames(child.props.child, 'animation', {
              [this.props.enterClassName]: state === 'entering',
              [this.props.activeClass]: state === 'entered',
              [this.props.leaveClassName]: state === 'exiting' || state === 'exited',
            }),
          });
        }}
      </Transition>
    );
  }
}

export default Animate;
