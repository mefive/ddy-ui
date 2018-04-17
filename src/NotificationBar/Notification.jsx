import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TYPR_ERROR = 'error';
const TYPE_SUCC = 'succ';

const propTypes = {
  wait: PropTypes.number,
  onRemove: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.string,
};

const defaultProps = {
  wait: 3000,
  onRemove: () => {},
  className: null,
  type: TYPE_SUCC,
  message: null,
};

class Notification extends React.PureComponent {
  componentDidMount() {
    this.waitTimer = setTimeout(
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
          { 'alert-success': this.props.type === Notification.type.SUCC },
          { 'alert-error': this.props.type === Notification.type.ERROR },
          this.props.className,
        )}
      >
        {this.props.message}
      </div>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

Notification.type = {
  ERROR: TYPR_ERROR,
  SUCC: TYPE_SUCC,
};

export default Notification;
