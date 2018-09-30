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
    renderPopover: PropTypes.func,
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
    action: 'hover',
    onActiveChange: () => {},
    renderPopover: null,
  };

  render() {
    if (this.props.disabled || (!this.props.title && this.props.renderPopover == null)) {
      return this.props.children;
    }

    return (
      <Trigger
        action={this.props.action}
        defaultActive={this.props.defaultActive}
        popover={(
          <Popover
            className={classNames('tooltip', this.props.className)}
            style={this.props.style}
            placement={this.props.placement}
          >
            <div className="popover-body">
              {this.props.renderPopover == null
                ? (
                  <span dangerouslySetInnerHTML={{ __html: this.props.title }} />
                )
                : this.props.renderPopover()
              }
            </div>
          </Popover>
        )}
        enterClassName="scale-in"
        leaveClassName="scale-out"
        enterDuration={100}
        leaveDuration={100}
        getPopoverContainer={this.props.getPopoverContainer}
        onActiveChange={this.props.onActiveChange}
      >
        {this.props.children}
      </Trigger>
    );
  }
}

export default Tooltip;
