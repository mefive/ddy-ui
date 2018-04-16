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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _padStart = require('lodash/padStart');

var _padStart2 = _interopRequireDefault(_padStart);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CalendarData = require('./CalendarData');

var _CalendarData2 = _interopRequireDefault(_CalendarData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calendarData = new _CalendarData2.default(0);

var weekDaysLang = ['日', '一', '二', '三', '四', '五', '六'];

var propTypes = {
  className: _propTypes2.default.string,
  max: _propTypes2.default.string,
  min: _propTypes2.default.string,
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func
};

var defaultProps = {
  className: null,
  max: '',
  min: '',
  value: (0, _moment2.default)().format('YYYY-MM-DD'),
  onChange: function onChange() {}
};

var Calendar = function (_Component) {
  (0, _inherits3.default)(Calendar, _Component);

  function Calendar(props) {
    (0, _classCallCheck3.default)(this, Calendar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).call(this, props));

    _this.state = _this.getUpdatedYearMonth();
    return _this;
  }

  (0, _createClass3.default)(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this.getUpdatedYearMonth(nextProps.value));
    }
  }, {
    key: 'getUpdatedYearMonth',
    value: function getUpdatedYearMonth() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;

      return {
        year: (0, _moment2.default)(value).year(),
        month: (0, _moment2.default)(value).month() + 1
      };
    }
  }, {
    key: 'getDate',
    value: function getDate(day) {
      return this.state.year + '-' + (0, _padStart2.default)(this.state.month, 2, '0') + '-' + (0, _padStart2.default)(day, 2, '0');
    }
  }, {
    key: 'changeMonth',
    value: function changeMonth(action) {
      var date = (0, _moment2.default)(this.getDate(1));

      if (action === 'prev') {
        date.subtract(1, 'M');
      } else {
        date.add(1, 'M');
      }

      this.setState({
        year: date.year(),
        month: date.month() + 1
      });
    }
  }, {
    key: 'isDisable',
    value: function isDisable(day) {
      var date = this.getDate(day);
      var _props = this.props,
          max = _props.max,
          min = _props.min;


      return max && (0, _moment2.default)(date) > (0, _moment2.default)(max) || min && (0, _moment2.default)(date) < (0, _moment2.default)(min);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          className = _props2.className,
          value = _props2.value,
          onChange = _props2.onChange;
      var _state = this.state,
          year = _state.year,
          month = _state.month;


      var monthDays = calendarData.monthDays(year, month - 1);

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('calendar-month', (0, _defineProperty3.default)({}, className, !!className))
        },
        _react2.default.createElement(
          'table',
          { className: 'month-switcher' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                {
                  className: 'action',
                  width: 30,
                  onClick: function onClick() {
                    return _this2.changeMonth('prev');
                  }
                },
                _react2.default.createElement('i', { className: 'icon icon-angle-left' })
              ),
              _react2.default.createElement(
                'th',
                { colSpan: 5 },
                year,
                '\u5E74',
                (0, _padStart2.default)(month, 2, '0'),
                '\u6708'
              ),
              _react2.default.createElement(
                'th',
                {
                  className: 'action',
                  width: 30,
                  onClick: function onClick() {
                    return _this2.changeMonth('next');
                  }
                },
                _react2.default.createElement('i', { className: 'icon icon-angle-right' })
              )
            )
          )
        ),
        _react2.default.createElement(
          'table',
          { className: 'month-table' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              weekDaysLang.map(function (i, index) {
                return _react2.default.createElement(
                  'th',
                  { key: '' + (index + 1) },
                  i
                );
              })
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            monthDays.map(function (i, rowIndex) {
              return _react2.default.createElement(
                'tr',
                { key: '' + (rowIndex + 1) },
                i.map(function (j, colIndex) {
                  var isDisable = _this2.isDisable(j);

                  return _react2.default.createElement(
                    'td',
                    {
                      key: '' + (colIndex + 1),
                      className: (0, _classnames2.default)('day', { disable: isDisable || !j }, { enable: !isDisable && j }, { current: _this2.getDate(j) === value }),
                      'aria-hidden': true,
                      onClick: function onClick() {
                        if (!isDisable && j) {
                          onChange(_this2.getDate(j));
                        }
                      }
                    },
                    j || null
                  );
                })
              );
            })
          )
        )
      );
    }
  }]);
  return Calendar;
}(_react.Component);

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

exports.default = Calendar;