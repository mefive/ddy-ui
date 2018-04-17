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

var _StaticCard = require('./StaticCard');

var _StaticCard2 = _interopRequireDefault(_StaticCard);

var _AnimatedCard = require('./AnimatedCard');

var _AnimatedCard2 = _interopRequireDefault(_AnimatedCard);

var _index = require('./style/index.scss');

var _index2 = _interopRequireDefault(_index);

require('./style/flip.sass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  value: _propTypes2.default.number
};

var defaultProps = {
  className: null,
  value: 0
};

var NumberFlip = function (_React$PureComponent) {
  (0, _inherits3.default)(NumberFlip, _React$PureComponent);

  function NumberFlip(props) {
    (0, _classCallCheck3.default)(this, NumberFlip);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NumberFlip.__proto__ || (0, _getPrototypeOf2.default)(NumberFlip)).call(this, props));

    _this.state = {
      value: _this.props.value,
      lastValue: _this.props.value,
      shuffle: false
    };
    return _this;
  }

  (0, _createClass3.default)(NumberFlip, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var value = _ref.value;

      if (value !== this.props.value) {
        this.setState({
          value: value,
          lastValue: this.props.value,
          shuffle: !this.state.shuffle
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      console.log('render');

      var _state = this.state,
          lastValue = _state.lastValue,
          value = _state.value,
          shuffle = _state.shuffle;

      // shuffle digits

      var digit1 = shuffle ? lastValue : value;
      var digit2 = !shuffle ? lastValue : value;

      // shuffle animations
      var animation1 = shuffle ? 'fold' : 'unfold';
      var animation2 = !shuffle ? 'fold' : 'unfold';

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(el) {
            _this2.container = el;
          },
          className: (0, _classnames2.default)(_index2.default.container, this.props.className)
        },
        _react2.default.createElement(
          'div',
          { className: 'flipUnitContainer' },
          _react2.default.createElement(_StaticCard2.default, { position: 'upperCard', digit: this.state.value }),
          _react2.default.createElement(_StaticCard2.default, { position: 'lowerCard', digit: this.state.lastValue }),
          _react2.default.createElement(_AnimatedCard2.default, { position: 'first', digit: digit1, animation: animation1 }),
          _react2.default.createElement(_AnimatedCard2.default, { position: 'second', digit: digit2, animation: animation2 })
        )
      );
    }
  }]);
  return NumberFlip;
}(_react2.default.PureComponent);

NumberFlip.propTypes = propTypes;
NumberFlip.defaultProps = defaultProps;

exports.default = NumberFlip;