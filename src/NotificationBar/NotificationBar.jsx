import React from 'react';
import PropTypes from 'prop-types';

import Animate from '../Animate';
import Notification from './Notification';
import Portal from '../Portal';

import './style/index.scss';

class NotificationBar extends React.PureComponent {
  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.shape({})),
    onRemove: PropTypes.func,
  };

  static defaultProps = {
    dataSource: [],
    onRemove: () => {},
  };

  render() {
    return (
      <Portal>
        <div className="notification-bar">
          <Animate
            enterClassName="slide-down-in"
            leaveClassName="slide-down-out"
          >
            {this.props.dataSource.map((i, index) => (
              <Notification
                key={i.id}
                message={i.message}
                type={i.type}
                onRemove={() => this.props.onRemove(index)}
              />
            ))}
          </Animate>
        </div>
      </Portal>
    );
  }
}

export default NotificationBar;
