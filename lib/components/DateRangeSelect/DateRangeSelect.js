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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('../DateRangePicker/style/index.scss');

var _Select = require('../Select/Select');

var _Select2 = _interopRequireDefault(_Select);

var _Trigger = require('../Trigger');

var _Trigger2 = _interopRequireDefault(_Trigger);

var _Popover = require('../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Calendar = require('../Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  start: _propTypes2.default.string,
  end: _propTypes2.default.string,
  onChange: _propTypes2.default.func
};

var defaultProps = {
  start: null,
  end: null,
  onChange: function onChange() {
    return null;
  }
};

function getDate() {
  var diff = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'd';

  return (0, _moment2.default)().add(diff, unit).format('YYYY-MM-DD');
}

var DateRangeSelect = function (_React$PureComponent) {
  (0, _inherits3.default)(DateRangeSelect, _React$PureComponent);

  function DateRangeSelect(props) {
    (0, _classCallCheck3.default)(this, DateRangeSelect);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateRangeSelect.__proto__ || (0, _getPrototypeOf2.default)(DateRangeSelect)).call(this, props));

    _this.state = {
      options: [{ value: 'today', title: '今日' }, { value: '7days', title: '最近7天' }, { value: '30days', title: '最近30天' }, { value: 'custom', title: '自定义' }],
      selectValue: null,
      customActive: false,
      selectDisabled: false,
      start: null,
      end: null
    };
    return _this;
  }

  (0, _createClass3.default)(DateRangeSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateStates(this.props.start, this.props.end);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.start !== this.props.start || nextProps.end !== this.props.end) {
        this.updateStates(nextProps.start, nextProps.end);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.state.selectValue !== nextState.selectValue) {
        if (nextState.selectValue === 'custom') {
          this.setState({
            customActive: true,
            selectDisabled: true
          });
        } else {
          this.setState({
            selectDisabled: false
          });
        }
      }
    }
  }, {
    key: 'updateStates',
    value: function updateStates(start, end) {
      this.setState({
        start: start,
        end: end,
        selectValue: this.getSelectValue(start, end)
      });
    }
  }, {
    key: 'getSelectValue',
    value: function getSelectValue(start, end) {
      var diff = _moment2.default.duration((0, _moment2.default)(end) - (0, _moment2.default)(start));
      var selectValue = null;

      if ((0, _moment2.default)(end).format('YYYY-MM-DD') === getDate()) {
        switch (diff.days()) {
          case 0:
            {
              selectValue = 'today';
              break;
            }

          case 6:
            {
              selectValue = '7days';
              break;
            }

          case 30:
            {
              selectValue = '30days';
              break;
            }
        }
      }

      return selectValue;
    }
  }, {
    key: 'getValue',
    value: function getValue(value) {
      var start = void 0;
      var end = void 0;

      switch (value) {
        case 'custom':
          {
            var _state = this.state;
            start = _state.start;
            end = _state.end;

            break;
          }

        case '7days':
          {
            start = getDate(-6);
            end = getDate();
            break;
          }

        case '30days':
          {
            start = getDate(-30);
            end = getDate();
            break;
          }

        case 'today':
          {
            start = getDate();
            end = getDate();
            break;
          }

        default:
          {
            var _state2 = this.state;
            start = _state2.start;
            end = _state2.end;

            break;
          }
      }

      return {
        start: start, end: end
      };
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {
      var _getValue = this.getValue(this.state.selectValue),
          start = _getValue.start,
          end = _getValue.end;

      return start + ' \u81F3 ' + end;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          width = _props.width,
          value = _props.value,
          _onChange = _props.onChange,
          max = _props.max,
          min = _props.min;
      var _state3 = this.state,
          options = _state3.options,
          customActive = _state3.customActive,
          selectValue = _state3.selectValue,
          selectDisabled = _state3.selectDisabled,
          start = _state3.start,
          end = _state3.end;


      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('date-range-select', (0, _defineProperty3.default)({}, className, !!className))
        },
        _react2.default.createElement(
          _Trigger2.default,
          {
            active: customActive,
            enterClassName: 'slide-down-in',
            leaveClassName: 'slide-down-out',
            disabled: !selectDisabled,
            getPopoverContainer: this.props.getPopoverContainer,
            popover: _react2.default.createElement(
              _Popover2.default,
              {
                className: 'date-range-popover',
                placement: 'bottom',
                offset: 10
              },
              _react2.default.createElement(
                'div',
                { className: 'float-left' },
                _react2.default.createElement(_Calendar2.default, {
                  value: start,
                  onChange: function onChange(start) {
                    return _this2.setState({ start: start });
                  },
                  max: end,
                  min: min
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'float-right' },
                _react2.default.createElement(_Calendar2.default, {
                  className: 'last-child',
                  value: end,
                  onChange: function onChange(end) {
                    return _this2.setState({ end: end });
                  },
                  max: max,
                  min: start
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
                    className: 'btn btn-primary',
                    onClick: function onClick() {
                      _this2.setState({
                        customActive: false
                      });

                      if (start !== _this2.props.start || end !== _this2.props.end) {
                        _onChange({ start: start, end: end });
                      } else {
                        _this2.setState({
                          selectValue: _this2.getSelectValue(start, end)
                        });
                      }
                    }
                  },
                  '\u786E\u5B9A'
                )
              )
            ),
            onActiveChange: function onActiveChange(active) {
              var _props2 = _this2.props,
                  start = _props2.start,
                  end = _props2.end;


              _this2.setState({
                customActive: false,
                start: start,
                end: end,
                selectValue: _this2.getSelectValue(start, end)
              });
            }
          },
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_Select2.default, {
              width: width,
              disabled: selectDisabled,
              options: options,
              value: selectValue,
              title: this.getTitle(),
              getPopoverContainer: this.props.getPopoverContainer,
              onChange: function onChange(value) {
                if (value !== 'custom') {
                  _onChange(_this2.getValue(value));
                } else {
                  _this2.setState({ selectValue: value });
                }
              }
            })
          )
        )
      );
    }
  }]);
  return DateRangeSelect;
}(_react2.default.PureComponent);

DateRangeSelect.propTypes = propTypes;
DateRangeSelect.defaultProps = defaultProps;

exports.default = DateRangeSelect;