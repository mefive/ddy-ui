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

var _Draggable = require('../Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  height: _propTypes2.default.number.isRequired,
  children: _propTypes2.default.node
};

var defaultProps = {
  children: null
};

var Scrollable = function (_Component) {
  (0, _inherits3.default)(Scrollable, _Component);

  function Scrollable(props) {
    (0, _classCallCheck3.default)(this, Scrollable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Scrollable.__proto__ || (0, _getPrototypeOf2.default)(Scrollable)).call(this, props));

    _this.state = {
      scrollTop: 0,
      scrollHeight: 0,
      thumbSize: 0,
      thumbOffset: 0
    };
    _this.onWheel = _this.onWheel.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Scrollable, [{
    key: 'onWheel',
    value: function onWheel(e) {
      var deltaY = e.deltaY;


      var scrollTop = this.wrapper.scrollTop + deltaY;

      if (scrollTop === this.restrictScrollTop(scrollTop)) {
        e.preventDefault();
        e.stopPropagation();
      }

      this.setScrollTop(scrollTop);
    }
  }, {
    key: 'setScrollTop',
    value: function setScrollTop(scrollTop) {
      var _this2 = this;

      var prevScrollTop = this.state.scrollTop;

      this.setState({
        scrollTop: this.restrictScrollTop(scrollTop)
      }, function () {
        if (prevScrollTop !== _this2.state.scrollTop) {
          _this2.wrapper.scrollTop = scrollTop;
          _this2.syncThumb();
        } else {
          var scrollHeight = _this2.wrapper.scrollHeight;


          if (scrollHeight !== _this2.state.scrollHeight) {
            _this2.setState({ scrollHeight: scrollHeight });
            _this2.syncThumb();
          }
        }
      });
    }
  }, {
    key: 'getRatio',
    value: function getRatio() {
      var wrapper = this.wrapper;
      var height = this.props.height;


      return height / wrapper.scrollHeight;
    }
  }, {
    key: 'syncThumb',
    value: function syncThumb() {
      var ratio = this.getRatio();

      var thumbSize = this.props.height * ratio;
      var thumbOffset = this.state.scrollTop * ratio;

      this.setState({ thumbSize: thumbSize, thumbOffset: thumbOffset });
    }
  }, {
    key: 'restrictScrollTop',
    value: function restrictScrollTop(scrollTop) {
      var top = scrollTop;

      var max = this.wrapper.scrollHeight - this.props.height;
      var min = 0;

      top = Math.max(top, min);
      top = Math.min(top, max);

      return top;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var wrapper = this.wrapper;


      return _react2.default.createElement(
        'div',
        { className: 'scrollable' },
        _react2.default.createElement(
          'div',
          {
            className: 'scrollable-wrapper',
            ref: function ref(el) {
              _this3.wrapper = el;
            },
            style: {
              height: this.props.height
            },
            onWheel: this.onWheel
          },
          this.props.children
        ),
        this.state.thumbSize < this.props.height && _react2.default.createElement(
          'div',
          { className: 'scrollable-track' },
          _react2.default.createElement(
            _Draggable2.default,
            {
              containerWidth: 0,
              containerHeight: wrapper ? wrapper.clientHeight : 0,
              top: this.state.thumbOffset,
              onTopChange: function onTopChange(top) {
                var scrollTop = top / _this3.getRatio();

                _this3.setState({ scrollTop: _this3.restrictScrollTop(scrollTop) });
              }
            },
            _react2.default.createElement('div', {
              className: 'scrollable-thumb',
              style: {
                height: this.state.thumbSize
              }
            })
          )
        )
      );
    }
  }]);
  return Scrollable;
}(_react.Component);

Scrollable.propTypes = propTypes;
Scrollable.defaultProps = defaultProps;

exports.default = Scrollable;