import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TYPE_ERROR = 'error';
const TYPE_SUCCESS = 'success';

class Notification extends React.PureComponent {
  static TYPE_ERROR = TYPE_ERROR;

  static TYPE_SUCCESS = TYPE_SUCCESS;

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
          'notification',
          { 'alert-success': this.props.type === Notification.TYPE_SUCCESS },
          { 'alert-danger': this.props.type === Notification.TYPE_ERROR },
          this.props.className,
        )}
      >
        {this.props.message}
      </div>
    );
  }
}

export default Notification;
