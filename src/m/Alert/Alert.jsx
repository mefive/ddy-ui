import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import './style/index.scss';

const propTypes = {
  onClose: PropTypes.func,
  confirmText: PropTypes.string,
  hasCloseButton: PropTypes.bool,
  title: PropTypes.string,
  visible: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  onClose: () => {},
  confirmText: '确定',
  hasCloseButton: true,
  visible: false,
  title: null,
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
      >
        <div className="dialog-content">
          {this.props.children}
        </div>

        <div className="dialog-actions">
          <div
            aria-hidden
            className="btn btn-primary"
            onClick={this.props.onClose}
          >
            {this.props.confirmText}
          </div>
        </div>
      </Modal>
    );
  }
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
