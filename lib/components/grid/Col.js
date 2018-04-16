'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var layoutTypes = _propTypes2.default.oneOfType([_propTypes2.default.shape({
  span: _propTypes2.default.number,
  offset: _propTypes2.default.number
}), _propTypes2.default.number]);

var propTypes = {
  /* eslint-disable */
  xs: layoutTypes,
  sm: layoutTypes,
  md: layoutTypes,
  lg: layoutTypes,
  xl: layoutTypes,
  xxl: layoutTypes,
  /* eslint-enable */

  span: _propTypes2.default.number,
  offset: _propTypes2.default.number,
  className: _propTypes2.default.string,
  gutter: _propTypes2.default.number,
  children: _propTypes2.default.node
};

var defaultProps = {
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  xxl: null,

  span: null,
  offset: null,
  className: null,
  gutter: null,
  children: null
};

var Col = function (_React$PureComponent) {
  (0, _inherits3.default)(Col, _React$PureComponent);

  function Col() {
    (0, _classCallCheck3.default)(this, Col);
    return (0, _possibleConstructorReturn3.default)(this, (Col.__proto__ || (0, _getPrototypeOf2.default)(Col)).apply(this, arguments));
  }

  (0, _createClass3.default)(Col, [{
    key: 'getBreakPointClassNames',
    value: function getBreakPointClassNames() {
      var breakPoints = (0, _pick2.default)(this.props, ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
      var classes = {};

      var _props = this.props,
          span = _props.span,
          offset = _props.offset;


      if (span != null || offset != null) {
        classes['col-md-' + span] = span != null;
        classes['col-md-offset-' + offset] = offset != null;
      } else {
        (0, _keys2.default)(breakPoints).forEach(function (key) {
          var breakPoint = breakPoints[key];

          if (typeof breakPoint === 'number') {
            classes['col-' + key + '-' + breakPoint] = true;
          } else if (breakPoint != null) {
            classes['col-' + key + '-' + breakPoint.span] = breakPoint.span != null;
            classes['col-' + key + '-offset-' + breakPoint.offset] = breakPoint.offset != null;
          }
        });
      }
      return (0, _classnames2.default)(classes);
    }
  }, {
    key: 'render',
    value: function render() {
      var gutter = this.props.gutter;


      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(this.props.className, this.getBreakPointClassNames()),
          style: {
            paddingLeft: gutter == null ? null : gutter / 2,
            paddingRight: gutter == null ? null : gutter / 2
          }
        },
        this.props.children
      );
    }
  }]);
  return Col;
}(_react2.default.PureComponent);

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

exports.default = Col;