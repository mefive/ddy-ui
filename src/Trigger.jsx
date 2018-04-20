import React from 'react';
import PropTypes from 'prop-types';
import contains from 'dom-helpers/query/contains';

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
  defaultActive: false,
  active: null,
  disabled: false,
  enterClassName: 'enter',
  leaveClassName: 'leave',
  enterDuration: 200,
  leaveDuration: 200,
  onActiveChange: () => {},
  getPopoverContainer: null,
  action: 'click',
  children: null,
};

class Trigger extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: this.getActive(),
    };

    this.tryToggle = this.tryToggle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
  }

  componentWillReceiveProps({ active }) {
    if (active !== this.props.active) {
      this.onActiveChange(active);
    }
  }

  componentWillUnmount() {
    const { action } = this.props;

    if (action === 'click') {
      document.removeEventListener('click', this.tryToggle);
    }
  }

  onActiveChange(active) {
    if (active) {
      if (this.props.action === 'click') {
        document.addEventListener('click', this.tryToggle);
      }
    } else if (this.props.action === 'click') {
      document.removeEventListener('click', this.tryToggle);
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
      eventHandlers.onClick = this.getEventHandler(child.props.onClick, this.toggle);
    }

    if (this.props.action === 'hover') {
      eventHandlers.onMouseEnter = this.getEventHandler(child.props.onMouseEnter, this.activate);
      eventHandlers.onMouseLeave = this.getEventHandler(child.props.onMouseLeave, this.deactivate);
    }

    return eventHandlers;
  }

  tryToggle(e) {
    if (this.popover
      && !contains(this.popover.node, e.target)
      && !contains(this.anchor, e.target)
    ) {
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
    const child = React.Children.only(this.props.children);

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
          <Portal getContainer={this.props.getPopoverContainer}>
            {(() => {
              const popoverElement
                = this.props.renderPopover ? this.props.renderPopover() : this.props.popover;

              const container = this.props.getPopoverContainer == null
                ? document.body
                : this.props.getPopoverContainer();

              return React.cloneElement(
                popoverElement,
                {
                  anchor: this.anchor,
                  container,
                  ref: (el) => {
                    if (typeof popoverElement.ref === 'function') {
                      popoverElement.ref(el);
                    }
                    this.popover = el;
                  },
                },
              );
            })()}
          </Portal>
        )}
      </Animate>,
    );
  }
}

Trigger.propTypes = propTypes;
Trigger.defaultProps = defaultProps;

export default Trigger;
