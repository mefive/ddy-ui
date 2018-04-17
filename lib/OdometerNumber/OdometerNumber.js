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

var _odometer = require('odometer');

var _odometer2 = _interopRequireDefault(_odometer);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  value: _propTypes2.default.number,
  unit: _propTypes2.default.string
};

var defaultProps = {
  value: null,
  unit: null
};

var OdometerNumber = function (_React$Component) {
  (0, _inherits3.default)(OdometerNumber, _React$Component);

  function OdometerNumber() {
    (0, _classCallCheck3.default)(this, OdometerNumber);
    return (0, _possibleConstructorReturn3.default)(this, (OdometerNumber.__proto__ || (0, _getPrototypeOf2.default)(OdometerNumber)).apply(this, arguments));
  }

  (0, _createClass3.default)(OdometerNumber, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.od = new _odometer2.default({
        el: this.target,
        value: this.props.value,
        format: '(ddd).ddd',
        theme: 'default',
        duration: 1000
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.value;


      if (value !== this.props.value) {
        if (this.od) {
          this.od.update(value);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.od = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement('span', { ref: function ref(el) {
            _this2.target = el;
          } }),
        this.props.unit && _react2.default.createElement(
          'span',
          { style: { verticalAlign: 'middle', marginLeft: 5 } },
          this.props.unit
        )
      );
    }
  }]);
  return OdometerNumber;
}(_react2.default.Component);

OdometerNumber.propTypes = propTypes;
OdometerNumber.defaultProps = defaultProps;

exports.default = OdometerNumber;