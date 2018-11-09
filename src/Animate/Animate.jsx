import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Transition, TransitionGroup } from 'react-transition-group';

import './style.scss';

class Animate extends React.PureComponent {
  static propTypes = {
    enterClassName: PropTypes.string,
    leaveClassName: PropTypes.string,
    enterDuration: PropTypes.number,
    leaveDuration: PropTypes.number,
    activeClass: PropTypes.string,
    children: PropTypes.node,
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
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
  };

  render() {
    return (
      <TransitionGroup>
        {this.props.children && React.Children.map(this.props.children, child => (
          <Transition
            key={child.key || 'single'}
            in
            timeout={{
                enter: this.props.enterDuration,
                exit: this.props.leaveDuration,
              }}
            onEnter={this.props.onEnter}
            onEntering={this.props.onEntering}
            onEntered={this.props.onEntered}
            unmountOnExit
          >
            {state => React.cloneElement(child, {
                className: classNames(child.props.className, 'animation', {
                  [this.props.enterClassName]: state === 'entering',
                  [this.props.activeClass]: state === 'entered',
                  [this.props.leaveClassName]: state === 'exiting' || state === 'exited',
                }),
              })}
          </Transition>
          ))}
      </TransitionGroup>
    );
  }
}

export default Animate;
