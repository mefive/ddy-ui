'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Animate = require('./Animate');

var _Animate2 = _interopRequireDefault(_Animate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  popover: _propTypes2.default.node,
  renderPopover: _propTypes2.default.func,
  defaultActive: _propTypes2.default.bool,
  active: _propTypes2.default.bool,
  onActiveChange: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  enterClassName: _propTypes2.default.string,
  leaveClassName: _propTypes2.default.string,
  enterDuration: _propTypes2.default.number,
  leaveDuration: _propTypes2.default.number,
  action: _propTypes2.default.string,
  getPopoverContainer: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  popover: null,
  renderPopover: null,
  active: null,
  disabled: false,
  enterClassName: 'enter',
  leaveClassName: 'leave',
  enterDuration: 200,
  leaveDuration: 200,
  onActiveChange: function onActiveChange() {},
  getPopoverContainer: null,
  defaultActive: null,
  action: 'click',
  children: null
};

var Trigger = function (_React$PureComponent) {
  (0, _inherits3.default)(Trigger, _React$PureComponent);

  function Trigger(props) {
    (0, _classCallCheck3.default)(this, Trigger);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Trigger.__proto__ || (0, _getPrototypeOf2.default)(Trigger)).call(this, props));

    _this.state = {
      // eslint-disable-next-line
      active: false,
      anchorRect: {},
      containerRect: {},
      containerScroll: {},
      popoverContainer: null,
      anchor: null
    };

    _this.tryToggle = _this.tryToggle.bind(_this);
    _this.toggle = _this.toggle.bind(_this);
    _this.activate = _this.activate.bind(_this);
    _this.deactivate = _this.deactivate.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Trigger, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // eslint-disable-next-line
      this.setState({ anchor: this.anchor });

      if (this.props.active == null && this.props.defaultActive !== null) {
        // eslint-disable-next-line
        this.setState({ active: this.props.defaultActive });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var prevActive = this.getActive(prevProps, prevState);
      var active = this.getActive();

      if (!prevActive && active) {
        if (this.props.action === 'click') {
          document.addEventListener('click', this.tryToggle);
        }
      } else if (!active && prevActive) {
        if (this.props.action === 'click') {
          document.removeEventListener('click', this.tryToggle);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var action = this.props.action;


      if (action === 'click') {
        document.removeEventListener('click', this.tryToggle);
      }
    }
  }, {
    key: 'getActive',
    value: function getActive() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state;

      if (props.active != null) {
        return props.active;
      }

      return state.active;
    }
  }, {
    key: 'setActive',
    value: function setActive(active) {
      if (!this.props.disabled) {
        if (this.props.active == null) {
          // eslint-disable-next-line
          this.setState({ active: active });
        }

        this.props.onActiveChange(active);
      }
    }
  }, {
    key: 'getEventHandler',
    value: function getEventHandler(origin, handler) {
      return function (e) {
        if (typeof origin === 'function') {
          origin(e);
        }

        handler(e);
      };
    }
  }, {
    key: 'getEventHandlers',
    value: function getEventHandlers(child) {
      var eventHandlers = {};

      if (this.props.action === 'click') {
        eventHandlers.onClick = this.getEventHandler(child.props.onClick, this.toggle);
      }

      if (this.props.action === 'hover') {
        eventHandlers.onMouseEnter = this.getEventHandler(child.props.onMouseEnter, this.activate);
        eventHandlers.onMouseLeave = this.getEventHandler(child.props.onMouseLeave, this.deactivate);
      }

      return eventHandlers;
    }
  }, {
    key: 'tryToggle',
    value: function tryToggle(e) {
      if (this.popover && !this.popover.node.contains(e.target)) {
        this.toggle();
      }
    }
  }, {
    key: 'toggle',
    value: function toggle(e) {
      if (e) {
        e.stopPropagation();
      }

      this.setActive(!this.getActive());
    }
  }, {
    key: 'activate',
    value: function activate() {
      this.setActive(true);
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.setActive(false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          anchorRect = _state.anchorRect,
          containerRect = _state.containerRect,
          containerScroll = _state.containerScroll;


      var child = _react2.default.Children.only(this.props.children);
      var popoverElement = this.props.renderPopover ? this.props.renderPopover() : this.props.popover;

      return _react2.default.cloneElement.apply(_react2.default, [child, (0, _extends3.default)({}, this.getEventHandlers(child), {
        ref: function ref(el) {
          if (typeof child.ref === 'function') {
            child.ref(el);
          }
          _this2.anchor = el;
        }
      })].concat((0, _toConsumableArray3.default)(_react2.default.Children.toArray(child.props.children)), [_react2.default.createElement(
        _Animate2.default,
        {
          enterClassName: this.props.enterClassName,
          leaveClassName: this.props.leaveClassName,
          enterDuration: this.props.enterDuration,
          leaveDuration: this.props.leaveDuration
        },
        this.getActive() && _react2.default.createElement(
          _Portal2.default,
          {
            onContainerChange: function onContainerChange(popoverContainer) {
              return _this2.setState({ popoverContainer: popoverContainer });
            },
            getContainer: this.props.getPopoverContainer
          },
          _react2.default.cloneElement(popoverElement, {
            containerRect: containerRect,
            containerScroll: containerScroll,
            anchorRect: anchorRect,
            anchor: this.state.anchor,
            container: this.state.popoverContainer,
            ref: function ref(el) {
              if (typeof popoverElement.ref === 'function') {
                popoverElement.ref(el);
              }
              _this2.popover = el;
            }
          })
        )
      )]));
    }
  }]);
  return Trigger;
}(_react2.default.PureComponent);

Trigger.propTypes = propTypes;
Trigger.defaultProps = defaultProps;

exports.default = Trigger;