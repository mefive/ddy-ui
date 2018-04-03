import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash/pick';
import isFunction from 'lodash/isFunction';

import './style/index.scss';

// eslint-disable-next-line
class FormGroup extends Component {
  render() {
    const marginLeft = (this.props.vertical || this.props.label == null)
      ? null : this.props.labelWidth;

    return (
      <div
        className={classNames(
          'form-group',
          { [this.props.className]: this.props.className != null },
        )}
      >
        {this.props.label && (
          // eslint-disable-next-line
          <label
            style={{ width: this.props.vertical ? null : this.props.labelWidth }}
            className={classNames({ vertical: !!this.props.vertical })}
          >
            {this.props.required && (
              <span className="required">*</span>
            )}
            {this.props.label}
          </label>
        )}

        <div style={{ marginLeft }}>
          {this.props.children}
        </div>

        {this.props.helpBlock && (
          <div
            className="help-block"
            style={{ marginLeft }}
          >
            {this.props.helpBlock}
          </div>
        )}
      </div>
    );
  }
}

FormGroup.propTypes = {
  className: PropTypes.string,
  labelWidth: PropTypes.number,
  vertical: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node,
  helpBlock: PropTypes.string,
};

FormGroup.defaultProps = {
  label: null,
  className: null,
  labelWidth: 120,
  vertical: false,
  required: false,
  children: null,
  helpBlock: null,
};

// eslint-disable-next-line
class Form extends Component {
  render() {
    return (
      <div
        className={classNames(
          'form text-sm',
          { [this.props.className]: this.props.className != null },
        )}
      >
        <div className="form-group-container">
          {React.Children.map(
            this.props.children,
            (child) => {
              if (child && child.type === FormGroup) {
                return React.cloneElement(
                  child,
                  {
                    vertical: this.props.vertical,
                    labelWidth: this.props.labelWidth,
                  },
                );
              }

              return child;
            },
          )}
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  vertical: PropTypes.bool,
  labelWidth: PropTypes.number,
};

Form.defaultProps = {
  className: null,
  children: null,
  vertical: false,
  labelWidth: 120,
};

// eslint-disable-next-line
class FormItem extends Component {
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

FormItem.propTypes = {
  errorClass: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  keyName: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClearError: PropTypes.func,
  // eslint-disable-next-line
  value: PropTypes.any,
};

FormItem.defaultProps = {
  children: null,
  errorClass: 'has-error',
  onChange: () => null,
  error: null,
  onClearError: () => {},
};

Form.Item = FormItem;

Form.create = (defaultProps = {}) =>
  (WrappedComponent) => {
    const formPropTypes = {
      trySubmit: PropTypes.bool,
      onValidated: PropTypes.func,
      dataSource: PropTypes.shape({}),
      onSubmit: PropTypes.func,
    };

    const formDefaultProps = {
      trySubmit: false,
      onValidated: () => {},
      dataSource: {},
      onSubmit: () => {},
    };


    // eslint-disable-next-line
    class DecoratedForm extends React.PureComponent {
      constructor(props) {
        super(props);

        this.rules = {};

        this.clearRules = this.clearRules.bind(this);
        this.getFieldDecorator = this.getFieldDecorator.bind(this);
        this.validate = this.validate.bind(this);

        this.state = {
          errors: {},
          ...props,
        };
      }

      componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps });

        if (!this.props.trySubmit && nextProps.trySubmit) {
          const valid = this.validate();

          this.props.onValidated(valid);

          if (valid) {
            this.props.onSubmit();
          }
        }
      }

      getFieldDecorator(formItem) {
        const { keyName } = formItem.props;

        const { errors, onChange, dataSource } = this.state;

        const error = errors[keyName];

        const rule = pick(
          formItem.props,
          ['required', 'max', 'min', 'maxLength', 'minLength', 'regex', 'getError'],
        );

        if (Object.keys(rule).length > 0) {
          this.rules[keyName] = rule;
        }

        return React.cloneElement(
          formItem,
          {
            onChange,
            value: dataSource[keyName],
            error,
            onClearError: () => {
              delete errors[keyName];
              this.setState({ errors });
            },
          },
        );
      }

      clearRules() {
        this.rules = {};
      }

      validate(fields) {
        const errors = {};

        let fieldList;

        if (typeof fields === 'string') {
          fieldList = [fields];
        } else {
          fieldList = fields;
        }

        Object.keys(this.rules).forEach((keyName) => {
          const value = this.props.dataSource[keyName];

          const {
            required, maxLength, minLength, regex, getError,
          } = this.rules[keyName];

          const error = [];

          if (!fieldList || fieldList.indexOf(keyName) !== -1) {
            if (isFunction(getError)) {
              const customError = getError(value);

              if (customError) {
                error.push(customError);
              }
            } else {
              if (!value) {
                if (required) {
                  error.push('必填项不能为空');
                }
              } else if (typeof value === 'string' && !value.trim()) {
                if (required) {
                  error.push('必填项不能为空');
                }
              } else {
                if (value.length > maxLength) {
                  error.push(`不得大于${maxLength}个字符`);
                }

                if (value.length < minLength) {
                  error.push(`不得小于${minLength}个字符`);
                }
              }

              if (value && value.length > 0 && regex && !regex.test(value)) {
                error.push('格式不正确');
              }
            }

            if (error.length > 0) {
              errors[keyName] = error.join(',');
            }
          } else {
            delete errors[keyName];
          }
        });

        this.setState({ errors });

        return Object.keys(errors).length === 0;
      }

      render() {
        const { validate, getFieldDecorator, clearRules } = this;

        clearRules();

        const props = {
          form: {
            validate,
            getFieldDecorator,
            clearRules,
          },
          ...this.props,
          ...defaultProps,
        };

        return <WrappedComponent {...props} />;
      }
    }

    DecoratedForm.propTypes = formPropTypes;
    DecoratedForm.defaultProps = formDefaultProps;

    return DecoratedForm;
  };

Form.Group = FormGroup;

export default Form;
