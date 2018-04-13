import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  errorClass: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  keyName: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClearError: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.any]),

  validate: PropTypes.func,
  validateOnBlur: PropTypes.bool,

  /* eslint-disable */
  required: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  regex: PropTypes.string,
  getError: PropTypes.func,
  /* eslint-enable */
};

const defaultProps = {
  children: null,
  errorClass: 'has-error',
  onChange: () => null,
  error: null,
  value: null,
  onClearError: () => {},

  validate: () => {},
  validateOnBlur: false,

  required: false,
  max: null,
  min: null,
  maxLength: null,
  minLength: null,
  regex: null,
  getError: null,
};

class FormItem extends React.PureComponent {
  render() {
    return (
      <div
        className={classNames(
          'form-control',
          { [this.props.errorClass]: this.props.error != null },
        )}
        data-key={this.props.keyName}
      >
        {React.Children.map(this.props.children, child =>
          React.cloneElement(
            child,
            {
              onChange: (value) => {
                this.props.onChange(this.props.keyName, value);
                this.props.onClearError();
              },
              onBlur: this.props.validateOnBlur
                ? () => this.props.validate(this.props.keyName)
                : null,
              value: this.props.value,
            },
          ))}

        {this.props.error && (
          <div
            className="error-tip"
          >
            {this.props.error}
            <i className="icon icon-times-circle-o" />
          </div>
        )}
      </div>
    );
  }
}

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;

export default FormItem;
