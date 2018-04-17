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
    title: _propTypes2.default.string.isRequired
  })),
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.array]),
  onChange: _propTypes2.default.func
};

var defaultProps = {
  options: [],
  onChange: function onChange() {},
  value: null
};

var Select = function (_React$PureComponent) {
  (0, _inherits3.default)(Select, _React$PureComponent);

  function Select() {
    (0, _classCallCheck3.default)(this, Select);
    return (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).apply(this, arguments));
  }

  (0, _createClass3.default)(Select, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.props.options;


      return _react2.default.createElement(
        'select',
        {
          onChange: function onChange(e) {
            return _this2.props.onChange(e.target.value, e);
          },
          value: this.props.value
        },
        options && options.map(function (option, index) {
          return _react2.default.createElement(
            'option',
            {
              value: option.value,
              key: '' + (index + 1)
            },
            option.title
          );
        })
      );
    }
  }]);
  return Select;
}(_react2.default.PureComponent);

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

exports.default = Select;