import React from 'react';
import PropTypes from 'prop-types';

import SlideDownPopover from '../SlideDownPopover';

const propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  visible: false,
  onClose: () => {},
  onSubmit: () => {},
  children: null,
};

class SlideDownConfirm extends React.PureComponent {
  render() {
    return (
      <SlideDownPopover visible={this.props.visible}>
        <div
          className="p-absolute"
          style={{
            bottom: 40,
            top: 0,
            left: 0,
            right: 0,
            overFlowY: 'auto',
          }}
        >
          {this.props.children}
        </div>

        <div
          className="p-absolute text-center border-0 border-primary"
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            lineHeight: '40px',
          }}
        >
          <div
            className="text-primary d-inline-block"
            aria-hidden
            style={{ width: '50%' }}
            onClick={this.props.onClose}
          >
            取消
          </div>

          <div
            aria-hidden
            className="text-white bg-primary d-inline-block"
            style={{ width: '50%' }}
            onClick={this.props.onSubmit}
          >
            确认
          </div>
        </div>
      </SlideDownPopover>
    );
  }
}

SlideDownConfirm.propTypes = propTypes;
SlideDownConfirm.defaultProps = defaultProps;

export default SlideDownConfirm;
