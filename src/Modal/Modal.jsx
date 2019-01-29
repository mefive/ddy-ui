import React from 'react';
import keycode from 'keycode';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { addClass, removeClass } from 'dom-helpers/class';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Portal from '../Portal';
import Animate from '../Animate';
import Clickable from '../Clickable';

import './style.scss';

class Modal extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    onClose: PropTypes.func,
    onEnter: PropTypes.func,
    visible: PropTypes.bool,
    children: PropTypes.node,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    title: null,
    className: null,
    onClose: null,
    onEnter: () => {},
    visible: false,
    children: null,
    width: 480,
  };

  constructor(props) {
    super(props);

    this.state = {
      marginLeft: 0,
      marginTop: 0,
      bodyMaxHeight: window.innerHeight,
    };

    this.dialog = React.createRef();
    this.dialogHeader = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillReceiveProps({ visible }) {
    if (visible && !this.props.visible) {
      document.activeElement.blur();
      document.addEventListener('keydown', this.onKeyPress);
    } else if (!visible && this.props.visible) {
      document.removeEventListener('keydown', this.onKeyPress);
    }
  }

  componentDidUpdate({ visible }) {
    if (!visible && this.props.visible) {
      this.syncBodyMaxHeight();
      addClass(document.body, 'modal-open');
    } else if (visible && !this.props.visible) {
      removeClass(document.body, 'modal-open');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    document.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress = (e) => {
    const code = keycode(e);

    if (code === 'esc') {
      e.preventDefault();
      this.props.onClose();
    } else if (code === 'enter') {
      this.props.onEnter();
    }
  };

  syncBodyMaxHeight = () => {
    const dialogHeader = this.dialogHeader.current;
    this.setState({
      bodyMaxHeight:
      window.innerHeight - (dialogHeader == null ? 0 : dialogHeader.offsetHeight) - 2,
    }, this.pin);
  };

  resize = debounce(this.syncBodyMaxHeight);

  pin = () => {
    if (this.props.visible) {
      const dialog = this.dialog.current;

      if (dialog) {
        window.ddd = dialog;

        this.setState({
          marginLeft: -0.5 * dialog.clientWidth,
          marginTop: -0.5 * dialog.clientHeight,
        });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Animate
          enterClassName="modal-fade-in"
          enterDuration={300}
          leaveClassName="modal-fade-out"
          leaveDuration={300}
        >
          {this.props.visible && (
            <Portal>
              <div className="modal-backdrop show" />
            </Portal>
          )}
        </Animate>

        <Animate
          enterClassName="scale-in"
          enterDuration={300}
          leaveClassName="scale-out"
          leaveDuration={300}
        >
          {this.props.visible && (
            <Portal>
              <div
                className={classNames(
                  'modal',
                  this.props.className,
                )}
              >
                <div
                  className="modal-dialog"
                  ref={this.dialog}
                  style={{
                    marginLeft: this.state.marginLeft,
                    marginTop: this.state.marginTop,
                    minWidth: this.props.width,
                  }}
                >
                  <div className="modal-content">
                    <div className="modal-header" ref={this.dialogHeader}>
                      <h5 className="modal-title">{this.props.title}</h5>
                      {this.props.onClose != null && (
                        <Clickable onClick={this.props.onClose}>
                          <div className="close">
                            <FontAwesomeIcon icon={faTimes} />
                          </div>
                        </Clickable>
                      )}
                    </div>

                    <div
                      style={{
                        maxHeight: this.state.bodyMaxHeight,
                        overflowY: 'auto',
                      }}
                    >
                      {this.props.children}
                    </div>
                  </div>
                </div>
              </div>
            </Portal>
          )}
        </Animate>
      </React.Fragment>
    );
  }
}

export default Modal;
