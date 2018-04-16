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

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

require('codemirror/lib/codemirror.css');

require('codemirror/addon/hint/show-hint');

require('codemirror/addon/hint/show-hint.css');

require('codemirror/addon/hint/sql-hint');

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  value: _propTypes2.default.string,
  insert: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  cursor: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.object]),
  onChange: _propTypes2.default.func,
  onFoucs: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onRun: _propTypes2.default.func,
  onClearInsert: _propTypes2.default.func,
  focus: _propTypes2.default.bool,
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  readOnly: _propTypes2.default.bool
};

var defaultProps = {
  value: '',
  insert: null,
  cursor: null,
  onChange: function onChange() {},
  onFoucs: function onFoucs() {},
  onBlur: function onBlur() {},
  onClearInsert: function onClearInsert() {},
  onRun: function onRun() {},
  focus: false,
  width: '100%',
  height: 300,
  readOnly: false
};

var excludedIntelliSenseTriggerKeys = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  19: 'pause',
  20: 'capslock',
  27: 'escape',
  32: 'space',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  45: 'insert',
  46: 'delete',
  91: 'left window key',
  92: 'right window key',
  93: 'select',
  107: 'add',
  109: 'subtract',
  110: 'decimal point',
  111: 'divide',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  120: 'f9',
  121: 'f10',
  122: 'f11',
  123: 'f12',
  144: 'numlock',
  145: 'scrolllock',
  186: 'semicolon',
  187: 'equalsign',
  188: 'comma',
  189: 'dash',
  190: 'period',
  191: 'slash',
  192: 'graveaccent',
  220: 'backslash',
  222: 'quote'
};

var CodeEditor = function (_React$Component) {
  (0, _inherits3.default)(CodeEditor, _React$Component);

  function CodeEditor(props) {
    (0, _classCallCheck3.default)(this, CodeEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CodeEditor.__proto__ || (0, _getPrototypeOf2.default)(CodeEditor)).call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(CodeEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var editor = (0, _codemirror2.default)(this.el, {
        value: this.props.value,
        lineNumbers: true,
        tabSize: 2,
        mode: 'text/x-sql',
        extraKeys: {
          Tab: function Tab() {
            return editor.showHint({ completeSingle: true });
          },
          'Ctrl-Enter': this.props.onRun
        },
        readOnly: this.props.readOnly ? 'nocursor' : false
      });

      editor.setSize(this.props.width, this.props.height);

      editor.on('change', this.onChange);
      editor.on('focus', this.props.onFoucs);
      editor.on('blur', this.props.onBlur);
      // editor.on('keyup', this.onKeyup);

      editor.focus();

      this.editor = editor;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(preProps) {
      var _props = this.props,
          value = _props.value,
          insert = _props.insert,
          focus = _props.focus,
          height = _props.height,
          width = _props.width,
          cursor = _props.cursor;
      var editor = this.editor;


      if (value !== this.editor.getValue()) {
        editor.setValue(value);
        editor.focus();
      }

      if (focus && !preProps.focus) {
        editor.focus();
      }

      if (height !== preProps.height) {
        editor.setSize(width, height);
      }

      if (!!insert && preProps.insert == null) {
        editor.replaceSelection(insert);
        editor.focus();

        this.props.onClearInsert();
      }

      if (cursor != null && preProps.cursor == null) {
        editor.setCursor(editor.getCursor().line, cursor);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var editor = this.editor;

      editor.off('change', this.onChange);
      editor.off('focus', this.props.onFoucs);
      editor.off('blur', this.props.onBlur);
      editor.off('keyup', this.onKeyup);

      this.editor = null;
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      if (!this.editor) {
        return;
      }

      this.props.onChange(this.editor.getValue());
    }
  }, {
    key: 'onKeyup',
    value: function onKeyup(editor, event) {
      if (!editor.state.completionActive && !('' + event.keyCode in excludedIntelliSenseTriggerKeys)) {
        editor.showHint({
          completeSingle: false,
          closeCharacters: /$./
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', { className: 'ui-code-editor', ref: function ref(el) {
          _this2.el = el;
        } });
    }
  }]);
  return CodeEditor;
}(_react2.default.Component);

CodeEditor.propTypes = propTypes;
CodeEditor.defaultProps = defaultProps;

exports.default = CodeEditor;