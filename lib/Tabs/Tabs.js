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

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  dataSource: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.any.isRequired,
    title: _propTypes2.default.string.isRequired
  })),
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool]),
  className: _propTypes2.default.string,
  itemClassName: _propTypes2.default.string,
  currentClassName: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  renderTitle: _propTypes2.default.func
};

var defaultProps = {
  dataSource: [],
  className: null,
  itemClassName: null,
  currentClassName: 'current',
  onChange: function onChange() {},
  value: null,
  renderTitle: null
};

var Tabs = function (_React$PureComponent) {
  (0, _inherits3.default)(Tabs, _React$PureComponent);

  function Tabs() {
    (0, _classCallCheck3.default)(this, Tabs);
    return (0, _possibleConstructorReturn3.default)(this, (Tabs.__proto__ || (0, _getPrototypeOf2.default)(Tabs)).apply(this, arguments));
  }

  (0, _createClass3.default)(Tabs, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: this.props.className
        },
        this.props.dataSource.map(function (tab, index) {
          return _react2.default.createElement(
            'div',
            {
              'aria-hidden': true,
              className: (0, _classnames2.default)(_this2.props.itemClassName, (0, _defineProperty3.default)({}, _this2.props.currentClassName, tab.value === _this2.props.value)),
              onClick: function onClick() {
                return _this2.props.onChange(tab.value);
              },
              key: '' + (index + 1)
            },
            _this2.props.renderTitle != null ? _this2.props.renderTitle(tab) : tab.title
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