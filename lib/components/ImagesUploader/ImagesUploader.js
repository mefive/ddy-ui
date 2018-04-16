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

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  // value: PropTypes.array,
  max: _propTypes2.default.number,
  onChange: _propTypes2.default.func
};

var defaultProps = {
  width: 67,
  height: 125,
  value: [],
  max: 5,
  onChange: function onChange() {
    return null;
  }
};

var ImagesUploader = function (_Component) {
  (0, _inherits3.default)(ImagesUploader, _Component);

  function ImagesUploader(props) {
    (0, _classCallCheck3.default)(this, ImagesUploader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ImagesUploader.__proto__ || (0, _getPrototypeOf2.default)(ImagesUploader)).call(this, props));

    _this.state = {
      inputValue: ''
    };
    return _this;
  }

  (0, _createClass3.default)(ImagesUploader, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          value = _props.value,
          width = _props.width,
          height = _props.height;


      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'div',
          { className: 'help-block' },
          '\u8BF7\u4E0A\u4F203-5\u5F20\u622A\u56FE\uFF08\u5C3A\u5BF8\u4FDD\u6301\u4E00\u81F4\uFF09\uFF0C\u5355\u5F20\u56FE\u7247\u4E0D\u8D85\u8FC71M\u3002 \u622A\u56FE\u4E0D\u80FD\u5C0F\u4E8E320*480\u50CF\u7D20\uFF0C\u63A8\u8350480*800\u50CF\u7D20\u3002JPG\u3001PNG\u683C\u5F0F\u3002'
        ),
        _react2.default.createElement(
          'div',
          { className: 'images-uploader' },
          _react2.default.createElement(
            'ul',
            null,
            value && value.map(function (url, index) {
              return _react2.default.createElement(
                'li',
                { className: 'image-item', key: index },
                _react2.default.createElement(
                  'div',
                  {
                    style: { width: width, height: height, lineHeight: height + 'px' }
                  },
                  _react2.default.createElement('img', { src: url }),
                  _react2.default.createElement(
                    'div',
                    {
                      className: 'image-actions',
                      style: { inlineHeight: height }
                    },
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement('i', {
                        className: 'icon icon-trash',
                        onClick: function onClick() {
                          return _this2.props.onChange({
                            type: 'remove',
                            index: index
                          });
                        }
                      })
                    )
                  )
                )
              );
            }),
            value.length < this.props.max && _react2.default.createElement(
              'li',
              { className: 'image-select' },
              _react2.default.createElement(
                'div',
                {
                  style: { width: width, height: height, lineHeight: height + 'px' }
                },
                _react2.default.createElement(
                  'div',
                  { className: 'image-select-text' },
                  _react2.default.createElement('i', { className: 'icon icon-upload' }),
                  _react2.default.createElement('br', null),
                  '\u4E0A\u4F20'
                ),
                _react2.default.createElement(_Input2.default, {
                  type: 'file',
                  onChange: function onChange(v, e) {
                    e.stopPropagation();

                    if (v) {
                      _this2.props.onChange({
                        type: 'add',
                        value: v
                      });
                    }

                    e.target.value = '';
                  }
                })
              )
            )
          )
        )
      );
    }
  }]);
  return ImagesUploader;
}(_react.Component);

ImagesUploader.propTypes = propTypes;
ImagesUploader.defaultProps = defaultProps;

exports.default = ImagesUploader;