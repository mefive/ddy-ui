import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import { addClass, removeClass } from 'dom-helpers/class';

import Portal from '../Portal';
import Animate from '../Animate/Animate';
import Clickable from '../Clickable';

import './style/index.scss';

const propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  visible: false,
  onClose: () => {},
  children: null,
};

class FullScreenModal extends React.PureComponent {
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

  componentDidUpdate({ visible }) {
    if (!visible && this.props.visible) {
      addClass(document.body, 'has-modal');
    } else if (visible && !this.props.visible) {
      removeClass(document.body, 'has-modal');
    }
  }

  onKeyPress(e) {
    e.preventDefault();

    const code = keycode(e);

    if (code === 'esc') {
      this.props.onClose();
    }
  }

  render() {
    return (
      <Animate>
        {this.props.visible && (
          <Portal>
            <div className="full-screen-modal">
              <div className="full-screen-modal-mask" />
              <div className="full-screen-modal-body">
                {this.props.children}
              </div>
              <Clickable
                onClick={() => this.props.onClose()}
              >
                <div
                  className="full-screen-modal-close"
                >
                  <i className="icon icon-times" />
                </div>
              </Clickable>
            </div>
          </Portal>
        )}
      </Animate>
    );
  }
}

FullScreenModal.propTypes = propTypes;
FullScreenModal.defaultProps = defaultProps;

export default FullScreenModal;
