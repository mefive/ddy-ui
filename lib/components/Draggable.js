'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  containerWidth: _propTypes2.default.number.isRequired,
  containerHeight: _propTypes2.default.number.isRequired,
  top: _propTypes2.default.number,
  left: _propTypes2.default.number,
  onTopChange: _propTypes2.default.func,
  onLeftChange: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  onTopChange: function onTopChange() {},
  onLeftChange: function onLeftChange() {},
  children: null,
  top: 0,
  left: 0
};

var defaultState = {
  top: null,
  left: null,
  dragging: false
};

var Draggable = function (_Component) {
  (0, _inherits3.default)(Draggable, _Component);

  function Draggable(props) {
    (0, _classCallCheck3.default)(this, Draggable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Draggable.__proto__ || (0, _getPrototypeOf2.default)(Draggable)).call(this, props));

    _this.state = (0, _extends3.default)({}, defaultState);

    _this.startDragging = _this.startDragging.bind(_this);
    _this.stopDragging = _this.stopDragging.bind(_this);
    _this.move = _this.move.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Draggable, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.dragging && !prevState.dragging) {
        window.addEventListener('mouseup', this.stopDragging);
        window.addEventListener('mousemove', this.move);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopDragging();
    }
  }, {
    key: 'getTop',
    value: function getTop() {
      if (this.props.top != null) {
        return this.props.top;
      }

      return this.state.top;
    }
  }, {
    key: 'setTop',
    value: function setTop(top) {
      if (this.props.top != null) {
        this.props.onTopChange(top);
      } else {
        this.setState({ top: top });
      }
    }
  }, {
    key: 'getLeft',
    value: function getLeft() {
      if (this.props.left != null) {
        return this.props.left;
      }

      return this.state.left;
    }
  }, {
    key: 'setLeft',
    value: function setLeft(left) {
      if (this.props.left != null) {
        this.props.onLeftChange(left);
      } else {
        this.setState({ left: left });
      }
    }
  }, {
    key: 'move',
    value: function move(e) {
      e.stopPropagation();
      e.preventDefault();

      var clientX = e.clientX,
          clientY = e.clientY;


      var deltaX = clientX - this.mouseStart.left;
      var deltaY = clientY - this.mouseStart.top;

      var top = this.draggableItemStart.top + deltaY;
      var left = this.draggableItemStart.left + deltaX;

      var _props = this.props,
          containerWidth = _props.containerWidth,
          containerHeight = _props.containerHeight;


      if (containerWidth != null) {
        var maxLeft = containerWidth - this.draggableItem.clientWidth;
        left = Math.min(maxLeft, left);
      }

      if (containerHeight != null) {
        var maxTop = containerHeight - this.draggableItem.clientHeight;
        top = Math.min(maxTop, top);
      }

      top = Math.max(top, 0);
      left = Math.max(left, 0);

      this.setTop(top);
      this.setLeft(left);
    }
  }, {
    key: 'startDragging',
    value: function startDragging(e) {
      this.setState({ dragging: true });
      this.mouseStart = {
        left: e.clientX,
        top: e.clientY
      };

      this.draggableItemStart = {
        left: this.getLeft(),
        top: this.getTop()
      };
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      this.setState({ dragging: false });
      window.removeEventListener('mouseup', this.stopDragging);
      window.removeEventListener('mousemove', this.move);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var child = _react2.default.Children.only(this.props.children);

      var top = this.getTop();
      var left = this.getLeft();

      var style = (0, _extends3.default)({}, child.props.style, {
        top: top,
        left: left
      });

      return _react2.default.cloneElement(child, {
        ref: function ref(el) {
          _this2.draggableItem = el;
        },
        style: style,
        onMouseDown: this.startDragging
      });
    }
  }]);
  return Draggable;
}(_react.Component);

Draggable.propTypes = propTypes;
Draggable.defaultProps = defaultProps;

exports.default = Draggable;