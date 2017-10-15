import React from 'react';
import PropTypes from 'prop-types';

import Portal from './Portal';
import Animate from './Animate';

const propTypes = {
  popover: PropTypes.element,
  renderPopover: PropTypes.func,
  active: PropTypes.bool,
  onActiveChange: PropTypes.func,
  disabled: PropTypes.bool,
  enterClassName: PropTypes.string,
  leaveClassName: PropTypes.string,
  action: PropTypes.string,
  getPopoverContainer: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  popover: null,
  renderPopover: () => null,
  active: false,
  disabled: false,
  enterClassName: null,
  leaveClassName: null,
  onActiveChange: () => null,
  action: 'click',
  getPopoverContainer: null,
  children: null,
};

function overrideEventHandler(fnTrigger, fnOrigin) {
  return (e) => {
    fnTrigger(e);
    if (typeof fnOrigin === 'function') {
      fnOrigin(e);
    }
  };
}

class Trigger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      anchorRect: {},
      containerRect: {},
      containerScroll: {},
    };

    this.tryToggle = this.tryToggle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.active = this.active.bind(this);
    this.deactive = this.deactive(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevActive = prevProps.active == null ? prevState.active : prevProps.active;
    const active = this.getActive();

    if (prevActive !== active) {
      this.afterActiveChange(active);
    }
  }

  componentWillUnmount() {
    const { action } = this.props;

    if (action === 'click') {
      document.removeEventListener('click', this.tryToggle);
    }
  }

  getActive() {
    return this.props.active == null ? this.state.active : this.props.active;
  }

  setActive(active) {
    if (this.props.active == null) {
      this.setState({ active });
    }
    else {
      this.props.onActiveChange(active);
    }
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

    if (this.props.disabled) {
      return;
    }

    this.setActive(!this.getActive());
  }

  active() {
    if (this.props.disabled) {
      return;
    }

    this.setActive(true);
  }

  deactive() {
    if (this.props.disabled) {
      return;
    }

    this.setActive(false);
  }

  afterActiveChange(active) {
    if (active) {
      this.setState({
        anchorRect: this.node.getBoundingClientRect(),
      });

      if (this.props.action === 'click') {
        document.addEventListener('click', this.tryToggle);
      }
    }
    else if (this.props.action === 'click') {
      document.removeEventListener('click', this.tryToggle);
    }
  }

  render() {
    const active = this.getActive();

    const { enterClassName, leaveClassName, action } = this.props;

    const { anchorRect, containerRect, containerScroll } = this.state;

    const child = React.Children.only(this.props.children);

    const onClick = action === 'click'
      ? overrideEventHandler(this.toggle, child.props.onClick) : child.props.onClick;

    const onMouseEnter = action === 'hover'
      ? overrideEventHandler(this.active, child.props.onMouseEnter) : child.props.onMouseEnter;

    const onMouseLeave = action === 'hover'
      ? overrideEventHandler(this.deactive, child.props.onMouseLeave)
      : child.props.onMouseLeave;

    return React.createElement(
      child.type,
      {
        ...child.props,
        onClick,
        onMouseEnter,
        onMouseLeave,
      },
      ...React.Children.toArray(child.props.children),
      <Animate
        enterClassName={enterClassName}
        leaveClassName={leaveClassName}
        enterDuration={enterClassName ? undefined : 0}
        leaveDuration={leaveClassName ? undefined : 0}
      >
        {active && (
          <Portal
            onContainerChange={container =>
              this.setState({
                containerRect: container.getBoundingClientRect(),
                containerScroll: { top: container.scrollTop, left: container.scrollLeft },
              })
            }
            getContainer={this.props.getPopoverContainer}
          >
            {React.cloneElement(
              this.props.renderPopover
                ? this.props.renderPopover()
                : this.props.popover,
              {
                containerRect,
                containerScroll,
                anchorRect,
                ref: (el) => {
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
