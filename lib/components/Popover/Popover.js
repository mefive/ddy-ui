'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

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

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes2.default.string,
  placement: _propTypes2.default.string,
  container: _propTypes2.default.instanceOf(Node),
  anchor: _propTypes2.default.instanceOf(Node),
  offset: _propTypes2.default.number,
  children: _propTypes2.default.node,
  style: _propTypes2.default.shape({})
};

var defaultProps = {
  className: null,
  container: null,
  anchor: null,
  placement: 'top',
  offset: 10,
  children: null,
  style: {}
};

var placement = {
  TOP: 'top',
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  BOTTOM: 'bottom',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  RIGHT: 'right',
  RIGHT_TOP: 'right-top',
  LEFT: 'left'
};

var Popover = function (_Component) {
  (0, _inherits3.default)(Popover, _Component);

  function Popover(props) {
    (0, _classCallCheck3.default)(this, Popover);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Popover.__proto__ || (0, _getPrototypeOf2.default)(Popover)).call(this, props));

    _this.state = {
      style: null
    };

    _this.onResize = (0, _debounce2.default)(_this.onResize.bind(_this));
    _this.place = _this.place.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Popover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.hasMounted = true;
      window.addEventListener('resize', this.onResize);
      this.place();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_ref) {
      var container = _ref.container,
          anchor = _ref.anchor;

      if (container !== this.props.container || anchor !== this.props.anchor) {
        this.place();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.hasMounted = false;
      window.removeEventListener('resize', this.onResize);
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      this.place();
    }
  }, {
    key: 'place',
    value: function place() {
      if (!this.hasMounted || this.props.container == null || this.props.anchor == null) {
        return;
      }

      var containerRect = this.props.container.getBoundingClientRect();

      var anchorRect = this.props.anchor.getBoundingClientRect();
      var anchorHeight = anchorRect.height;
      var anchorWidth = anchorRect.width;

      var popoverRect = this.node.getBoundingClientRect();
      var popoverHeight = popoverRect.height;
      var popoverWidth = popoverRect.width;

      var left = 0;
      var top = 0;
      var marginLeft = 0;
      var marginTop = 0;

      switch (this.props.placement) {
        case placement.TOP:
          {
            left = anchorRect.left + anchorWidth / 2 - containerRect.left;
            marginLeft = -(popoverWidth / 2);
            marginTop = -this.props.offset;
            top = anchorRect.top - popoverHeight - 0 - containerRect.top;
            break;
          }

        case placement.TOP_RIGHT:
          {
            left = anchorRect.left + anchorWidth - popoverWidth - containerRect.left;
            marginTop = -this.props.offset;
            top = anchorRect.top - popoverHeight - containerRect.top;
            break;
          }

        case placement.TOP_LEFT:
          {
            left = anchorRect.left - containerRect.left;
            marginTop = -this.props.offset;
            top = anchorRect.top - popoverHeight - containerRect.top;
            break;
          }

        case placement.BOTTOM:
          {
            left = anchorRect.left + anchorWidth / 2 - containerRect.left;
            marginLeft = -(popoverWidth / 2);
            marginTop = this.props.offset;
            top = anchorRect.top + anchorHeight - containerRect.top;
            break;
          }

        case placement.BOTTOM_LEFT:
          {
            left = anchorRect.left - containerRect.left;
            marginTop = this.props.offset;
            top = anchorRect.top + anchorHeight - containerRect.top;
            break;
          }

        case placement.BOTTOM_RIGHT:
          {
            left = anchorRect.left + anchorWidth - popoverWidth - containerRect.left;
            marginTop = this.props.offset;
            top = anchorRect.top + anchorHeight - containerRect.top;
            break;
          }

        case placement.RIGHT:
          {
            left = anchorRect.left + anchorWidth + this.props.offset;
            marginLeft = 0;
            marginTop = 0;
            top = anchorRect.top - containerRect.top - popoverHeight / 2 + anchorHeight / 2;
            break;
          }

        case placement.RIGHT_TOP:
          {
            left = anchorRect.left + anchorWidth + this.props.offset - containerRect.left;
            marginLeft = 0;
            marginTop = 0;
            top = anchorRect.top - containerRect.top;
            break;
          }

        case placement.LEFT:
          {
            left = anchorRect.left - this.props.offset - popoverWidth - containerRect.left;
            marginLeft = 0;
            marginTop = 0;
            top = anchorRect.top - containerRect.top - popoverHeight / 2 + anchorHeight / 2;
            break;
          }

        default:
          break;
      }

      if (this.props.container !== document.body) {
        top += this.props.container.scrollTop;
        left += this.props.container.scrollLeft;
      }

      if (!(0, _isNan2.default)(left) && !(0, _isNan2.default)(top) && !(0, _isNan2.default)(marginLeft) && !(0, _isNan2.default)(marginTop)) {
        this.setState({
          style: {
            left: left, top: top, marginLeft: marginLeft, marginTop: marginTop
          }
        });
      } else {
        console.log('error', this.props.container, this.props.anchor);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('popover', 'place-' + this.props.placement, (0, _defineProperty3.default)({}, this.props.className, this.props.className != null)),
          style: (0, _extends3.default)({}, this.state.style, {
            zIndex: 2
          }, this.props.style),
          ref: function ref(el) {
            _this2.node = el;
          }
        },
        _react2.default.createElement(
          'div',
          null,
          this.props.children
        )
      );
    }
  }]);
  return Popover;
}(_react.Component);

Popover.placement = placement;
Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

exports.default = Popover;