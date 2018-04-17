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
  position: _propTypes2.default.string.isRequired,
  digit: _propTypes2.default.number.isRequired
};

var StaticCard = function (_React$Component) {
  (0, _inherits3.default)(StaticCard, _React$Component);

  function StaticCard() {
    (0, _classCallCheck3.default)(this, StaticCard);
    return (0, _possibleConstructorReturn3.default)(this, (StaticCard.__proto__ || (0, _getPrototypeOf2.default)(StaticCard)).apply(this, arguments));
  }

  (0, _createClass3.default)(StaticCard, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          position = _props.position,
          digit = _props.digit;

      return _react2.default.createElement(
        'div',
        { className: position },
        _react2.default.createElement(
          'span',
          null,
          digit
        )
      );
    }
  }]);
  return StaticCard;
}(_react2.default.Component);

StaticCard.propTypes = propTypes;

exports.default = StaticCard;