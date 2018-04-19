import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/sql-hint';

import './style/index.scss';

const propTypes = {
  value: PropTypes.string,
  insert: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  cursor: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  onChange: PropTypes.func,
  onFoucs: PropTypes.func,
  onBlur: PropTypes.func,
  onRun: PropTypes.func,
  onClearInsert: PropTypes.func,
  focus: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
};

const defaultProps = {
  value: '',
  insert: null,
  cursor: null,
  onChange: () => {},
  onFoucs: () => {},
  onBlur: () => {},
  onClearInsert: () => {},
  onRun: () => {},
  focus: false,
  width: '100%',
  height: 300,
  readOnly: false,
};

const excludedIntelliSenseTriggerKeys = {
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
  222: 'quote',
};

class CodeEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const editor = CodeMirror(
      this.el,
      {
        value: this.props.value,
        lineNumbers: true,
        tabSize: 2,
        mode: 'text/x-sql',
        extraKeys: {
          Tab: () => editor.showHint({ completeSingle: true }),
          'Ctrl-Enter': this.props.onRun,
        },
        readOnly: this.props.readOnly ? 'nocursor' : false,
      },
    );

    editor.setSize(this.props.width, this.props.height);

    editor.on('change', this.onChange);
    editor.on('focus', this.props.onFoucs);
    editor.on('blur', this.props.onBlur);
    // editor.on('keyup', this.onKeyup);

    editor.focus();

    this.editor = editor;
  }

  componentDidUpdate(preProps) {
    const {
      value, insert, focus, height, width, cursor,
    } = this.props;

    const { editor } = this;

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

  componentWillUnmount() {
    const { editor } = this;
    editor.off('change', this.onChange);
    editor.off('focus', this.props.onFoucs);
    editor.off('blur', this.props.onBlur);
    editor.off('keyup', this.onKeyup);

    this.editor = null;
  }

  onChange() {
    if (!this.editor) {
      return;
    }

    this.props.onChange(this.editor.getValue());
  }

  onKeyup(editor, event) {
    if (!editor.state.completionActive
      && !(`${event.keyCode}` in excludedIntelliSenseTriggerKeys)
    ) {
      editor.showHint({
        completeSingle: false,
        closeCharacters: /$./,
      });
    }
  }

  render() {
    return (
      <div className="ui-code-editor" ref={(el) => { this.el = el; }} />
    );
  }
}

CodeEditor.propTypes = propTypes;
CodeEditor.defaultProps = defaultProps;

export default CodeEditor;
