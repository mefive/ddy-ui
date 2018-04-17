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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_STYLE = 'default';
var FLIP_STYLE = 'flip';

var propTypes = {
  bgColor: _propTypes2.default.string,
  flipTrue: _propTypes2.default.string,
  flipFalse: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  style: _propTypes2.default.oneOf([DEFAULT_STYLE, FLIP_STYLE]),
  value: _propTypes2.default.bool,
  width: _propTypes2.default.number
};

var defaultProps = {
  bgColor: '#86d993',
  flipTrue: 'YES',
  flipFalse: 'NO',
  onChange: function onChange() {
    return null;
  },
  style: DEFAULT_STYLE,
  value: false,
  width: 60
};

var ToggleButton = function (_React$Component) {
  (0, _inherits3.default)(ToggleButton, _React$Component);

  function ToggleButton(props) {
    (0, _classCallCheck3.default)(this, ToggleButton);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ToggleButton.__proto__ || (0, _getPrototypeOf2.default)(ToggleButton)).call(this, props));

    _this.state = {
      value: props.value || false
    };
    return _this;
  }

  (0, _createClass3.default)(ToggleButton, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          bgColor = _props.bgColor,
          flipTrue = _props.flipTrue,
          flipFalse = _props.flipFalse,
          style = _props.style,
          width = _props.width;

      var value = this.props.value || this.state.value;

      switch (style) {
        case FLIP_STYLE:
          return _react2.default.createElement(
            'div',
            {
              id: 'toggle-flip-button',
              style: {
                boxShadow: value ? 'none' : null,
                height: width / 2,
                width: width
              },
              onClick: function onClick() {
                _this2.setState({
                  value: !value
                });
                _this2.props.onChange();
              }
            },
            _react2.default.createElement(
              'div',
              {
                className: 'true-button ' + (value ? 'active' : ''),
                style: {
                  lineHeight: width / 2 + 'px'
                }
              },
              flipTrue
            ),
            _react2.default.createElement(
              'div',
              {
                className: 'false-button ' + (value ? '' : 'active'),
                style: {
                  lineHeight: width / 2 + 'px'
                }
              },
              flipFalse
            )
          );
        case DEFAULT_STYLE:
        default:
          return _react2.default.createElement(
            'div',
            {
              id: 'toggle-button',
              style: {
                boxShadow: value ? 'none' : null,
                height: width / 2,
                width: width
              },
              onClick: function onClick() {
                _this2.setState({
                  value: !value
                });
                _this2.props.onChange();
              }
            },
            _react2.default.createElement(
              'div',
              {
                className: 'button-bg',
                style: {
                  backgroundColor: value ? bgColor : null
                }
              },
              _react2.default.createElement('div', {
                className: 'button',
                style: {
                  left: value ? width / 2 : null
                }
              })
            )
          );
      }
    }
  }]);
  return ToggleButton;
}(_react2.default.Component);

ToggleButton.propTypes = propTypes;
ToggleButton.defaultProps = defaultProps;
ToggleButton.DEFAULT_STYLE = DEFAULT_STYLE;
ToggleButton.FLIP_STYLE = FLIP_STYLE;

exports.default = ToggleButton;