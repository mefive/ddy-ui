import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TYPE_ERROR = 'error';
const TYPE_SUCCESS = 'success';
const TYPE_INFO = 'info';
const TYPE_PRIMARY = 'primary';

class Notification extends React.PureComponent {
  static TYPE_ERROR = TYPE_ERROR;
  static TYPE_SUCCESS = TYPE_SUCCESS;
  static TYPE_INFO = TYPE_INFO;
  static TYPE_PRIMARY = TYPE_PRIMARY;

  static propTypes = {
    wait: PropTypes.number,
    onRemove: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string,
  };

  static defaultProps = {
    wait: 3000,
    onRemove: () => {},
    className: null,
    type: TYPE_SUCCESS,
    message: null,
  };

  componentDidMount() {
    this.timer = setTimeout(
      () => this.props.onRemove(),
      this.props.wait,
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    return (
      <div
        className={classNames(
          'alert',
          { 'alert-success': this.props.type === Notification.TYPE_SUCCESS },
          { 'alert-danger': this.props.type === Notification.TYPE_ERROR },
          { 'alert-info': this.props.type === Notification.TYPE_INFO },
          { 'alert-primary': this.props.type === Notification.TYPE_PRIMARY },
          this.props.className,
        )}
      >
        {this.props.message}
      </div>
    );
  }
}

export default Notification;
