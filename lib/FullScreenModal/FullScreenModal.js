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

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _index = require('./style/index.scss');

var _index2 = _interopRequireDefault(_index);

var _Portal = require('../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Animate = require('../Animate/Animate');

var _Animate2 = _interopRequireDefault(_Animate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  visible: _propTypes2.default.bool,
  onClose: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  visible: false,
  onClose: function onClose() {},
  children: null
};

var FullScreenModal = function (_React$PureComponent) {
  (0, _inherits3.default)(FullScreenModal, _React$PureComponent);

  function FullScreenModal(props) {
    (0, _classCallCheck3.default)(this, FullScreenModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FullScreenModal.__proto__ || (0, _getPrototypeOf2.default)(FullScreenModal)).call(this, props));

    _this.onKeyPress = _this.onKeyPress.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(FullScreenModal, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var visible = _ref.visible;

      if (visible && !this.props.visible) {
        document.addEventListener('keydown', this.onKeyPress);
      } else if (!visible && this.props.visible) {
        document.removeEventListener('keydown', this.onKeyPress);
      }
    }
  }, {
    key: 'onKeyPress',
    value: function onKeyPress(e) {
      e.preventDefault();

      var code = (0, _keycode2.default)(e);

      if (code === 'esc') {
        this.props.onClose();
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
            { className: _index2.default.modal },
            _react2.default.createElement('div', { className: _index2.default.mask }),
            _react2.default.createElement(
              'div',
              { className: _index2.default.body },
              this.props.children
            ),
            _react2.default.createElement(
              'div',
              {
                className: _index2.default.close,
                'aria-hidden': true,
                onClick: function onClick() {
                  return _this2.props.onClose();
                }
              },
              _react2.default.createElement('i', { className: 'icon icon-times' })
            )
          )
        )
      );
    }
  }]);
  return FullScreenModal;
}(_react2.default.PureComponent);

FullScreenModal.propTypes = propTypes;
FullScreenModal.defaultProps = defaultProps;

exports.default = FullScreenModal;