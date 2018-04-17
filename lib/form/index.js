'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormItem = exports.Form = exports.withForm = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormItem = require('./FormItem');

var _FormItem2 = _interopRequireDefault(_FormItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withForm = function withForm(WrappedComponent) {
  var propTypes = {
    dataSource: _propTypes2.default.shape({}),
    onChange: _propTypes2.default.func,
    onSubmit: _propTypes2.default.func
  };

  var defaultProps = {
    dataSource: {},
    onChange: function onChange() {},
    onSubmit: function onSubmit() {}
  };

  var DecoratedForm = function (_React$PureComponent) {
    (0, _inherits3.default)(DecoratedForm, _React$PureComponent);

    function DecoratedForm(props) {
      (0, _classCallCheck3.default)(this, DecoratedForm);

      var _this = (0, _possibleConstructorReturn3.default)(this, (DecoratedForm.__proto__ || (0, _getPrototypeOf2.default)(DecoratedForm)).call(this, props));

      _this.rules = {};

      _this.getFieldDecorator = _this.getFieldDecorator.bind(_this);
      _this.validate = _this.validate.bind(_this);

      _this.state = {
        errors: {}
      };
      return _this;
    }

    (0, _createClass3.default)(DecoratedForm, [{
      key: 'getWrappedInstance',
      value: function getWrappedInstance() {
        return this.wrappedInstance;
      }
    }, {
      key: 'getFieldDecorator',
      value: function getFieldDecorator(name) {
        var _this2 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return function (Item) {
          var error = _this2.state.errors[name];
          _this2.rules[name] = options.rules;

          return _react2.default.cloneElement(Item, (0, _extends3.default)({}, Item.props, {
            value: _this2.props.dataSource[name],
            onChange: function onChange(value) {
              _this2.setState({ errors: (0, _omit2.default)(_this2.state.errors, [name]) });
              _this2.props.onChange(name, value);
            },
            error: error
          }));
        };
      }
    }, {
      key: 'validate',
      value: function validate(field) {
        var _this3 = this;

        var errors = {};

        var fields = void 0;

        if (field == null) {
          fields = (0, _keys2.default)(this.rules);
        } else if (typeof field === 'string') {
          fields = [field];
        } else {
          fields = field;
        }

        var addToError = function addToError(name, message) {
          if (name in errors) {
            errors[name] = errors[name] + ', ' + message;
          } else {
            errors[name] = message;
          }
        };

        fields.forEach(function (name) {
          var rules = _this3.rules[name];

          if (rules) {
            var value = _this3.props.dataSource[name];

            for (var i = 0; i < rules.length; i += 1) {
              var rule = rules[i];

              if (rule.required && (value == null || value === '' || typeof value === 'string' && value.trim() === '')) {
                errors[name] = rule.message || '必填项不能为空';
                break;
              }

              if ((0, _isFunction2.default)(rule.validator)) {
                if (!rule.validator(value)) {
                  addToError(name, rule.message || '不符合自定义规则');
                }
              } else if (rule.maxLength != null && value.length > rule.maxLength) {
                addToError(name, rule.message || '\u4E0D\u5F97\u5927\u4E8E' + rule.maxLength + '\u4E2A\u5B57\u7B26');
              } else if (rule.minLength != null && value.length < rule.minLength) {
                addToError(name, rule.message || '\u4E0D\u5F97\u5C11\u4E8E' + rule.minLength + '\u4E2A\u5B57\u7B26');
              } else if (rules.regex != null && !rules.regex.test(value)) {
                addToError(name, rule.message || '格式不正确');
              }
            }
          }
        });

        this.setState({ errors: errors });

        return (0, _keys2.default)(errors).length === 0;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, this.props, {
          validate: this.validate,
          getFieldDecorator: this.getFieldDecorator,
          errors: this.state.errors,
          ref: function ref(el) {
            _this4.wrappedInstance = el;
          }
        }));
      }
    }]);
    return DecoratedForm;
  }(_react2.default.PureComponent);

  DecoratedForm.propTypes = propTypes;
  DecoratedForm.defaultProps = defaultProps;

  return DecoratedForm;
};

exports.withForm = withForm;
exports.Form = _Form2.default;
exports.FormItem = _FormItem2.default;