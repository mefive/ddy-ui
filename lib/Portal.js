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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  getContainer: _propTypes2.default.func,
  onContainerChange: _propTypes2.default.func,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};

var defaultProps = {
  getContainer: null,
  onContainerChange: function onContainerChange() {
    return null;
  },
  children: null,
  className: null
};

var Portal = function (_React$PureComponent) {
  (0, _inherits3.default)(Portal, _React$PureComponent);

  function Portal(props) {
    (0, _classCallCheck3.default)(this, Portal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Portal.__proto__ || (0, _getPrototypeOf2.default)(Portal)).call(this, props));

    var getContainer = _this.props.getContainer;


    if (getContainer) {
      _this.container = getContainer();
    } else {
      _this.container = document.createElement('div');
      document.body.appendChild(_this.container);
    }
    return _this;
  }

  (0, _createClass3.default)(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onContainerChange(this.container.parentNode);
    }
  }, {
    key: 'render',
    value: function render() {
      var children = _react2.default.cloneElement(this.props.children, {
        className: (0, _classnames2.default)(this.props.children.props ? this.props.children.props.className : null, this.props.className)
      });

      return _reactDom2.default.createPortal(children, this.container);
    }
  }]);
  return Portal;
}(_react2.default.PureComponent);

Portal.propTypes = propTypes;
Portal.defaultProps = defaultProps;

exports.default = Portal;