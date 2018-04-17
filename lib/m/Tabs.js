'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var propTypes = {
  className: _propTypes2.default.string,
  currentClassName: _propTypes2.default.string,
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    title: _propTypes2.default.string,
    value: _propTypes2.default.any
  })),
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  onChange: _propTypes2.default.func,
  renderTitle: _propTypes2.default.func
};

var defaultProps = {
  className: null,
  onChange: function onChange() {},
  currentClassName: 'current',
  value: null,
  options: [],
  renderTitle: null
};

var Tabs = function (_React$PureComponent) {
  (0, _inherits3.default)(Tabs, _React$PureComponent);

  function Tabs() {
    (0, _classCallCheck3.default)(this, Tabs);
    return (0, _possibleConstructorReturn3.default)(this, (Tabs.__proto__ || (0, _getPrototypeOf2.default)(Tabs)).apply(this, arguments));
  }

  (0, _createClass3.default)(Tabs, [{
    key: 'onChange',
    value: function onChange(value) {
      var _props = this.props,
          old = _props.value,
          onChange = _props.onChange;


      if (old !== value) {
        onChange(value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'ul',
        { className: this.props.className },
        this.props.options.map(function (option) {
          return _react2.default.createElement(
            'li',
            {
              key: option.value,
              className: (0, _classnames2.default)((0, _defineProperty3.default)({}, _this2.props.currentClassName, option.value === _this2.props.value)),
              'aria-hidden': true,
              onClick: function onClick() {
                return _this2.onChange(option.value);
              }
            },
            _this2.props.renderTitle != null ? _this2.props.renderTitle(option) : option.title
          );
        })
      );
    }
  }]);
  return Tabs;
}(_react2.default.PureComponent);

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

exports.default = Tabs;