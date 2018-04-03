import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style/index.scss';
import sleep from '../../utils/sleep';
import Animate from '../Animate/Animate';

const propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape({})),
};

const defaultProps = {
  onRemove: () => {},
  dataSource: [],
};

export class Notification extends React.PureComponent {
  componentDidMount() {
    this.hasMounted = true;
    this.wait();
  }

  componentWillUnmount() {
    this.hasMounted = false;
  }

  async wait() {
    await sleep(this.props.wait);
    if (this.hasMounted) {
      this.props.onRemove();
    }
  }

  render() {
    const { type = Notification.type.SUCC, message, className } = this.props;

    return (
      <div
        className={classNames(
          'notification',
          { 'alert-success': type === Notification.type.SUCC },
          { 'alert-error': type === Notification.type.ERROR },
          { [className]: !!className },
        )}
      >
        {message}
      </div>
    );
  }
}

Notification.defaultProps = {
  wait: 3000,
  onRemove: () => {},
};

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
