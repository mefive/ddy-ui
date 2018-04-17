import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import omit from 'lodash/omit';

const propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  format: PropTypes.func,
  onEnter: PropTypes.func,
};

const defaultProps = {
  autoFocus: false,
  onChange: () => null,
  onEnter: () => {},
};

function isCheckable(type) {
  return ['checkbox', 'radio'].indexOf(type) !== -1;
}

function isFile(type) {
  return type === 'file';
}

class Input extends React.PureComponent {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    el.indeterminate
      = this.props.indeterminate && this.props.type === 'checkbox';

    if (this.props.autoFocus) {
      el.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    ReactDOM.findDOMNode(this).indeterminate = nextProps.indeterminate && nextProps.type === 'checkbox';
  }

  render() {
    const {
      type, value, onChange, format,
    } = this.props;

    const newProps = omit(this.props, 'onEnter');

    if (!type) {
      newProps.type = 'text';
    }

    Reflect.deleteProperty(newProps, 'indeterminate');

    return (
      <input
        {...newProps}
        onChange={(e) => {
          let value;
          const { target } = e;

          if (isCheckable(type)) {
            value = target.checked;
          } else if (isFile(type)) {
            value = target.files
              ? target.files[0]
              // ie9
              : target.value;
          } else {
            value = target.value;
          }

          if (typeof format === 'function') {
            value = format(value);
          }

          onChange(value, e);
        }}
        value={isCheckable(type) ? '' : (value == null ? '' : value)}
        checked={isCheckable(type) ? value : null}
        onKeyPress={(e) => {
          if (e.charCode === 13) {
            this.props.onEnter();
          }
        }}
      />
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
