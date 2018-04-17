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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node.isRequired
};

var Clickable = function (_React$PureComponent) {
  (0, _inherits3.default)(Clickable, _React$PureComponent);

  function Clickable() {
    (0, _classCallCheck3.default)(this, Clickable);
    return (0, _possibleConstructorReturn3.default)(this, (Clickable.__proto__ || (0, _getPrototypeOf2.default)(Clickable)).apply(this, arguments));
  }

  (0, _createClass3.default)(Clickable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
        onClick: this.props.onClick,
        onKeyPress: function onKeyPress(e) {
          if (e.key === 'Enter') {
            _this2.props.onClick();
          }
        },
        tabIndex: 0,
        role: 'button'
      });
    }
  }]);
  return Clickable;
}(_react2.default.PureComponent);

Clickable.propTypes = propTypes;

exports.default = Clickable;