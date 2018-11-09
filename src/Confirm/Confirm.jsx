import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import Clickable from '../Clickable';

import './style/index.scss';

class Confirm extends React.PureComponent {
  static propTypes = {
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    hasCloseButton: PropTypes.bool,
    title: PropTypes.string,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    onClose: () => {},
    onConfirm: () => {},
    confirmText: '确定',
    cancelText: '取消',
    hasCloseButton: true,
    visible: false,
    title: null,
    children: null,
  };

  render() {
    return (
      <Modal
        {...this.props}
        className="confirm"
        title="提示"
        onEnter={this.props.onConfirm}
      >
        <div className="modal-body">
          {this.props.children}
        </div>

        <div className="modal-footer">
          <Clickable
            onClick={this.props.onClose}
          >
            <div className="btn btn-white ml-1">
              {this.props.cancelText}
            </div>
          </Clickable>

          <Clickable
            onClick={this.props.onConfirm}
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

export default Confirm;
