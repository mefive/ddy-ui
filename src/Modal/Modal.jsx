import React from 'react';
import keycode from 'keycode';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addClass, removeClass } from 'dom-helpers/class';

import Portal from '../Portal';
import Animate from '../Animate';

import './style/index.scss';

const propTypes = {
  title: PropTypes.string,
  renderTitle: PropTypes.func,
  bigHeader: PropTypes.bool,
  hasCloseButton: PropTypes.bool,
  className: PropTypes.string,
  onClose: PropTypes.func,
  onEnter: PropTypes.func,
  visible: PropTypes.bool,
  onResize: PropTypes.func,
  id: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  title: null,
  className: null,
  renderTitle: null,
  bigHeader: false,
  onClose: () => {},
  onEnter: () => {},
  hasCloseButton: true,
  visible: false,
  onResize: () => {},
  id: null,
  children: null,
};

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      marginLeft: 0,
      marginTop: 0,
      windowHeight: window.innerHeight,
    };

    this.onResize = this.onResize.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.pin = this.pin.bind(this);
  }

  componentDidMount() {
    this.hasMounted = true;
    this.pin();
    window.addEventListener('resize', this.onResize);
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
      this.pin();
      addClass(document.body, 'has-modal');
    } else if (visible && !this.props.visible) {
      removeClass(document.body, 'has-modal');
    }
  }

  componentWillUnmount() {
    this.hasMounted = false;
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress(e) {
    e.preventDefault();

    const code = keycode(e);

    if (code === 'esc') {
      this.props.onClose();
    } else if (code === 'enter') {
      this.props.onEnter();
    }
  }

  onResize() {
    if (!this.hasMounted) {
      return;
    }

    this.setState(
      { windowHeight: window.innerHeight },
      () => this.pin(),
    );
  }

  pin() {
    if (!this.props.visible || !this.hasMounted) {
      return;
    }

    const { dialog } = this;


    if (dialog) {
      this.setState(
        {
          marginLeft: -0.5 * dialog.offsetWidth,
          marginTop: -0.5 * dialog.offsetHeight,
        },
        () => this.props.onResize(),
      );
    }
  }

  render() {
    return (
      <Animate>
        {this.props.visible && (
          <Portal>
            <div
              className={classNames(
                'modal',
                this.props.className,
              )}
            >
              <div className="modal-mask" />

              <div
                className={classNames(
                  'modal-dialog',
                  { 'big-header': this.props.bigHeader },
                )}
                style={{
                  marginLeft: this.state.marginLeft,
                  marginTop: this.state.marginTop,
                }}
                ref={(el) => { this.dialog = el; }}
                id={this.props.id}
              >
                {(this.props.renderTitle || this.props.title) && (
                  <div className="dialog-header">
                    {this.props.hasCloseButton && (
                      <i
                        className="icon icon-times-circle-o close"
                        aria-hidden
                        onClick={this.props.onClose}
                      />
                    )}

                    {this.props.renderTitle != null
                      ? this.props.renderTitle()
                      : (
                        <h3>{this.props.title}</h3>
                      )
                    }
                  </div>
                )}

                <div
                  className="dialog-body"
                  style={{
                    maxHeight: this.state.windowHeight - 55,
                    overflowY: 'auto',
                  }}
                >
                  {this.props.children}
                </div>
              </div>
            </div>
          </Portal>
        )}
      </Animate>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
