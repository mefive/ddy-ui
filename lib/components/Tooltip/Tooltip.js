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

var _Trigger = require('../Trigger');

var _Trigger2 = _interopRequireDefault(_Trigger);

var _Popover = require('../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  title: _propTypes2.default.string,
  placement: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  style: _propTypes2.default.shape({}),
  children: _propTypes2.default.node,
  defaultActive: _propTypes2.default.bool,
  getPopoverContainer: _propTypes2.default.func,
  action: _propTypes2.default.string,
  onActiveChange: _propTypes2.default.func,
  renderPopover: _propTypes2.default.func
};

var defaultProps = {
  title: null,
  placement: _Popover2.default.placement.TOP,
  disabled: false,
  className: null,
  style: null,
  children: null,
  defaultActive: null,
  getPopoverContainer: null,
  action: 'hover',
  onActiveChange: function onActiveChange() {},
  renderPopover: null
};

var Tooltip = function (_React$PureComponent) {
  (0, _inherits3.default)(Tooltip, _React$PureComponent);

  function Tooltip() {
    (0, _classCallCheck3.default)(this, Tooltip);
    return (0, _possibleConstructorReturn3.default)(this, (Tooltip.__proto__ || (0, _getPrototypeOf2.default)(Tooltip)).apply(this, arguments));
  }

  (0, _createClass3.default)(Tooltip, [{
    key: 'render',
    value: function render() {
      if (this.props.disabled || !this.props.title && this.props.renderPopover == null) {
        return this.props.children;
      }

      return _react2.default.createElement(
        _Trigger2.default,
        {
          action: this.props.action,
          defaultActive: this.props.defaultActive,
          popover: _react2.default.createElement(
            _Popover2.default,
            {
              className: (0, _classnames2.default)('tooltip', this.props.className),
              style: this.props.style,
              placement: this.props.placement
            },
            this.props.renderPopover == null ? _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: this.props.title } }) : this.props.renderPopover()
          ),
          enterClassName: 'scale-in',
          leaveClassName: 'scale-out',
          enterDuration: 100,
          leaveDuration: 100,
          getPopoverContainer: this.props.getPopoverContainer,
          onActiveChange: this.props.onActiveChange
        },
        this.props.children
      );
    }
  }]);
  return Tooltip;
}(_react2.default.PureComponent);

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

exports.default = Tooltip;