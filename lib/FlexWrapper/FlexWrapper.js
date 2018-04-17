'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _index = require('./style/index.scss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  id: _propTypes2.default.string,
  children: _propTypes2.default.node,
  bottom: _propTypes2.default.number,
  className: _propTypes2.default.string,
  absolute: _propTypes2.default.bool,
  style: _propTypes2.default.shape({}),
  isFixedHeight: _propTypes2.default.bool
};

var defaultProps = {
  id: null,
  children: null,
  bottom: 0,
  className: null,
  absolute: false,
  style: {},
  isFixedHeight: true
};

var FlexWrapper = function (_React$PureComponent) {
  (0, _inherits3.default)(FlexWrapper, _React$PureComponent);

  function FlexWrapper(props) {
    (0, _classCallCheck3.default)(this, FlexWrapper);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FlexWrapper.__proto__ || (0, _getPrototypeOf2.default)(FlexWrapper)).call(this, props));

    _this.state = {
      absoluteTop: null
    };
    _this.resizeContainer = _this.resizeContainer.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(FlexWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resizeContainer();
      window.addEventListener('resize', this.resizeContainer);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resizeContainer);
    }
  }, {
    key: 'resizeContainer',
    value: function resizeContainer() {
      if (this.container == null) {
        return;
      }

      if (this.props.absolute) {
        if (this.state.absoluteTop != null) {
          return;
        }

        this.setState({ absoluteTop: this.container.offsetTop });
        return;
      }

      var _container$getBoundin = this.container.getBoundingClientRect(),
          top = _container$getBoundin.top;

      this.container.style[this.props.isFixedHeight ? 'height' : 'minHeight'] = window.innerHeight - top - this.props.bottom + 'px';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          id: this.props.id,
          ref: function ref(el) {
            _this2.container = el;
          },
          className: (0, _classnames2.default)(this.props.className, { 'p-relative': this.props.absolute }, (0, _defineProperty3.default)({}, _index2.default.absolute, this.props.absolute && this.state.absoluteTop != null)),
          style: (0, _extends3.default)({}, this.props.style, {
            top: this.state.absoluteTop,
            bottom: this.props.absolute ? this.props.bottom : null
          })
        },
        this.props.children
      );
    }
  }]);
  return FlexWrapper;
}(_react2.default.PureComponent);

FlexWrapper.propTypes = propTypes;
FlexWrapper.defaultProps = defaultProps;

exports.default = FlexWrapper;