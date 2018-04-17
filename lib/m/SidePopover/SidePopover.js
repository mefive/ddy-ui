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

require('./style/index.scss');

var _Animate = require('../../Animate');

var _Animate2 = _interopRequireDefault(_Animate);

var _Portal = require('../../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  visible: _propTypes2.default.bool,
  onClose: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node
};

var defaultProps = {
  visible: false,
  children: null
};

var SideNav = function (_React$PureComponent) {
  (0, _inherits3.default)(SideNav, _React$PureComponent);

  function SideNav(props) {
    (0, _classCallCheck3.default)(this, SideNav);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SideNav.__proto__ || (0, _getPrototypeOf2.default)(SideNav)).call(this, props));

    _this.onTouchStart = _this.onTouchStart.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(SideNav, [{
    key: 'onTouchStart',
    value: function onTouchStart(e) {
      if (!this.content.contains(e.target)) {
        e.preventDefault();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _Animate2.default,
        null,
        this.props.visible && _react2.default.createElement(
          _Portal2.default,
          null,
          _react2.default.createElement(
            'div',
            { className: 'side-popover' },
            _react2.default.createElement('div', {
              className: 'side-popover-mask',
              onClick: this.props.onClose,
              'aria-hidden': true
            }),
            _react2.default.createElement(
              'div',
              {
                className: 'side-popover-content',
                ref: function ref(el) {
                  _this2.content = el;
                }
              },
              this.props.children
            )
          )
        )
      );
    }
  }]);
  return SideNav;
}(_react2.default.PureComponent);

SideNav.propTypes = propTypes;
SideNav.defaultProps = defaultProps;

exports.default = SideNav;