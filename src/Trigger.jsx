import React from 'react';
import PropTypes from 'prop-types';
import contains from 'dom-helpers/query/contains';
import isFunction from 'lodash/isFunction';
import Popover from './Popover';
import Animate from './Animate';
import Portal from './Portal';

const CLICK = 'click';
const HOVER = 'hover';
const HOVER_HOLD = 'hover_hold';

class Trigger extends React.PureComponent {
  static action = {
    CLICK,
    HOVER,
    HOVER_HOLD,
  };

  static propTypes = {
    active: PropTypes.bool,
    onActiveChange: PropTypes.func,
    defaultActive: PropTypes.bool,
    action: PropTypes.string,
    popover: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
    ]),
    children: PropTypes.node,

    enterClassName: PropTypes.string,
    leaveClassName: PropTypes.string,
    enterDuration: PropTypes.number,
    leaveDuration: PropTypes.number,
    enterDelay: PropTypes.number,
    leaveDelay: PropTypes.number,

    disabled: PropTypes.bool,
  };

  static defaultProps = {
    active: null,
    onActiveChange: () => {},
    defaultActive: false,
    action: CLICK,
    popover: () => (<Popover />),
    children: null,

    enterClassName: Animate.defaultProps.enterClassName,
    leaveClassName: Animate.defaultProps.leaveClassName,
    enterDuration: Animate.defaultProps.enterDuration,
    leaveDuration: Animate.defaultProps.leaveDuration,
    enterDelay: null,
    leaveDelay: null,

    disabled: false,
  };

  state = {
    active: this.props.active == null ? this.props.defaultActive : this.props.active,
    popoverContainer: null,
  };

  componentWillReceiveProps({ active }) {
    if (active !== this.props.active) {
      this.setState({ active });
      this.clearTimers();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.action === Trigger.action.CLICK) {
      if (!prevState.active && this.state.active) {
        document.addEventListener('click', this.onClick);
      } else if (prevState.active && !this.state.active) {
        document.removeEventListener('click', this.onClick);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
    this.clearTimers();
  }

  onClick = (e) => {
    const popover = this.popover && this.popover.node;

    if (popover == null || !contains(popover, e.target)) {
      this.setActive(!this.state.active);
    }
  };

  onMouseEnter = () => this.setActive(true);

  onMouseLeave = () => this.setActive(false);

  setActive(active, force = false) {
    this.clearTimers();

    if (!force) {
      if (active && this.props.enterDelay) {
        this.enterDelayTimer
          = setTimeout(() => this.setActive(active, true), this.props.enterDelay);
        return;
      }

      if (!active && this.props.leaveDelay) {
        this.leaveDelayTimer
          = setTimeout(() => this.setActive(active, true), this.props.leaveDelay);
        return;
      }
    }

    if (this.props.active == null) {
      this.setState({ active });
    }

    this.props.onActiveChange(active);
  }

  clearTimers() {
    if (this.enterDelayTimer) {
      clearTimeout(this.enterDelayTimer);
    }

    if (this.leaveDelayTimer) {
      clearTimeout(this.leaveDelayTimer);
    }
  }

  render() {
    const { action } = this.props;
    const { active } = this.state;

    return React.Children.map(this.props.children, (child, index) => {
      if (index === 0) {
        const events = {};

        if (!this.props.disabled) {
          if (action === CLICK && !active) {
            events.onClick = this.onClick;
          }

          if ([HOVER, HOVER_HOLD].indexOf(action) !== -1) {
            events.onMouseEnter = this.onMouseEnter;
            events.onMouseLeave = this.onMouseLeave;
          }
        }

        return React.cloneElement(
          child,
          {
            ...events,
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
        onEnter={() => {
          this.popover.place();
        }}
        key={React.Children.count(this.props.children)}
      >
        {active && (
          <Portal
            onContainerChange={popoverContainer => this.setState(
              { popoverContainer },
              () => this.popover.place(),
            )}
          >
            {(() => {
              const popover = isFunction(this.props.popover)
                ? this.props.popover()
                : this.props.popover;

              const events = {};

              if (action === HOVER_HOLD) {
                events.onMouseEnter = () => this.setActive(true, true);
                events.onMouseLeave = this.onMouseLeave;
              }

              return React.cloneElement(
                popover,
                {
                  ...events,
                  anchor: this.anchor,
                  container: this.state.popoverContainer,
                  ref: (el) => {
                    if (isFunction(popover.ref)) {
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
