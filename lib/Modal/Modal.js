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

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Portal = require('../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Animate = require('../Animate');

var _Animate2 = _interopRequireDefault(_Animate);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  title: _propTypes2.default.string,
  renderTitle: _propTypes2.default.func,
  bigHeader: _propTypes2.default.bool,
  hasCloseButton: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onClose: _propTypes2.default.func,
  onEnter: _propTypes2.default.func,
  visible: _propTypes2.default.bool,
  onResize: _propTypes2.default.func,
  id: _propTypes2.default.string,
  children: _propTypes2.default.node
};

var defaultProps = {
  title: null,
  className: null,
  renderTitle: null,
  bigHeader: false,
  onClose: function onClose() {},
  onEnter: function onEnter() {},
  hasCloseButton: true,
  visible: false,
  onResize: function onResize() {},
  id: null,
  children: null
};

var Modal = function (_React$PureComponent) {
  (0, _inherits3.default)(Modal, _React$PureComponent);

  function Modal(props) {
    (0, _classCallCheck3.default)(this, Modal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).call(this, props));

    _this.state = {
      marginLeft: 0,
      marginTop: 0,
      windowHeight: window.innerHeight
    };

    _this.onResize = _this.onResize.bind(_this);
    _this.onKeyPress = _this.onKeyPress.bind(_this);
    _this.pin = _this.pin.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.hasMounted = true;
      this.pin();
      window.addEventListener('resize', this.onResize);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var visible = _ref.visible;

      if (visible && !this.props.visible) {
        document.addEventListener('keydown', this.onKeyPress);
      } else if (!visible && this.props.visible) {
        document.removeEventListener('keydown', this.onKeyPress);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.visible !== this.props.visible) {
        setTimeout(this.pin);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.hasMounted = false;
      window.removeEventListener('resize', this.onResize);
      document.removeEventListener('keydown', this.onKeyPress);
    }
  }, {
    key: 'onKeyPress',
    value: function onKeyPress(e) {
      e.preventDefault();

      var code = (0, _keycode2.default)(e);

      if (code === 'esc') {
        this.props.onClose();
      } else if (code === 'enter') {
        this.props.onEnter();
      }
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      var _this2 = this;

      if (!this.hasMounted) {
        return;
      }

      this.setState({ windowHeight: window.innerHeight }, function () {
        return _this2.pin();
      });
    }
  }, {
    key: 'pin',
    value: function pin() {
      var _this3 = this;

      if (!this.props.visible || !this.hasMounted) {
        return;
      }

      var dialog = this.dialog;


      if (dialog) {
        this.setState({
          marginLeft: -0.5 * dialog.offsetWidth,
          marginTop: -0.5 * dialog.offsetHeight
        }, function () {
          return _this3.props.onResize();
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        _Animate2.default,
        null,
        this.props.visible && _react2.default.createElement(
          _Portal2.default,
          null,
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)('modal', this.props.className)
            },
            _react2.default.createElement('div', { className: 'modal-mask' }),
            _react2.default.createElement(
              'div',
              {
                className: (0, _classnames2.default)('modal-dialog', { 'big-header': this.props.bigHeader }),
                style: {
                  marginLeft: this.state.marginLeft,
                  marginTop: this.state.marginTop
                },
                ref: function ref(el) {
                  _this4.dialog = el;
                },
                id: this.props.id
              },
              (this.props.renderTitle || this.props.title) && _react2.default.createElement(
                'div',
                { className: 'dialog-header' },
                this.props.hasCloseButton && _react2.default.createElement('i', {
                  className: 'icon icon-times-circle-o close',
                  'aria-hidden': true,
                  onClick: this.props.onClose
                }),
                this.props.renderTitle != null ? this.props.renderTitle() : _react2.default.createElement(
                  'h3',
                  null,
                  this.props.title
                )
              ),
              _react2.default.createElement(
                'div',
                {
                  className: 'dialog-body',
                  style: {
                    maxHeight: this.state.windowHeight - 55,
                    overflowY: 'auto'
                  }
                },
                this.props.children
              )
            )
          )
        )
      );
    }
  }]);
  return Modal;
}(_react2.default.PureComponent);

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

exports.default = Modal;