import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Animate from '../../Animate/Animate';
import Portal from '../../Portal';

import './style/index.scss';

const propTypes = {
  title: PropTypes.string,
  hasCloseButton: PropTypes.bool,
  className: PropTypes.string,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  onResize: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  title: null,
  className: null,
  onClose: () => null,
  hasCloseButton: true,
  visible: false,
  onResize: () => {},
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
    this.pin = this.pin.bind(this);
  }

  componentDidMount() {
    this.hasMounted = true;
    this.pin();
    window.addEventListener('resize', this.onResize);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      setTimeout(this.pin);
    }
  }

  componentWillUnmount() {
    this.hasMounted = false;
    window.removeEventListener('resize', this.onResize);
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
    // const { marginTop, marginLeft } = this.state;

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
              className="modal-dialog"
              style={{
                marginLeft: this.state.marginLeft,
                marginTop: this.state.marginTop,
              }}
              ref={(el) => { this.dialog = el; }}
            >
              {this.props.title && (
                <div className="dialog-header">
                  {this.props.hasCloseButton && (
                  <i
                    className="icon icon-times-circle-o close"
                    aria-hidden
                    onClick={this.props.onClose}
                  />
                  )}
                  <h3>{this.props.title}</h3>
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
