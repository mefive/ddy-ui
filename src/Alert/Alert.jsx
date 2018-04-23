import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

import './style/index.scss';
import Clickable from '../Clickable';

const propTypes = {
  onClose: PropTypes.func,
  confirmText: PropTypes.string,
  hasCloseButton: PropTypes.bool,
  title: PropTypes.string,
  visible: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  onClose: () => null,
  confirmText: '确定',
  hasCloseButton: true,
  visible: false,
  title: '提示',
  children: null,
};

class Alert extends React.PureComponent {
  render() {
    return (
      <Modal
        onClose={this.props.onClose}
        hasCloseButton={this.props.hasCloseButton}
        title={this.props.title}
        visible={this.props.visible}
        className="alert"
        onEnter={this.props.onClose}
      >
        <div className="dialog-content">
          {this.props.children}
        </div>

        <div className="dialog-actions">
          <Clickable
            onClick={this.props.onClose}
          >
            <div className="btn btn-primary">
              {this.props.confirmText}
            </div>
          </Clickable>
        </div>
      </Modal>
    );
  }
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
