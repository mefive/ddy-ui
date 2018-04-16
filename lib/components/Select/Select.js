'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

require('./style/index.scss');

var _Trigger = require('../Trigger');

var _Trigger2 = _interopRequireDefault(_Trigger);

var _index = require('../Popover/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.any,
    title: _propTypes2.default.string.isRequired
  })),
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.bool]),
  width: _propTypes2.default.number,
  optionsHeight: _propTypes2.default.number,
  getPopoverContainer: _propTypes2.default.func,
  placement: _propTypes2.default.string,
  title: _propTypes2.default.string,
  defaultTitle: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  popoverClassName: _propTypes2.default.string,
  renderTitle: _propTypes2.default.func,
  renderOption: _propTypes2.default.func,
  multiple: _propTypes2.default.bool,
  max: _propTypes2.default.number
};

var defaultProps = {
  width: null,
  className: null,
  optionsHeight: 200,
  defaultTitle: '请选择',
  onChange: function onChange() {
    return null;
  },
  placement: 'bottom',
  getPopoverContainer: null,
  value: null,
  options: [],
  disabled: false,
  title: null,
  popoverClassName: null,
  renderTitle: null,
  renderOption: null,
  multiple: false,
  max: null
};

var Select = function (_React$PureComponent) {
  (0, _inherits3.default)(Select, _React$PureComponent);

  function Select(props) {
    (0, _classCallCheck3.default)(this, Select);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this, props));

    _this.state = {
      active: false,
      triggerWidth: 0,
      multipleSelection: []
    };

    _this.confirmSelection = _this.confirmSelection.bind(_this);
    _this.setActive = _this.setActive.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Select, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setTriggerWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, _ref) {
      var active = _ref.active;

      if (this.state.active !== active && !this.props.multiple) {
        if (this.selectedElement) {
          this.optionsWrapper.scrollTop = this.selectedElement.offsetTop;
        }
      }
    }
  }, {
    key: 'setActive',
    value: function setActive(active) {
      var _this2 = this;

      var old = this.state.active;

      this.setState({ active: active }, function () {
        if (active && !old) {
          if (_this2.props.multiple) {
            _this2.setState({ multipleSelection: _this2.props.value || [] });
          }

          _this2.setTriggerWidth();
        }
      });
    }
  }, {
    key: 'setTriggerWidth',
    value: function setTriggerWidth() {
      this.setState({
        triggerWidth: this.trigger.offsetWidth
      });
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {
      if (this.props.renderTitle) {
        return this.props.renderTitle();
      }

      var _props = this.props,
          value = _props.value,
          options = _props.options,
          multiple = _props.multiple,
          defaultTitle = _props.defaultTitle;


      var option = void 0;
      var title = void 0;

      if (multiple && value) {
        option = options.filter(function (i) {
          return value.indexOf(i.value) !== -1;
        });

        title = option.map(function (i) {
          return i.title;
        }).join(',');
      } else {
        option = options.find(function (i) {
          return i.value === value;
        });
        title = option ? option.title : '';
      }

      return title || defaultTitle;
    }
  }, {
    key: 'select',
    value: function select(value) {
      var _props2 = this.props,
          old = _props2.value,
          onChange = _props2.onChange,
          multiple = _props2.multiple;


      if (!multiple) {
        if (value !== old) {
          onChange(value);
        }

        this.setActive(false);
      } else {
        var multipleSelection = [].concat((0, _toConsumableArray3.default)(this.state.multipleSelection));
        var index = multipleSelection.indexOf(value);

        if (index === -1) {
          var max = this.props.max;

          if (max == null || multipleSelection.length < max) {
            multipleSelection.push(value);
          }
        } else {
          multipleSelection.splice(index, 1);
        }

        this.setState({ multipleSelection: multipleSelection });
      }
    }
  }, {
    key: 'confirmSelection',
    value: function confirmSelection() {
      var multipleSelection = this.state.multipleSelection;


      if (!(0, _isEqual2.default)(multipleSelection, this.props.value)) {
        this.props.onChange([].concat((0, _toConsumableArray3.default)(multipleSelection)));
      }

      this.setState({ multipleSelection: [] });
      this.setActive(false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _Trigger2.default,
        {
          active: this.state.active,
          disabled: this.props.disabled,
          getPopoverContainer: this.props.getPopoverContainer,
          enterClassName: this.props.placement === 'bottom' ? 'slide-down-in' : 'slide-up-in',
          leaveClassName: this.props.placement === 'bottom' ? 'slide-down-out' : 'slide-up-out',
          popover: _react2.default.createElement(
            _index2.default,
            {
              placement: this.props.placement,
              offset: 5,
              className: (0, _classnames2.default)('select-popup text-sm', (0, _defineProperty3.default)({}, this.props.popoverClassName, !!this.props.popoverClassName))
            },
            _react2.default.createElement(
              'div',
              {
                style: {
                  height: this.props.multiple ? this.props.optionsHeight : null,
                  maxHeight: this.props.multiple ? null : this.props.optionsHeight,
                  width: this.state.triggerWidth
                }
              },
              _react2.default.createElement(
                'div',
                {
                  className: 'wrapper',
                  style: {
                    height: this.props.multiple ? this.props.optionsHeight - 32 : null,
                    maxHeight: this.props.multiple ? null : this.props.optionsHeight
                  },
                  ref: function ref(el) {
                    _this3.optionsWrapper = el;
                  }
                },
                _react2.default.createElement(
                  'ul',
                  null,
                  this.props.options != null && this.props.options.map(function (i) {
                    return _react2.default.createElement(
                      'li',
                      {
                        key: i.value,
                        className: (0, _classnames2.default)({
                          active: _this3.props.multiple ? _this3.state.multipleSelection.indexOf(i.value) !== -1 : i.value === _this3.props.value
                        }),
                        onClick: function onClick() {
                          return _this3.select(i.value);
                        },
                        'aria-hidden': true,
                        ref: function ref(el) {
                          if (i.value === _this3.props.value) {
                            _this3.selectedElement = el;
                          }
                        }
                      },
                      _this3.props.multiple && i.value === _this3.props.value && _react2.default.createElement('i', { className: 'icon icon-check' }),
                      _this3.props.renderOption ? _this3.props.renderOption(i.value) : i.title
                    );
                  })
                )
              ),
              this.props.multiple && _react2.default.createElement(
                'div',
                { className: 'actions' },
                _react2.default.createElement(
                  'div',
                  {
                    className: 'btn btn-sm btn-primary',
                    onClick: this.confirmSelection,
                    'aria-hidden': true
                  },
                  '\u786E\u5B9A'
                )
              )
            )
          ),
          onActiveChange: this.setActive
        },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('select', (0, _defineProperty3.default)({}, this.props.className, this.props.className != null), { disabled: this.props.disabled }),
            style: { width: this.props.width || null }
          },
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)('select-trigger', { active: this.state.active }),
              ref: function ref(el) {
                _this3.trigger = el;
              }
            },
            this.props.title || this.getTitle(),
            _react2.default.createElement(
              'div',
              { className: 'trigger-icon' },
              _react2.default.createElement('i', { className: 'icon icon-caret-down' })
            )
          )
        )
      );
    }
  }]);
  return Select;
}(_react2.default.PureComponent);

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

exports.default = Select;