'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPR_ERROR = 'error';
var TYPE_SUCC = 'succ';

var propTypes = {
  wait: _propTypes2.default.number,
  onRemove: _propTypes2.default.func,
  className: _propTypes2.default.string,
  type: _propTypes2.default.string,
  message: _propTypes2.default.string
};

var defaultProps = {
  wait: 3000,
  onRemove: function onRemove() {},
  className: null,
  type: TYPE_SUCC,
  message: null
};

var Notification = function (_React$PureComponent) {
  (0, _inherits3.default)(Notification, _React$PureComponent);

  function Notification() {
    (0, _classCallCheck3.default)(this, Notification);
    return (0, _possibleConstructorReturn3.default)(this, (Notification.__proto__ || (0, _getPrototypeOf2.default)(Notification)).apply(this, arguments));
  }

  (0, _createClass3.default)(Notification, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.waitTimer = setTimeout(function () {
        return _this2.props.onRemove();
      }, this.props.wait);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('notification', { 'alert-success': this.props.type === Notification.type.SUCC }, { 'alert-error': this.props.type === Notification.type.ERROR }, this.props.className)
        },
        this.props.message
      );
    }
  }]);
  return Notification;
}(_react2.default.PureComponent);

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

Notification.type = {
  ERROR: TYPR_ERROR,
  SUCC: TYPE_SUCC
};

exports.default = Notification;