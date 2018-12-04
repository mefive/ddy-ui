import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.any]),
  onChange: PropTypes.func,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  indeterminate: PropTypes.bool,
  format: PropTypes.func,
  onEnter: PropTypes.func,
  checked: PropTypes.bool,
  prepend: PropTypes.node,
  append: PropTypes.node,
  getDom: PropTypes.func,
  className: PropTypes.string,
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
  append: null,
  getDom: null,
  className: null,
  checked: null,
};

class Input extends React.PureComponent {
  componentDidMount() {
    if (this.props.autoFocus) {
      this.input.focus();
    }
  }

  renderInput(className) {
    const {
      getDom, onEnter, indeterminate, value, checked, prepend, ...props
    } = this.props;

    if (['file', 'checkbox', 'radio'].indexOf(props.type) === -1) {
      props.value = value == null ? '' : value;
    }

    if (props.type === 'checkbox') {
      props.checked = value;
    }

    if (props.type === 'radio') {
      props.checked = checked;
    }

    if (indeterminate && props.type === 'checkbox') {
      props.indeterminate = true;
    }

    return (
      <input
        {...props}

        className={className}

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
    );
  }

  render() {
    const className = classNames(
      ['checkbox', 'radio'].indexOf(this.props.type) !== -1 ? 'form-check-input' : 'form-control',
      this.props.className,
    );

    if (this.props.prepend == null && this.props.append == null) {
      return this.renderInput(className);
    }

    return (
      <div className={classNames('d-flex align-items-center justify-content-between', className)}>
        {this.props.prepend}

        <div className="flex-1 w-100">
          {this.renderInput('border-0')}
        </div>

        {this.props.append}
      </div>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
