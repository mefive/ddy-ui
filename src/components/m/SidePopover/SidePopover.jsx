import React from 'react';
import PropTypes from 'prop-types';

import './style/index.scss';
import Animate from '../../Animate';
import Portal from '../../Portal';

const propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  visible: false,
  children: null,
};

class SideNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onTouchStart = this.onTouchStart.bind(this);
  }

  onTouchStart(e) {
    if (!this.content.contains(e.target)) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <Animate>
        {this.props.visible && (
          <Portal>
            <div className="side-popover">
              <div
                className="side-popover-mask"
                onClick={this.props.onClose}
                aria-hidden
              />

              <div
                className="side-popover-content"
                ref={(el) => { this.content = el; }}
              >
                {this.props.children}
              </div>
            </div>
          </Portal>
        )}
      </Animate>
    );
  }
}

SideNav.propTypes = propTypes;
SideNav.defaultProps = defaultProps;

export default SideNav;
