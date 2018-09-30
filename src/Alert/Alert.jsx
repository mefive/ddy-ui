import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

import Clickable from '../Clickable';

import './style/index.scss';

class Alert extends React.PureComponent {
  static propTypes = {
    onClose: PropTypes.func,
    confirmText: PropTypes.string,
    hasCloseButton: PropTypes.bool,
    title: PropTypes.string,
    visible: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    onClose: () => null,
    confirmText: '确定',
    hasCloseButton: true,
    visible: false,
    title: '提示',
    children: null,
  };

  render() {
    return (
      <Modal
        onClose={this.props.onClose}
        hasCloseButton={this.props.hasCloseButton}
        title={this.props.title}
        visible={this.props.visible}
        onEnter={this.props.onClose}
      >
        <div className="modal-body">
          {this.props.children}
        </div>

        <div className="modal-footer">
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

export default Alert;
