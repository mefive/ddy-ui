import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

import './style/index.scss';

const propTypes = {
  onClose: PropTypes.func,
  confirmText: PropTypes.string,
  hasCloseButton: PropTypes.bool,
  title: PropTypes.string,
  visible: PropTypes.bool,
};

const defaultProps = {
  onClose: () => null,
  onConfirm: () => null,
  confirmText: '确定',
  cancelText: '取消',
  hasCloseButton: true,
  visible: false,
};

class Confirm extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        className="confirm"
        title="提示"
      >
        <div className="dialog-content">
          {this.props.children}
        </div>

        <div className="dialog-actions">
          <div
            className="btn btn-primary"
            onClick={this.props.onConfirm}
          >
            {this.props.confirmText}
          </div>

          <div
            className="btn btn-default"
            onClick={this.props.onClose}
          >
            {this.props.cancelText}
          </div>
        </div>
      </Modal>
    );
  }
}

Confirm.propTypes = propTypes;
Confirm.defaultProps = defaultProps;

export default Confirm;
