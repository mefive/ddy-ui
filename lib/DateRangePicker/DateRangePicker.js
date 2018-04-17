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

var _Trigger = require('../Trigger');

var _Trigger2 = _interopRequireDefault(_Trigger);

var _Popover = require('../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Calendar = require('../Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  type: _propTypes2.default.string,
  start: _propTypes2.default.string,
  end: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  disableCursor: _propTypes2.default.bool,
  getPopoverContainer: _propTypes2.default.func,
  max: _propTypes2.default.string,
  min: _propTypes2.default.string,
  placement: _propTypes2.default.string,
  defaultTitle: _propTypes2.default.string,
  dateRender: _propTypes2.default.func,
  onActiveChange: _propTypes2.default.func,
  onCalendarMove: _propTypes2.default.func
};

var defaultProps = {
  start: (0, _moment2.default)().subtract().format('YYYY-MM-DD'),
  end: (0, _moment2.default)().format('YYYY-MM-DD'),
  onChange: function onChange() {},
  disabled: false,
  disableCursor: false,
  getPopoverContainer: null,
  max: null,
  min: null,
  placement: _Popover2.default.placement.BOTTOM,
  type: _Calendar2.default.TYPE_DATE,
  defaultTitle: null,
  dateRender: null,
  onActiveChange: function onActiveChange() {},
  onCalendarMove: function onCalendarMove() {}
};

