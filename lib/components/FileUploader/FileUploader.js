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

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  multiple: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  onProgress: _propTypes2.default.func,
  onComplete: _propTypes2.default.func
};

var defaultProps = {
  multiple: true
};

var FileUploader = function (_React$Component) {
  (0, _inherits3.default)(FileUploader, _React$Component);

  function FileUploader() {
    (0, _classCallCheck3.default)(this, FileUploader);
    return (0, _possibleConstructorReturn3.default)(this, (FileUploader.__proto__ || (0, _getPrototypeOf2.default)(FileUploader)).apply(this, arguments));
  }

  (0, _createClass3.default)(FileUploader, [{
    key: 'upload',
    value: function upload(files) {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var trigger = this.props.trigger;


      return _react2.default.createElement(
        'div',
        { className: 'file-uploader' },
        trigger,
        _react2.default.createElement(
          'div',
          { className: 'file-uploader-trigger' },
          _react2.default.createElement('input', {
            type: 'file',
            multiple: this.props.multiple,
            onChange: function onChange(e) {
              return _this2.upload(e.target.files);
            }
          })
        )
      );
    }
  }]);
  return FileUploader;
}(_react2.default.Component);

FileUploader.propTypes = propTypes;
FileUploader.defaultProps = defaultProps;

exports.default = FileUploader;