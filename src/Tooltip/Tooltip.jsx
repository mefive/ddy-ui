import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Trigger from '../Trigger';
import Popover from '../Popover';

import './style/index.scss';

const propTypes = {
  title: PropTypes.string,
  placement: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
  }),
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

const defaultProps = {
  title: null,
  placement: {
    vertical: Popover.PLACEMENT_TOP,
    horizontal: Popover.PLACEMENT_CENTER,
  },
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

class Tooltip extends React.PureComponent {
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
            defaultPlacement={this.props.placement}
          >
            {this.props.renderPopover == null
              ? (
                <span dangerouslySetInnerHTML={{ __html: this.props.title }} />
              )
              : this.props.renderPopover()
            }
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

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
