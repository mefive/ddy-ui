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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Clickable = require('../Clickable');

var _Clickable2 = _interopRequireDefault(_Clickable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  max: _propTypes2.default.string,
  min: _propTypes2.default.string,
  dateRender: _propTypes2.default.func,
  onCalendarMove: _propTypes2.default.func
};

var defaultProps = {
  value: (0, _moment2.default)().format('YYYY-MM'),
  onChange: function onChange() {},
  max: null,
  min: null,
  dateRender: null,
  onCalendarMove: function onCalendarMove() {}
};

var monthLangList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

var CalendarMonth = function (_React$PureComponent) {
  (0, _inherits3.default)(CalendarMonth, _React$PureComponent);

  function CalendarMonth(props) {
    (0, _classCallCheck3.default)(this, CalendarMonth);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CalendarMonth.__proto__ || (0, _getPrototypeOf2.default)(CalendarMonth)).call(this, props));

    _this.state = {
      year: _this.getYear(_this.props.value)
    };
    return _this;
  }

  (0, _createClass3.default)(CalendarMonth, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var value = _ref.value;

      if (value !== this.props.value) {
        this.setState({ year: this.getYear(value) });
      }
    }
  }, {
    key: 'getYear',
    value: function getYear(value) {
      if (value == null) {
        return (0, _moment2.default)().year();
      }

      return (0, _moment2.default)(value).year();
    }
  }, {
    key: 'canSelectYear',
    value: function canSelectYear(year) {
      var _props = this.props,
          max = _props.max,
          min = _props.min;


      if (max == null && min == null) {
        return true;
      }

      if (max) {
        return year <= (0, _moment2.default)(max).year();
      }

      if (min) {
        return year >= (0, _moment2.default)(min).year();
      }

      return true;
    }
  }, {
    key: 'canSelectMonth',
    value: function canSelectMonth(year, month) {
      var _props2 = this.props,
          max = _props2.max,
          min = _props2.min;


      if (max == null && min == null) {
        return true;
      }

      var date = (0, _moment2.default)().year(year).month(month).format('YYYY-MM');

      var can = true;

      if (max) {
        can = (0, _moment2.default)(date) <= (0, _moment2.default)(max);
      }

      if (min) {
        can = (0, _moment2.default)(date) >= (0, _moment2.default)(min);
      }

      return can;
    }
  }, {
    key: 'renderSwitch',
    value: function renderSwitch() {
      var _this2 = this;

      var nextYear = (0, _moment2.default)().year(this.state.year).add(1, 'y').year();
      var lastYear = (0, _moment2.default)().year(this.state.year).subtract(1, 'y').year();

      return _react2.default.createElement(
        'div',
        { className: 'switcher' },
        _react2.default.createElement(
          _Clickable2.default,
          {
            onClick: function onClick() {
              if (_this2.canSelectYear(lastYear)) {
                _this2.setState({ year: lastYear });
                _this2.props.onCalendarMove(lastYear);
              }
            }
          },
          _react2.default.createElement('i', {
            className: (0, _classnames2.default)('icon icon-angle-left', { disable: !this.canSelectYear(lastYear) })
          })
        ),
        this.state.year,
        _react2.default.createElement(
          _Clickable2.default,
          {
            onClick: function onClick() {
              if (_this2.canSelectYear(nextYear)) {
                _this2.setState({ year: nextYear });
                _this2.props.onCalendarMove(nextYear);
              }
            }
          },
          _react2.default.createElement('i', {
            className: (0, _classnames2.default)('icon icon-angle-right', { disable: !this.canSelectYear(nextYear) })
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var month = (0, _moment2.default)(this.props.value).month();

      return _react2.default.createElement(
        'div',
        { className: 'calendar-year' },
        this.renderSwitch(),
        _react2.default.createElement(
          'div',
          { className: 'mt-1' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            monthLangList.map(function (monthLang, index) {
              return _react2.default.createElement(
                'div',
                { className: 'col col-width-4', key: '' + (index + 1) },
                _react2.default.createElement(
                  _Clickable2.default,
                  {
                    onClick: function onClick() {
                      if (_this3.canSelectMonth(_this3.state.year, index)) {
                        _this3.props.onChange((0, _moment2.default)().year(_this3.state.year).month(index).format('YYYY-MM'));
                      }
                    }
                  },
                  _react2.default.createElement(
                    'div',
                    {
                      className: (0, _classnames2.default)('month', {
                        'bg-primary text-white': month === index && _this3.state.year === (0, _moment2.default)(_this3.props.value).year(),
                        disable: !_this3.canSelectMonth(_this3.state.year, index)
                      })
                    },
                    _this3.props.dateRender != null ? _this3.props.dateRender(monthLang, {
                      year: _this3.state.year,
                      month: index + 1
                    }) : monthLang
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);
  return CalendarMonth;
}(_react2.default.PureComponent);

CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;

exports.default = CalendarMonth;