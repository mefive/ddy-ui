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

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.any.isRequired,
    title: _propTypes2.default.string
  })),
  onChange: _propTypes2.default.func
};

var defaultProp = {
  options: [],
  onChange: function onChange() {
    return null;
  }
};

var RadioGroup = function (_React$Component) {
  (0, _inherits3.default)(RadioGroup, _React$Component);

  function RadioGroup() {
    (0, _classCallCheck3.default)(this, RadioGroup);
    return (0, _possibleConstructorReturn3.default)(this, (RadioGroup.__proto__ || (0, _getPrototypeOf2.default)(RadioGroup)).apply(this, arguments));
  }

  (0, _createClass3.default)(RadioGroup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'radio-group' },
        this.props.options.map(function (option) {
          return _react2.default.createElement(
            'label',
            { key: option.value },
            _react2.default.createElement('input', {
              type: 'radio',
              checked: option.value === _this2.props.value,
              onChange: function onChange(e) {
                _this2.props.onChange(option.value, e);
              }
            }),
            _react2.default.createElement(
              'span',
              null,
              option.title
            )
          );
        })
      );
    }
  }]);
  return RadioGroup;
}(_react2.default.Component);

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProp = defaultProp;

exports.default = RadioGroup;