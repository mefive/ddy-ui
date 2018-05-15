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
  getDom: PropTypes.func,
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
  getDom: null,
};

class Input extends React.PureComponent {
  componentDidMount() {
    if (this.props.autoFocus) {
      this.input.focus();
    }
  }

  render() {
    const {
      getDom, prepend, onEnter, indeterminate, value, ...props
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

          value={value || ''}

          ref={(el) => {
            if (getDom != null) {
              getDom(el);
            }

            this.input = el;
          }}

          onChange={(e) => {
            let { target } = e;

            if (target === window) {
              target = e.currentTarget;
            }

            let v;

            if (['checkbox', 'radio'].indexOf(props.type) !== -1) {
              v = target.checked;
            } else if (props.type === 'file') {
              v = target.files != null ? target.files[0] : target.value;
            } else {
              ({ value: v } = target);
            }

            if (isFunction(this.props.format)) {
              v = this.props.format(v);
            }

            this.props.onChange(v, e);
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
