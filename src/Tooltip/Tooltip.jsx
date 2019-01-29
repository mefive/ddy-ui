import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Trigger from '../Trigger';
import Popover from '../Popover';

import './style.scss';

class Tooltip extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    placement: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.shape({}),
    children: PropTypes.node,
    defaultActive: PropTypes.bool,
    getPopoverContainer: PropTypes.func,
    action: PropTypes.string,
    onActiveChange: PropTypes.func,
    popover: PropTypes.func,
    active: PropTypes.bool,
    offset: PropTypes.number,
    leaveDelay: PropTypes.number,
  };

  static defaultProps = {
    title: null,
    placement: Popover.placement.TOP,
    disabled: false,
    className: null,
    style: null,
    children: null,
    defaultActive: null,
    getPopoverContainer: null,
    action: Trigger.action.HOVER,
    onActiveChange: () => {},
    popover: null,
    active: null,
    offset: null,
    leaveDelay: null,
  };

  popover = null;

  place() {
    if (this.popover) {
      this.popover.place();
    }
  }

  render() {
    if (this.props.disabled || (!this.props.title && this.props.popover == null)) {
      return this.props.children;
    }

    return (
      <Trigger
        action={this.props.action}
        defaultActive={this.props.defaultActive}
        popover={() => (
          <Popover
            className={classNames('popover-tooltip shadow', this.props.className)}
            style={this.props.style}
            placement={this.props.placement}
            offset={this.props.offset}
            ref={(el) => { this.popover = el; }}
          >
            <div className="popover-body">
              {this.props.popover == null
                ? (
                  <span dangerouslySetInnerHTML={{ __html: this.props.title }} />
                )
                : this.props.popover()
              }
            </div>
          </Popover>
        )}
        enterClassName="scale-in"
        leaveClassName="scale-out"
        activeClass="show"
        enterDuration={200}
        leaveDuration={200}
        enterDelay={300}
        leaveDelay={this.props.leaveDelay}
        getPopoverContainer={this.props.getPopoverContainer}
        active={this.props.active}
        onActiveChange={this.props.onActiveChange}
      >
        {this.props.children}
      </Trigger>
    );
  }
}

export default Tooltip;
