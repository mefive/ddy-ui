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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('./style/index.scss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  size: _propTypes2.default.number,
  color: _propTypes2.default.string,
  className: _propTypes2.default.string
};

var defaultProps = {
  size: 20,
  color: '#333',
  className: null
};

var DoubleBounce = function (_React$PureComponent) {
  (0, _inherits3.default)(DoubleBounce, _React$PureComponent);

  function DoubleBounce() {
    (0, _classCallCheck3.default)(this, DoubleBounce);
    return (0, _possibleConstructorReturn3.default)(this, (DoubleBounce.__proto__ || (0, _getPrototypeOf2.default)(DoubleBounce)).apply(this, arguments));
  }

  (0, _createClass3.default)(DoubleBounce, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_index2.default.spinner, this.props.className),
          style: {
            width: this.props.size,
            height: this.props.size
          }
        },
        _react2.default.createElement('div', {
          className: _index2.default['double-bounce1'],
          style: {
            backgroundColor: this.props.color
          }
        }),
        _react2.default.createElement('div', {
          className: _index2.default['double-bounce2'],
          style: {
            backgroundColor: this.props.color
          }
        })
      );
    }
  }]);
  return DoubleBounce;
}(_react2.default.PureComponent);

DoubleBounce.propTypes = propTypes;
DoubleBounce.defaultProps = defaultProps;

exports.default = DoubleBounce;