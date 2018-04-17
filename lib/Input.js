'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _deleteProperty = require('babel-runtime/core-js/reflect/delete-property');

var _deleteProperty2 = _interopRequireDefault(_deleteProperty);

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  value: _propTypes2.default.any,
  onChange: _propTypes2.default.func,
  type: _propTypes2.default.string,
  autoFocus: _propTypes2.default.bool,
  format: _propTypes2.default.func,
  onEnter: _propTypes2.default.func
};

var defaultProps = {
  autoFocus: false,
  onChange: function onChange() {
    return null;
  },
  onEnter: function onEnter() {}
};

function isCheckable(type) {
  return ['checkbox', 'radio'].indexOf(type) !== -1;
}

function isFile(type) {
  return type === 'file';
}

var Input = function (_React$PureComponent) {
  (0, _inherits3.default)(Input, _React$PureComponent);

  function Input() {
    (0, _classCallCheck3.default)(this, Input);
    return (0, _possibleConstructorReturn3.default)(this, (Input.__proto__ || (0, _getPrototypeOf2.default)(Input)).apply(this, arguments));
  }

  (0, _createClass3.default)(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var el = _reactDom2.default.findDOMNode(this);

      el.indeterminate = this.props.indeterminate && this.props.type === 'checkbox';

      if (this.props.autoFocus) {
        el.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      _reactDom2.default.findDOMNode(this).indeterminate = nextProps.indeterminate && nextProps.type === 'checkbox';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          type = _props.type,
          value = _props.value,
          _onChange = _props.onChange,
          format = _props.format;


      var newProps = (0, _omit2.default)(this.props, 'onEnter');

      if (!type) {
        newProps.type = 'text';
      }

      (0, _deleteProperty2.default)(newProps, 'indeterminate');

      return _react2.default.createElement('input', (0, _extends3.default)({}, newProps, {
        onChange: function onChange(e) {
          var value = void 0;
          var target = e.target;


          if (isCheckable(type)) {
            value = target.checked;
          } else if (isFile(type)) {
            value = target.files ? target.files[0]
            // ie9
            : target.value;
          } else {
            value = target.value;
          }

          if (typeof format === 'function') {
            value = format(value);
          }

          _onChange(value, e);
        },
        value: isCheckable(type) ? '' : value == null ? '' : value,
        checked: isCheckable(type) ? value : null,
        onKeyPress: function onKeyPress(e) {
          if (e.charCode === 13) {
            _this2.props.onEnter();
          }
        }
      }));
    }
  }]);
  return Input;
}(_react2.default.PureComponent);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

exports.default = Input;