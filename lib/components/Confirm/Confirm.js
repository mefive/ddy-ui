'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _Modal = require('../Modal');

var _Modal2 = _interopRequireDefault(_Modal);

require('./style/index.scss');

var _Clickable = require('../Clickable');

var _Clickable2 = _interopRequireDefault(_Clickable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  confirmText: _propTypes2.default.string,
  cancelText: _propTypes2.default.string,
  hasCloseButton: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  visible: _propTypes2.default.bool,
  onClose: _propTypes2.default.func,
  onConfirm: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  onClose: function onClose() {},
  onConfirm: function onConfirm() {},
  confirmText: '确定',
  cancelText: '取消',
  hasCloseButton: true,
  visible: false,
  title: null,
  children: null
};

var Confirm = function (_React$PureComponent) {
  (0, _inherits3.default)(Confirm, _React$PureComponent);

  function Confirm() {
    (0, _classCallCheck3.default)(this, Confirm);
    return (0, _possibleConstructorReturn3.default)(this, (Confirm.__proto__ || (0, _getPrototypeOf2.default)(Confirm)).apply(this, arguments));
  }

  (0, _createClass3.default)(Confirm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Modal2.default,
        (0, _extends3.default)({}, this.props, {
          className: 'confirm',
          title: '\u63D0\u793A',
          onEnter: this.props.onConfirm
        }),
        _react2.default.createElement(
          'div',
          { className: 'dialog-content' },
          this.props.children
        ),
        _react2.default.createElement(
          'div',
          { className: 'dialog-actions' },
          _react2.default.createElement(
            _Clickable2.default,
            {
              onClick: this.props.onConfirm
            },
            _react2.default.createElement(
              'div',
              { className: 'btn btn-primary' },
              this.props.confirmText
            )
          ),
          _react2.default.createElement(
            _Clickable2.default,
            {
              onClick: this.props.onClose
            },
            _react2.default.createElement(
              'div',
              { className: 'btn btn-default' },
              this.props.cancelText
            )
          )
        )
      );
    }
  }]);
  return Confirm;
}(_react2.default.PureComponent);

Confirm.propTypes = propTypes;
Confirm.defaultProps = defaultProps;

exports.default = Confirm;