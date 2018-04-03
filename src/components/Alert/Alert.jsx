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
  confirmText: '确定',
  hasCloseButton: true,
  visible: false,
  title: '提示',
};

class Alert extends Component {
  render() {
    const {
      onClose,
      hasCloseButton,
      children,
      confirmText,
      title,
      visible,
    } = this.props;

    return (
      <Modal
        onClose={onClose}
        hasCloseButton={hasCloseButton}
        title={title}
        visible={visible}
        className="alert"
      >
        <div className="dialog-content">
          {children}
        </div>

        <div className="dialog-actions">
          <div
            className="btn btn-primary"
            onClick={onClose}
          >
            {confirmText}
          </div>
        </div>
      </Modal>
    );
  }
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
