import React from 'react';
import PropTypes from 'prop-types';

import Portal from './Portal';
import Animate from './Animate';

const propTypes = {
  popover: PropTypes.node,
  renderPopover: PropTypes.func,
  defaultActive: PropTypes.bool,
  active: PropTypes.bool,
  onActiveChange: PropTypes.func,
  disabled: PropTypes.bool,
  enterClassName: PropTypes.string,
  leaveClassName: PropTypes.string,
  enterDuration: PropTypes.number,
  leaveDuration: PropTypes.number,
  action: PropTypes.string,
  getPopoverContainer: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  popover: null,
  renderPopover: null,
  active: null,
  disabled: false,
  enterClassName: 'enter',
  leaveClassName: 'leave',
  enterDuration: 200,
  leaveDuration: 200,
  onActiveChange: () => {},
  getPopoverContainer: null,
  defaultActive: null,
  action: 'click',
  children: null,
};

class Trigger extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line
      active: false,
      anchorRect: {},
      containerRect: {},
      containerScroll: {},
      popoverContainer: null,
      anchor: null,
    };

    this.tryToggle = this.tryToggle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({ anchor: this.anchor });

    if (this.props.active == null && this.props.defaultActive !== null) {
      // eslint-disable-next-line
      this.setState({ active: this.props.defaultActive });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevActive = this.getActive(prevProps, prevState);
    const active = this.getActive();

    if (!prevActive && active) {
      if (this.props.action === 'click') {
        document.addEventListener('click', this.tryToggle);
      }
    } else if (!active && prevActive) {
      if (this.props.action === 'click') {
        document.removeEventListener('click', this.tryToggle);
      }
    }
  }

  componentWillUnmount() {
    const { action } = this.props;

    if (action === 'click') {
      document.removeEventListener('click', this.tryToggle);
    }
  }

  getActive(props = this.props, state = this.state) {
    if (props.active != null) {
      return props.active;
    }

    return state.active;
  }

  setActive(active) {
    if (!this.props.disabled) {
      if (this.props.active == null) {
        // eslint-disable-next-line
        this.setState({ active });
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
      eventHandlers.onClick = this.getEventHandler(child.props.onClick, this.toggle);
    }

    if (this.props.action === 'hover') {
      eventHandlers.onMouseEnter = this.getEventHandler(child.props.onMouseEnter, this.activate);
      eventHandlers.onMouseLeave = this.getEventHandler(child.props.onMouseLeave, this.deactivate);
    }

    return eventHandlers;
  }

  tryToggle(e) {
    if (this.popover && !this.popover.node.contains(e.target)) {
      this.toggle();
    }
  }

  toggle(e) {
    if (e) {
      e.stopPropagation();
    }

    this.setActive(!this.getActive());
  }

  activate() {
    this.setActive(true);
  }

  deactivate() {
    this.setActive(false);
  }

  render() {
    const { anchorRect, containerRect, containerScroll } = this.state;

    const child = React.Children.only(this.props.children);
    const popoverElement
      = this.props.renderPopover ? this.props.renderPopover() : this.props.popover;

    return React.cloneElement(
      child,
      {
        ...this.getEventHandlers(child),
        ref: (el) => {
          if (typeof child.ref === 'function') {
            child.ref(el);
          }
          this.anchor = el;
        },
      },
      ...React.Children.toArray(child.props.children),
      <Animate
        enterClassName={this.props.enterClassName}
        leaveClassName={this.props.leaveClassName}
        enterDuration={this.props.enterDuration}
        leaveDuration={this.props.leaveDuration}
      >
        {this.getActive() && (
          <Portal
            onContainerChange={popoverContainer => this.setState({ popoverContainer })}
            getContainer={this.props.getPopoverContainer}
          >
            {React.cloneElement(
              popoverElement,
              {
                containerRect,
                containerScroll,
                anchorRect,
                anchor: this.state.anchor,
                container: this.state.popoverContainer,
                ref: (el) => {
                  if (typeof popoverElement.ref === 'function') {
                    popoverElement.ref(el);
                  }
                  this.popover = el;
                },
              },
            )}
          </Portal>
        )}
      </Animate>,
    );
  }
}

Trigger.propTypes = propTypes;
Trigger.defaultProps = defaultProps;

export default Trigger;
