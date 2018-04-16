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

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  candidates: _propTypes2.default.arrayOf(_propTypes2.default.any),
  maxHeight: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  value: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func
};

var defaultProps = {
  candidates: [],
  maxHeight: 200,
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  onSelect: function onSelect() {},
  placeholder: '',
  value: ''
};

var Search = function (_React$Component) {
  (0, _inherits3.default)(Search, _React$Component);

  function Search(props) {
    (0, _classCallCheck3.default)(this, Search);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Search.__proto__ || (0, _getPrototypeOf2.default)(Search)).call(this, props));

    _this.fixScroll = _this.fixScroll.bind(_this);
    _this.keyBindAction = _this.keyBindAction.bind(_this);
    _this.state = {
      display: false,
      overIndex: 0
    };
    return _this;
  }

  (0, _createClass3.default)(Search, [{
    key: 'fixScroll',
    value: function fixScroll() {
      var _props = this.props,
          candidates = _props.candidates,
          maxHeight = _props.maxHeight;
      var overIndex = this.state.overIndex;


      if (candidates.length > 0) {
        var itemHeight = +this.listElement.children[0].clientHeight;
        var fullCount = +(maxHeight / itemHeight).toFixed(0);

        if (overIndex > fullCount - 1) {
          this.listElement.scrollTop = (overIndex - (fullCount - 1)) * itemHeight;
        } else {
          this.listElement.scrollTop = 0;
        }
      }
    }
  }, {
    key: 'keyBindAction',
    value: function keyBindAction(e) {
      e.stopPropagation();
      if (e.keyCode === 40) {
        e.preventDefault();
        this.setState({
          overIndex: this.state.overIndex < this.props.candidates.length - 1 ? this.state.overIndex + 1 : this.props.candidates.length - 1
        }, this.fixScroll);
      }
      if (e.keyCode === 38) {
        e.preventDefault();
        this.setState({
          overIndex: this.state.overIndex > 1 ? this.state.overIndex - 1 : 0
        }, this.fixScroll);
      }
      if (e.keyCode === 13) {
        if (this.state.overIndex > -1) {
          this.props.onSelect(this.props.candidates[this.state.overIndex].value);
          this.setState({
            overIndex: 0,
            display: false
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          candidates = _props2.candidates,
          maxHeight = _props2.maxHeight,
          _onBlur = _props2.onBlur,
          _onChange = _props2.onChange,
          _onFocus = _props2.onFocus,
          onSelect = _props2.onSelect,
          placeholder = _props2.placeholder,
          value = _props2.value;

      return _react2.default.createElement(
        'div',
        {
          style: {
            position: 'relative'
          }
        },
        _react2.default.createElement(_Input2.default, {
          ref: function ref(el) {
            _this2.textInpt = el;
          },
          placeholder: placeholder,
          onBlur: function onBlur() {
            return setTimeout(function () {
              _onBlur();
              _this2.setState({
                display: false
              });
            }, 100);
          },
          onChange: function onChange(k, v) {
            _this2.setState({
              overIndex: 0,
              display: true
            }, _this2.fixScroll);
            _onChange(k, v);
          },
          onFocus: function onFocus() {
            _onFocus();
            _this2.setState({
              display: true
            });
          },
          value: value,
          onKeyDown: this.keyBindAction
        }),
        _react2.default.createElement(
          'ul',
          {
            ref: function ref(el) {
              _this2.listElement = el;
            },
            style: {
              position: 'absolute',
              maxHeight: maxHeight + 'px',
              width: '100%',
              marginTop: '2px',
              border: '1px solid #E0E7EB',
              borderRadius: '2px',
              backgroundColor: '#fff',
              overflow: 'auto',
              transition: 'all .2s ease',
              transform: 'scaleY(' + (this.state.display ? '1' : '0') + ')',
              transformOrigin: '0 0'
            }
          },
          candidates.map(function (element, index) {
            return _react2.default.createElement(
              'li',
              {
                key: '' + (index + 1),
                style: {
                  cursor: 'pointer',
                  padding: '4px 6px',
                  color: _this2.state.overIndex === index ? '#fff' : null,
                  backgroundColor: _this2.state.overIndex === index ? '#0080ec' : null
                }
              },
              _react2.default.createElement(
                'div',
                {
                  onClick: function onClick(e) {
                    e.stopPropagation();
                    onSelect(element.value);
                  },
                  onMouseOver: function onMouseOver() {
                    return _this2.setState({
                      overIndex: index
                    });
                  },
                  onFocus: function onFocus() {
                    return _this2.setState({
                      overIndex: index
                    });
                  },
                  onMouseOut: function onMouseOut() {
                    return _this2.setState({
                      overIndex: -1
                    });
                  },
                  onBlur: function onBlur() {
                    return _this2.setState({
                      overIndex: -1
                    });
                  },
                  'aria-hidden': true
                },
                element.title
              )
            );
          })
        )
      );
    }
  }]);
  return Search;
}(_react2.default.Component);

Search.propTypes = propTypes;

Search.defaultProps = defaultProps;

exports.default = Search;