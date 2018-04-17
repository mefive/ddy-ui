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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _rmcDatePicker = require('rmc-date-picker');

var _rmcDatePicker2 = _interopRequireDefault(_rmcDatePicker);

var _Popup = require('rmc-date-picker/lib/Popup');

var _Popup2 = _interopRequireDefault(_Popup);

require('rmc-picker/assets/index.css');

require('rmc-date-picker/assets/index.css');

require('rmc-picker/assets/popup.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODE_DATE = 'date';
var MODE_TIME = 'time';
var MODE_DATETIME = 'datetime';
var MODE_YEAR = 'year';
var MODE_MONTH = 'month';

var propTypes = {
  mode: _propTypes2.default.string,
  minDate: _propTypes2.default.instanceOf(_moment2.default),
  maxDate: _propTypes2.default.instanceOf(_moment2.default),
  value: _propTypes2.default.instanceOf(_moment2.default),
  onChange: _propTypes2.default.func,
  popupTitle: _propTypes2.default.string,
  children: _propTypes2.default.node
};

var defaultProps = {
  mode: MODE_DATE,
  minDate: null,
  maxDate: null,
  value: null,
  popupTitle: '请选择',
  onChange: function onChange() {
    return null;
  },
  children: null
};

var DatePicker = function (_React$PureComponent) {
  (0, _inherits3.default)(DatePicker, _React$PureComponent);

  function DatePicker(props) {
    (0, _classCallCheck3.default)(this, DatePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).call(this, props));

    _this.state = {
      maxDate: _this.props.maxDate && _this.props.maxDate.toDate(),
      minDate: _this.props.minDate && _this.props.minDate.toDate(),
      value: _this.props.value == null ? new Date() : _this.props.value.toDate()
    };
    return _this;
  }

  (0, _createClass3.default)(DatePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var value = _ref.value,
          maxDate = _ref.maxDate,
          minDate = _ref.minDate;

      if (value !== this.props.value) {
        this.setState({ value: value == null ? new Date() : value.toDate() });
      }

      if (maxDate !== this.props.maxDate) {
        this.setState({ maxDate: maxDate.toDate() });
      }

      if (minDate !== this.props.minDate) {
        this.setState({ minDate: minDate.toDate() });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var datePicker = _react2.default.createElement(_rmcDatePicker2.default, {
        rootNativeProps: { 'data-xx': 'yy' },
        defaultDate: new Date(),
        mode: this.props.mode,
        maxDate: this.state.maxDate,
        minDate: this.state.minDate
      });

      return _react2.default.createElement(
        _Popup2.default,
        {
          datePicker: datePicker,
          transitionName: 'rmc-picker-popup-slide-fade',
          maskTransitionName: 'rmc-picker-popup-fade',
          title: this.props.popupTitle,
          date: this.state.value,
          onChange: function onChange(value) {
            return _this2.props.onChange((0, _moment2.default)(value));
          },
          okText: '\u786E\u5B9A',
          dismissText: '\u53D6\u6D88'
        },
        this.props.children
      );
    }
  }]);
  return DatePicker;
}(_react2.default.PureComponent);

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

DatePicker.MODE_DATE = MODE_DATE;
DatePicker.MODE_TIME = MODE_TIME;
DatePicker.MODE_DATETIME = MODE_DATETIME;
DatePicker.MODE_YEAR = MODE_YEAR;
DatePicker.MODE_MONTH = MODE_MONTH;

exports.default = DatePicker;