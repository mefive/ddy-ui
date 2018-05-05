import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.any]),
  onChange: PropTypes.func,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  indeterminate: PropTypes.bool,
  format: PropTypes.func,
  onEnter: PropTypes.func,
  prepend: PropTypes.node,
};

const defaultProps = {
  value: null,
  autoFocus: false,
  type: 'text',
  format: null,
  indeterminate: false,
  onChange: () => null,
  onEnter: () => {},
  prepend: null,
};

class Input extends React.PureComponent {
  componentDidMount() {
    if (this.props.autoFocus) {
      this.input.focus();
    }
  }

  render() {
    const {
      prepend, onEnter, indeterminate, ...props
    } = this.props;

    if (['file', 'checkbox', 'radio'].indexOf(props.type) === -1) {
      props.value = this.props.value == null ? '' : this.props.value;
    }

    if (['checkbox', 'radio'].indexOf(props.type) !== -1) {
      props.checked = this.props.value;
    }

    if (indeterminate && props.type === 'checkbox') {
      props.indeterminate = true;
    }

    return (
      <span>
        {prepend}

        <input
          {...props}

          ref={(el) => { this.input = el; }}

          onChange={(e) => {
            let { target } = e;

            if (target === window) {
              target = e.currentTarget;
            }

            let value;

            if (['checkbox', 'radio'].indexOf(props.type) !== -1) {
              value = target.checked;
            } else if (props.type === 'file') {
              value = target.files != null ? target.files[0] : target.value;
            } else {
              ({ value } = target);
            }

            if (isFunction(this.props.format)) {
              value = this.props.format(value);
            }

            this.props.onChange(value, e);
          }}

          onKeyPress={(e) => {
            if (e.charCode === 13) {
              onEnter();
            }
          }}
        />
      </span>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