var DateRangePicker = function (_React$PureComponent) {
  (0, _inherits3.default)(DateRangePicker, _React$PureComponent);

  function DateRangePicker(props) {
    (0, _classCallCheck3.default)(this, DateRangePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateRangePicker.__proto__ || (0, _getPrototypeOf2.default)(DateRangePicker)).call(this, props));

    _this.state = {
      active: false,
      start: _this.props.start,
      end: _this.props.end
    };

    _this.setActive = _this.setActive.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(DateRangePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var start = _ref.start,
          end = _ref.end;

      if (start !== this.props.start || end !== this.props.end) {
        this.setState({ start: start, end: end });
      }
    }
  }, {
    key: 'setActive',
    value: function setActive(active) {
      var _this2 = this;

      this.setState({ active: active }, function () {
        if (!active) {
          _this2.setState({
            start: _this2.props.start,
            end: _this2.props.end
          });
        }
      });
      this.props.onActiveChange(active);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      if (this.props.start == null || this.props.end == null) {
        return this.props.defaultTitle == null ? '请选择' : this.props.defaultTitle;
      }

      var start = this.props.type === _Calendar2.default.TYPE_MONTH ? (0, _moment2.default)(this.props.start).format('YYYY-MM') : this.props.start;

      var end = this.props.type === _Calendar2.default.TYPE_MONTH ? (0, _moment2.default)(this.props.end).format('YYYY-MM') : this.props.end;

      return start + ' ~ ' + end;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('date-range-picker', { 'disable-cursor': this.props.disableCursor })
        },
        !this.props.disableCursor && _react2.default.createElement('i', {
          className: 'icon icon-angle-left backward float-left',
          'aria-hidden': true,
          onClick: function onClick() {
            if (_this3.props.type === _Calendar2.default.TYPE_MONTH) {
              var start = (0, _moment2.default)(_this3.props.start).subtract(1, 'M');
              var end = (0, _moment2.default)(_this3.props.end).subtract(1, 'M');

              if (_this3.props.min == null || start >= (0, _moment2.default)(_this3.props.min)) {
                _this3.props.onChange({
                  start: start.format('YYYY-MM'),
                  end: end.format('YYYY-MM')
                });
              }
            } else {
              var _start = (0, _moment2.default)(_this3.props.start).subtract(1, 'd');
              var _end = (0, _moment2.default)(_this3.props.end).subtract(1, 'd');

              if (_this3.props.min == null || _start >= (0, _moment2.default)(_this3.props.min)) {
                _this3.props.onChange({
                  start: _start.format('YYYY-MM-DD'),
                  end: _end.format('YYYY-MM-DD')
                });
              }
            }
          }
        }),
        !this.props.disableCursor && _react2.default.createElement('i', {
          className: 'icon icon-angle-right forward float-right',
          'aria-hidden': true,
          onClick: function onClick() {
            if (_this3.props.type === _Calendar2.default.TYPE_MONTH) {
              var start = (0, _moment2.default)(_this3.props.start).add(1, 'M');
              var end = (0, _moment2.default)(_this3.props.end).add(1, 'M');

              if (_this3.props.max == null || end <= (0, _moment2.default)(_this3.props.max)) {
                _this3.props.onChange({
                  start: start.format('YYYY-MM'),
                  end: end.format('YYYY-MM')
                });
              }
            } else {
              var _start2 = (0, _moment2.default)(_this3.props.start).add(1, 'd');
              var _end2 = (0, _moment2.default)(_this3.props.end).add(1, 'd');

              if (_this3.props.max == null || _end2 <= (0, _moment2.default)(_this3.props.max)) {
                _this3.props.onChange({
                  start: _start2.format('YYYY-MM-DD'),
                  end: _end2.format('YYYY-MM-DD')
                });
              }
            }
          }
        }),
        _react2.default.createElement(
          _Trigger2.default,
          {
            active: this.state.active,
            enterClassName: 'slide-down-in',
            leaveClassName: 'slide-down-out',
            disabled: this.props.disabled,
            getPopoverContainer: this.props.getPopoverContainer,
            onActiveChange: this.setActive,
            popover: _react2.default.createElement(
              _Popover2.default,
              {
                className: 'date-range-popover',
                placement: this.props.placement,
                offset: 10
              },
              _react2.default.createElement(
                'div',
                { className: 'float-left' },
                _react2.default.createElement(_Calendar2.default, {
                  type: this.props.type,
                  value: this.state.start,
                  onChange: function onChange(start) {
                    return _this3.setState({ start: start });
                  },
                  min: this.props.min,
                  max: this.state.end || this.props.max,
                  dateRender: this.props.dateRender,
                  onCalendarMove: this.props.onCalendarMove
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'float-right' },
                _react2.default.createElement(_Calendar2.default, {
                  type: this.props.type,
                  className: 'last-child',
                  value: this.state.end,
                  onChange: function onChange(end) {
                    return _this3.setState({ end: end });
                  },
                  min: this.state.start || this.props.min,
                  max: this.props.max,
                  dateRender: this.props.dateRender,
                  onCalendarMove: this.props.onCalendarMove
                })
              ),
              _react2.default.createElement(
                'div',
                {
                  className: 'actions'
                },
                _react2.default.createElement(
                  'div',
                  {
                    className: (0, _classnames2.default)('btn btn-primary', { disabled: this.state.start == null || this.state.end == null }),
                    onClick: function onClick() {
                      var _state = _this3.state,
                          start = _state.start,
                          end = _state.end;


                      if (start == null || end == null) {
                        return;
                      }

                      if (start !== _this3.props.start || end !== _this3.props.end) {
                        _this3.props.onChange({ start: start, end: end });
                      }

                      _this3.setState({ active: false });
                    },
                    'aria-hidden': true
                  },
                  '\u786E\u5B9A'
                )
              )
            )
          },
          _react2.default.createElement(
            'div',
            {
              style: this.props.disableCursor ? null : {
                marginLeft: '2.8em',
                marginRight: '2.8em'
              }
            },
            _react2.default.createElement('input', {
              type: 'text',
              value: this.getValue(),
              readOnly: true,
              style: { width: '100%', cursor: 'initial' }
            })
          )
        )
      );
    }
  }]);
  return DateRangePicker;
}(_react2.default.PureComponent);

DateRangePicker.propTypes = propTypes;
DateRangePicker.defaultProps = defaultProps;

exports.default = DateRangePicker;