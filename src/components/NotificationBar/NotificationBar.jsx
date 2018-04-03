import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style/index.scss';
import Animate from '../Animate/Animate';

const propTypes = {
  wait: PropTypes.number,
  onRemove: PropTypes.func,
  dataSource: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.string,
};

const defaultProps = {
  wait: 3000,
  onRemove: () => {},
  dataSource: [],
  className: null,
  type: Notification.type.SUCC,
  message: null,
};

export class Notification extends React.PureComponent {
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
  ERROR: 'error',
  SUCC: 'succ',
};

const NotificationBar = props => (
  <div className="notification-bar">
    <Animate
      enterClassName="slide-down-in"
      leaveClassName="slide-down-out"
    >
      {props.dataSource.map((i, index) => (
        <Notification
          key={i.id}
          message={i.message}
          type={i.type}
          onRemove={() => props.onRemove(index)}
        />
      ))}
    </Animate>
  </div>
);

NotificationBar.propTypes = propTypes;
NotificationBar.defaultProps = defaultProps;

NotificationBar.Notification = Notification;

export default NotificationBar;
