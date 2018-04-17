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

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  onChange: _propTypes2.default.func,
  maxLength: _propTypes2.default.number,
  showCounter: _propTypes2.default.bool
};

var defaultProps = {
  value: null,
  onChange: function onChange() {},
  maxLength: null,
  showCounter: true
};

var TextArea = function (_React$PureComponent) {
  (0, _inherits3.default)(TextArea, _React$PureComponent);

  function TextArea() {
    (0, _classCallCheck3.default)(this, TextArea);
    return (0, _possibleConstructorReturn3.default)(this, (TextArea.__proto__ || (0, _getPrototypeOf2.default)(TextArea)).apply(this, arguments));
  }

  (0, _createClass3.default)(TextArea, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = (0, _omit2.default)(this.props, ['showCounter']);

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement('textArea', (0, _extends3.default)({}, props, {
          onChange: function onChange(e) {
            return _this2.props.onChange(e.target.value, e);
          }
        })),
        this.props.showCounter && this.props.maxLength != null && _react2.default.createElement(
          'div',
          { className: 'text-right mt-1' },
          this.props.value == null ? 0 : ('' + this.props.value).length,
          '/',
          this.props.maxLength
        )
      );
    }
  }]);
  return TextArea;
}(_react2.default.PureComponent);

TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;

exports.default = TextArea;