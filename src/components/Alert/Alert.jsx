import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

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
  constructor(props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentWillReceiveProps({ visible }) {
    if (visible && !this.props.visible) {
      document.addEventListener('keydown', this.onKeyPress);
    } else if (!visible && this.props.visible) {
      document.removeEventListener('keydown', this.onKeyPress);
    }
  }

  onKeyPress(e) {
    e.preventDefault();

    const code = keycode(e);

    if (code === 'enter' || code === 'esc') {
      this.props.onClose();
    }
  }

  render() {
    const {
      confirmText,
      title,
      visible,
    } = this.props;

    return (
      <Modal
        onClose={this.props.onClose}
        hasCloseButton={this.props.hasCloseButton}
        title={title}
        visible={visible}
        className="alert"
      >
        <div className="dialog-content">
          {this.props.children}
        </div>

        <div className="dialog-actions">
          <Clickable
            onClick={this.props.onClose}
          >
            <div className="btn btn-primary">
              {confirmText}
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
