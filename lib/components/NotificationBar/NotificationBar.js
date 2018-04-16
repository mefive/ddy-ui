'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./style/index.scss');

var _Animate = require('../Animate/Animate');

var _Animate2 = _interopRequireDefault(_Animate);

var _Notification = require('./Notification');

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  dataSource: _propTypes2.default.arrayOf(_propTypes2.default.shape({}))
};

var defaultProps = {
  dataSource: []
};

var NotificationBar = function NotificationBar(props) {
  return _react2.default.createElement(
    'div',
    { className: 'notification-bar' },
    _react2.default.createElement(
      _Animate2.default,
      {
        enterClassName: 'slide-down-in',
        leaveClassName: 'slide-down-out'
      },
      props.dataSource.map(function (i, index) {
        return _react2.default.createElement(_Notification2.default, {
          key: i.id,
          message: i.message,
          type: i.type,
          onRemove: function onRemove() {
            return props.onRemove(index);
          }
        });
      })
    )
  );
};

NotificationBar.propTypes = propTypes;
NotificationBar.defaultProps = defaultProps;
NotificationBar.Notification = _Notification2.default;

exports.default = NotificationBar;