import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import { addClass, removeClass } from 'dom-helpers/class';

import style from './style/index.scss';
import Portal from '../Portal';
import Animate from '../Animate/Animate';

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
            <div className={style.modal}>
              <div className={style.mask} />
              <div className={style.body}>
                {this.props.children}
              </div>
              <div
                className={style.close}
                aria-hidden
                onClick={() => this.props.onClose()}
              >
                <i className="icon icon-times" />
              </div>
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
