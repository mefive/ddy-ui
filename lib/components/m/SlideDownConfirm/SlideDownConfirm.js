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

var _SlideDownPopover = require('../SlideDownPopover');

var _SlideDownPopover2 = _interopRequireDefault(_SlideDownPopover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  visible: _propTypes2.default.bool,
  onClose: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  visible: false,
  onClose: function onClose() {},
  onSubmit: function onSubmit() {},
  children: null
};

var SlideDownConfirm = function (_React$PureComponent) {
  (0, _inherits3.default)(SlideDownConfirm, _React$PureComponent);

  function SlideDownConfirm() {
    (0, _classCallCheck3.default)(this, SlideDownConfirm);
    return (0, _possibleConstructorReturn3.default)(this, (SlideDownConfirm.__proto__ || (0, _getPrototypeOf2.default)(SlideDownConfirm)).apply(this, arguments));
  }

  (0, _createClass3.default)(SlideDownConfirm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _SlideDownPopover2.default,
        { visible: this.props.visible },
        _react2.default.createElement(
          'div',
          {
            className: 'p-absolute',
            style: {
              bottom: 40,
              top: 0,
              left: 0,
              right: 0,
              overFlowY: 'auto'
            }
          },
          this.props.children
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'p-absolute text-center border-0 border-primary',
            style: {
              bottom: 0,
              left: 0,
              right: 0,
              lineHeight: '40px'
            }
          },
          _react2.default.createElement(
            'div',
            {
              className: 'text-primary d-inline-block',
              'aria-hidden': true,
              style: { width: '50%' },
              onClick: this.props.onClose
            },
            '\u53D6\u6D88'
          ),
          _react2.default.createElement(
            'div',
            {
              'aria-hidden': true,
              className: 'text-white bg-primary d-inline-block',
              style: { width: '50%' },
              onClick: this.props.onSubmit
            },
            '\u786E\u8BA4'
          )
        )
      );
    }
  }]);
  return SlideDownConfirm;
}(_react2.default.PureComponent);

SlideDownConfirm.propTypes = propTypes;
SlideDownConfirm.defaultProps = defaultProps;

exports.default = SlideDownConfirm;