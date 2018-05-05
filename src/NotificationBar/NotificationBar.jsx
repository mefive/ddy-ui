import React from 'react';
import PropTypes from 'prop-types';

import './style/index.scss';
import Animate from '../Animate/Animate';
import Notification from './Notification';
import Portal from '../Portal';

const propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape({})),
};

const defaultProps = {
  dataSource: [],
};


const NotificationBar = props => (
  <Portal>
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
  </Portal>
);

NotificationBar.propTypes = propTypes;
NotificationBar.defaultProps = defaultProps;
NotificationBar.Notification = Notification;

export default NotificationBar;
