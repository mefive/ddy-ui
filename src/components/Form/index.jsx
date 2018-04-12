import React from 'react';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import Form from './Form';
import FormGroup from './FormGroup';
import FormItem from './FormItem';

const form = (defaultProps = {}) =>
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

export {
  form,
  Form,
  FormGroup,
  FormItem,
};
