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

require('./style/index.scss');

var _Trigger = require('../Trigger');

var _Trigger2 = _interopRequireDefault(_Trigger);

var _Calendar = require('../Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Popover = require('../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  type: _propTypes2.default.string,
  className: _propTypes2.default.string,
  width: _propTypes2.default.number,
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  min: _propTypes2.default.string,
  max: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  getPopoverContainer: _propTypes2.default.func
};

var defaultProps = {
  type: _Calendar2.default.TYPE_DATE,
  className: null,
  width: null,
  min: null,
  max: null,
  disabled: false,
  getPopoverContainer: null,
  value: (0, _moment2.default)().format('YYYY-MM-DD'),
  onChange: function onChange() {
    return null;
  }
};

var DatePicker = function (_Component) {
  (0, _inherits3.default)(DatePicker, _Component);

  function DatePicker(props) {
    (0, _classCallCheck3.default)(this, DatePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).call(this, props));

    _this.state = {
      active: false
    };

    _this.changeActive = _this.changeActive.bind(_this);
    _this.select = _this.select.bind(_this);
    _this.moveBack = _this.moveBack.bind(_this);
    _this.moveNext = _this.moveNext.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(DatePicker, [{
    key: 'select',
    value: function select(value) {
      if (value !== this.props.value) {
        this.props.onChange(value);
      }

      this.changeActive(false);
    }
  }, {
    key: 'changeActive',
    value: function changeActive(active) {
      this.setState({ active: active });
    }
  }, {
    key: 'moveBack',
    value: function moveBack() {
      if (this.props.type === _Calendar2.default.TYPE_DATE) {
        var value = (0, _moment2.default)(this.props.value).subtract(1, 'd');

        if (this.props.min == null || value >= (0, _moment2.default)(this.props.min)) {
          this.props.onChange(value.format('YYYY-MM-DD'));
        }
      } else if (this.props.type === _Calendar2.default.TYPE_MONTH) {
        var _value = (0, _moment2.default)(this.props.value).subtract(1, 'M');

        if (this.props.min == null || _value >= (0, _moment2.default)(this.props.min)) {
          this.props.onChange(_value.format('YYYY-MM'));
        }
      }
    }
  }, {
    key: 'moveNext',
    value: function moveNext() {
      if (this.props.type === _Calendar2.default.TYPE_DATE) {
        var value = (0, _moment2.default)(this.props.value).add(1, 'd');

        if (this.props.max == null || value <= (0, _moment2.default)(this.props.max)) {
          this.props.onChange(value.format('YYYY-MM-DD'));
        }
      } else if (this.props.type === _Calendar2.default.TYPE_MONTH) {
        var _value2 = (0, _moment2.default)(this.props.value).add(1, 'M');

        if (this.props.max == null || _value2 <= (0, _moment2.default)(this.props.max)) {
          this.props.onChange(_value2.format('YYYY-MM'));
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('date-picker', (0, _defineProperty3.default)({}, this.props.className, this.props.className != null)),
          style: { width: this.props.width }
        },
        _react2.default.createElement('i', {
          className: 'icon icon-angle-left backward float-left',
          'aria-hidden': true,
          onClick: this.moveBack
        }),
        _react2.default.createElement('i', {
          className: 'icon icon-angle-right forward float-right',
          'aria-hidden': true,
          onClick: this.moveNext
        }),
        _react2.default.createElement(
          _Trigger2.default,
          {
            disabled: this.props.disabled,
            enterClassName: 'slide-down-in',
            leaveClassName: 'slide-down-out',
            active: this.state.active,
            getPopoverContainer: this.props.getPopoverContainer,
            popover: _react2.default.createElement(
              _Popover2.default,
              {
                placement: 'bottom',
                className: 'date-picker-popover',
                offset: 10
              },
              _react2.default.createElement(_Calendar2.default, {
                type: this.props.type,
                value: this.props.value,
                onChange: this.select,
                min: this.props.min,
                max: this.props.max
              })
            ),
            onActiveChange: this.changeActive
          },
          _react2.default.createElement(
            'div',
            {
              style: {
                marginLeft: '2.8em',
                marginRight: '2.8em'
              }
            },
            _react2.default.createElement('input', {
              type: 'text',
              value: this.props.value,
              readOnly: true,
              style: { width: '100%', cursor: 'initial' }
            })
          )
        )
      );
    }
  }]);
  return DatePicker;
}(_react.Component);

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

exports.default = DatePicker;