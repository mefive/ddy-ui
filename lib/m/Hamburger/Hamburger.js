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

var _index = require('./style/index.scss');

var _index2 = _interopRequireDefault(_index);

var _Clickable = require('../../Clickable');

var _Clickable2 = _interopRequireDefault(_Clickable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  active: _propTypes2.default.bool,
  onActiveChange: _propTypes2.default.func
};

var defaultProps = {
  active: null,
  onActiveChange: function onActiveChange() {}
};

var Hamburger = function (_React$PureComponent) {
  (0, _inherits3.default)(Hamburger, _React$PureComponent);

  function Hamburger(props) {
    (0, _classCallCheck3.default)(this, Hamburger);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Hamburger.__proto__ || (0, _getPrototypeOf2.default)(Hamburger)).call(this, props));

    _this.state = {
      active: false
    };
    return _this;
  }

  (0, _createClass3.default)(Hamburger, [{
    key: 'getActive',
    value: function getActive() {
      return this.props.active == null ? this.state.active : this.props.active;
    }
  }, {
    key: 'setActive',
    value: function setActive(active) {
      if (this.props.active == null) {
        this.setState({ active: active });
      } else {
        this.props.onActiveChange(active);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var active = this.getActive();

      return _react2.default.createElement(
        _Clickable2.default,
        {
          onClick: function onClick() {
            return _this2.setActive(!active);
          }
        },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(_index2.default.hamburger, { active: active })
          },
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null),
          _react2.default.createElement('span', null)
        )
      );
    }
  }]);
  return Hamburger;
}(_react2.default.PureComponent);

Hamburger.propTypes = propTypes;
Hamburger.defaultProps = defaultProps;

exports.default = Hamburger;