import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import pick from 'lodash/pick';
import contains from 'dom-helpers/query/contains';

import Portal from './Portal';
import Animate from './Animate';
import { domRelatedProps } from './utils/dom';

class Trigger extends React.PureComponent {
  static propTypes = {
    popover: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    defaultActive: PropTypes.bool,
    active: PropTypes.bool,
    onActiveChange: PropTypes.func,
    disabled: PropTypes.bool,

    enterClassName: PropTypes.string,
    leaveClassName: PropTypes.string,
    enterDuration: PropTypes.number,
    leaveDuration: PropTypes.number,
    enterDelay: PropTypes.number,
    leaveDelay: PropTypes.number,

    action: PropTypes.string,
    getPopoverContainer: PropTypes.func,
    children: PropTypes.node,
    activeClass: PropTypes.string,
  };

  static defaultProps = {
    popover: null,
    defaultActive: false,
    active: null,
    disabled: false,

    enterClassName: 'enter',
    leaveClassName: 'leave',
    enterDuration: 200,
    leaveDuration: 200,
    enterDelay: null,
    leaveDelay: null,

    onActiveChange: () => {},
    getPopoverContainer: null,
    action: 'click',
    children: null,
    activeClass: 'active',
  };

  state = {
    active: false,
    popoverContainer: null,
  };

  componentWillReceiveProps({ active }) {
    if (active !== this.props.active) {
      this.onActiveChange(active);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.active !== prevProps.active && this.popover != null) {
      this.popover.place();
    }
  }

  componentWillUnmount() {
    const { action } = this.props;

    if (action === 'click') {
      document.removeEventListener('click', this.outsideToggle);
    }

    this.clearTimers();
  }

  onActiveChange(active) {
    if (active) {
      if (this.props.action === 'click') {
        document.addEventListener('click', this.outsideToggle);
      }
    } else if (this.props.action === 'click') {
      document.removeEventListener('click', this.outsideToggle);
    }
  }

  getActive() {
    if (this.props.active != null) {
      return this.props.active;
    }

    if (this.state == null) {
      return this.props.defaultActive;
    }

    return this.state.active;
  }

  setActive(active) {
    if (!this.props.disabled) {
      if (this.props.onActiveChange != null) {
        this.props.onActiveChange(active);
      } else {
        this.setState({ active });
      }
      if (this.props.active == null && this.state.active !== active) {
        this.setState({ active }, () => this.onActiveChange(active));
      }
      this.props.onActiveChange(active);
    }
  }

  getEventHandler(origin, handler) {
    return (e) => {
      if (typeof origin === 'function') {
        origin(e);
      }
      handler(e);
    };
  }

  getEventHandlers(child) {
    const eventHandlers = {};

    if (this.props.action === 'click') {
      eventHandlers.onClick = this.getEventHandler(child.props.onClick, this.anchorToggle);
    }

    if (this.props.action === 'hover') {
      eventHandlers.onMouseEnter = this.getEventHandler(child.props.onMouseEnter, this.activate);
      eventHandlers.onMouseLeave = this.getEventHandler(child.props.onMouseLeave, this.deactivate);
    }

    return eventHandlers;
  }

  outsideToggle = (e) => {
    if (this.popover
      && !contains(this.popover.node, e.target)
      && !contains(this.anchor, e.target)
    ) {
      this.toggle();
    }
  };

  anchorToggle = (e) => {
    e.stopPropagation();

    if (contains(this.anchor, e.target)) {
      this.toggle();
    }
  };

  toggle = () => {
    this.setActive(!this.getActive());
  };

  activate = () => {
    this.clearTimers();

    if (this.props.enterDelay != null) {
      this.enterDelayTimer = setTimeout(() => this.setActive(true), this.props.enterDelay);
    } else {
      this.setActive(true);
    }
  };

  deactivate = () => {
    this.clearTimers();

    if (this.props.leaveDelay != null) {
      this.leaveDelayTimer = setTimeout(() => this.setActive(false), this.props.leaveDelay);
    } else {
      this.setActive(false);
    }
  };

  clearTimers() {
    if (this.enterDelayTimer != null) {
      clearTimeout(this.enterDelayTimer);
      this.enterDelayTimer = null;
    }

    if (this.leaveDelayTimer != null) {
      clearTimeout(this.leaveDelayTimer);
      this.leaveDelayTimer = null;
    }
  }

  render() {
    return React.Children.map(this.props.children, (child, index) => {
      if (index === 0) {
        const domProps = pick(this.props, domRelatedProps);

        return React.cloneElement(
          child,
          {
            ...domProps,
            ...this.getEventHandlers(child),
            ref: (el) => {
              if (isFunction(child.ref)) {
                child.ref(el);
              }

              this.anchor = el;
            },
          },
        );
      }

      return child;
    }).concat((
      <Animate
        enterClassName={this.props.enterClassName}
        leaveClassName={this.props.leaveClassName}
        enterDuration={this.props.enterDuration}
        leaveDuration={this.props.leaveDuration}
        activeClass={this.props.activeClass}
        onEnter={() => {
          this.popover.place();
        }}
        key={React.Children.count(this.props.children)}
      >
        {this.getActive() && (
          <Portal
            getContainer={this.props.getPopoverContainer}
            onContainerChange={popoverContainer => this.setState(
              { popoverContainer },
              () => this.popover.place(),
            )}
          >
            {(() => {
              const popover = isFunction(this.props.popover)
                ? this.props.popover()
                : this.props.popover;

              return React.cloneElement(
                popover,
                {
                  anchor: this.anchor,
                  container: this.state.popoverContainer,
                  ref: (el) => {
                    if (typeof popover.ref === 'function') {
                      popover.ref(el);
                    }
                    this.popover = el;
                  },
                },
              );
            })()}
          </Portal>
        )}
      </Animate>
    ));
  }
}

export default Trigger;
