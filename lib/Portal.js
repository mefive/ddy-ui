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

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var propTypes = {
  getContainer: _propTypes2.default.func,
  onContainerChange: _propTypes2.default.func,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};
/* eslint-enable */

var defaultProps = {
  getContainer: null,
  onContainerChange: function onContainerChange() {
    return null;
  },
  children: null,
  className: null
};

var Portal = function (_Component) {
  (0, _inherits3.default)(Portal, _Component);

  function Portal() {
    (0, _classCallCheck3.default)(this, Portal);
    return (0, _possibleConstructorReturn3.default)(this, (Portal.__proto__ || (0, _getPrototypeOf2.default)(Portal)).apply(this, arguments));
  }

  (0, _createClass3.default)(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var getContainer = this.props.getContainer;


      if (getContainer) {
        this.container = getContainer();
      } else {
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.renderInner();
      }

      this.props.onContainerChange(this.container.parentNode);

      if (this.props.children != null) {
        this.renderInner();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderInner();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var container = this.container;

      (0, _reactDom.unmountComponentAtNode)(container);
      if (container.parentNode != null) {
        container.parentNode.removeChild(container);
      }
      this.container = null;
    }
  }, {
    key: 'renderInner',
    value: function renderInner() {
      (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, _react2.default.cloneElement(this.props.children, {
        className: (0, _classnames2.default)(this.props.children.props ? this.props.children.props.className : null, this.props.className)
      }), this.container);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Portal;
}(_react.Component);

Portal.propTypes = propTypes;
Portal.defaultProps = defaultProps;

exports.default = Portal;