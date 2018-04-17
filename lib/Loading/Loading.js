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

var _index = require('./style/index.scss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  children: _propTypes2.default.node
};

var defaultProps = {
  children: null
};

var Loading = function (_React$PureComponent) {
  (0, _inherits3.default)(Loading, _React$PureComponent);

  function Loading() {
    (0, _classCallCheck3.default)(this, Loading);
    return (0, _possibleConstructorReturn3.default)(this, (Loading.__proto__ || (0, _getPrototypeOf2.default)(Loading)).apply(this, arguments));
  }

  (0, _createClass3.default)(Loading, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.pin();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_ref) {
      var children = _ref.children;

      if (children !== this.props.children) {
        this.pin();
      }
    }
  }, {
    key: 'pin',
    value: function pin() {
      var message = this.message;
      var clientWidth = message.clientWidth,
          clientHeight = message.clientHeight;


      message.style.marginLeft = -(0.5 * clientWidth) + 'px';
      message.style.marginTop = -(0.5 * clientHeight) + 'px';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: _index2.default.container },
        _react2.default.createElement(
          'span',
          {
            ref: function ref(el) {
              _this2.message = el;
            },
            className: _index2.default.message
          },
          this.props.children
        )
      );
    }
  }]);
  return Loading;
}(_react2.default.PureComponent);

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

exports.default = Loading;