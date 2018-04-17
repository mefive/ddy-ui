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

var _CalendarDate = require('./CalendarDate');

var _CalendarDate2 = _interopRequireDefault(_CalendarDate);

var _CalendarMonth = require('./CalendarMonth');

var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TYPE_DATE = 'type_date';
var TYPE_MONTH = 'type_month';

var propTypes = {
  type: _propTypes2.default.string
};

var defaultProps = {
  type: TYPE_DATE
};

var Calendar = function (_React$PureComponent) {
  (0, _inherits3.default)(Calendar, _React$PureComponent);

  function Calendar() {
    (0, _classCallCheck3.default)(this, Calendar);
    return (0, _possibleConstructorReturn3.default)(this, (Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).apply(this, arguments));
  }

  (0, _createClass3.default)(Calendar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'calendar' },
        this.props.type === TYPE_DATE ? _react2.default.createElement(_CalendarDate2.default, this.props) : _react2.default.createElement(_CalendarMonth2.default, this.props)
      );
    }
  }]);
  return Calendar;
}(_react2.default.PureComponent);

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

Calendar.TYPE_DATE = TYPE_DATE;
Calendar.TYPE_MONTH = TYPE_MONTH;

exports.default = Calendar;