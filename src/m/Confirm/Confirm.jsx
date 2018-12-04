import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import './style/index.scss';

const propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  visible: PropTypes.bool,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  onClose: () => {},
  onConfirm: () => {},
  visible: false,
  confirmText: '确定',
  cancelText: '取消',
  children: null,
};

class Confirm extends React.PureComponent {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        hasCloseButton={false}
        className="confirm"
      >
        <div className="dialog-content">
          {this.props.children}
        </div>

        <div className="dialog-actions">
          <div
            aria-hidden
            className="btn btn-default"
            onClick={() => this.props.onClose()}
          >
            {this.props.cancelText}
          </div>

          <div
            aria-hidden
            className="btn btn-primary"
            onClick={() => this.props.onConfirm()}
          >
            {this.props.confirmText}
          </div>
        </div>
      </Modal>
    );
  }
}

Confirm.propTypes = propTypes;
Confirm.defaultProps = defaultProps;

export default Confirm;
