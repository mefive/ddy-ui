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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  onSubmit: _propTypes2.default.func
};

var defaultProps = {
  className: null,
  children: null,
  onSubmit: function onSubmit() {}
};

var Form = function (_React$PureComponent) {
  (0, _inherits3.default)(Form, _React$PureComponent);

  function Form() {
    (0, _classCallCheck3.default)(this, Form);
    return (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).apply(this, arguments));
  }

  (0, _createClass3.default)(Form, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'form',
        {
          className: (0, _classnames2.default)('form', this.props.className),
          onSubmit: function onSubmit(e) {
            e.preventDefault();
            _this2.props.onSubmit();
          }
        },
        _react2.default.createElement(
          'div',
          null,
          this.props.children
        ),
        _react2.default.createElement('input', { type: 'submit', className: 'hidden' })
      );
    }
  }]);
  return Form;
}(_react2.default.PureComponent);

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

exports.default = Form;