'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _grid = require('../grid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  label: _propTypes2.default.string,
  id: _propTypes2.default.string,
  children: _propTypes2.default.node,
  required: _propTypes2.default.bool,

  labelCol: _propTypes2.default.shape({
    alignRight: _propTypes2.default.bool
  }),
  wrapperCol: _propTypes2.default.shape({})
};

var defaultProps = {
  label: '',
  id: null,
  children: null,
  required: false,

  labelCol: {
    alignRight: false,
    xs: {
      span: 12
    }
  },
  wrapperCol: {
    xs: {
      span: 12
    }
  }
};

var FormItem = function (_React$PureComponent) {
  (0, _inherits3.default)(FormItem, _React$PureComponent);

  function FormItem() {
    (0, _classCallCheck3.default)(this, FormItem);
    return (0, _possibleConstructorReturn3.default)(this, (FormItem.__proto__ || (0, _getPrototypeOf2.default)(FormItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(FormItem, [{
    key: 'getChildrenField',
    value: function getChildrenField(field) {
      var child = _react2.default.Children.only(this.props.children);
      return child.props[field];
    }
  }, {
    key: 'getLabelFor',
    value: function getLabelFor() {
      return this.props.id || this.getChildrenField('id');
    }
  }, {
    key: 'render',
    value: function render() {
      var error = this.getChildrenField('error');

      return _react2.default.createElement(
        _grid.Row,
        {
          className: (0, _classnames2.default)('form-item', {
            'has-error': error != null
          })
        },
        this.props.label != null && _react2.default.createElement(
          _grid.Col,
          (0, _extends3.default)({}, this.props.labelCol, {
            className: (0, _classnames2.default)('label-col', { right: this.props.labelCol.alignRight })
          }),
          _react2.default.createElement(
            'label',
            {
              htmlFor: this.getLabelFor()
            },
            this.props.required && _react2.default.createElement(
              'span',
              { className: 'required' },
              '*'
            ),
            this.props.label
          )
        ),
        _react2.default.createElement(
          _grid.Col,
          (0, _extends3.default)({}, this.props.wrapperCol, { className: 'form-item' }),
          this.props.children,
          error && _react2.default.createElement(
            'div',
            { className: 'error' },
            error
          )
        )
      );
    }
  }]);
  return FormItem;
}(_react2.default.PureComponent);

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;

exports.default = FormItem;