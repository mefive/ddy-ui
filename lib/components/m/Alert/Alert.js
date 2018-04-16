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

var _Modal = require('../Modal');

var _Modal2 = _interopRequireDefault(_Modal);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  onClose: _propTypes2.default.func,
  confirmText: _propTypes2.default.string,
  hasCloseButton: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  visible: _propTypes2.default.bool,
  children: _propTypes2.default.node
};

var defaultProps = {
  onClose: function onClose() {},
  confirmText: '确定',
  hasCloseButton: true,
  visible: false,
  title: null,
  children: null
};

var Alert = function (_React$PureComponent) {
  (0, _inherits3.default)(Alert, _React$PureComponent);

  function Alert() {
    (0, _classCallCheck3.default)(this, Alert);
    return (0, _possibleConstructorReturn3.default)(this, (Alert.__proto__ || (0, _getPrototypeOf2.default)(Alert)).apply(this, arguments));
  }

  (0, _createClass3.default)(Alert, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Modal2.default,
        {
          onClose: this.props.onClose,
          hasCloseButton: this.props.hasCloseButton,
          title: this.props.title,
          visible: this.props.visible,
          className: 'alert'
        },
        _react2.default.createElement(
          'div',
          { className: 'dialog-content' },
          this.props.children
        ),
        _react2.default.createElement(
          'div',
          { className: 'dialog-actions' },
          _react2.default.createElement(
            'div',
            {
              'aria-hidden': true,
              className: 'btn btn-primary',
              onClick: this.props.onClose
            },
            this.props.confirmText
          )
        )
      );
    }
  }]);
  return Alert;
}(_react2.default.PureComponent);

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

exports.default = Alert;