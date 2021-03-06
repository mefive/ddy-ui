import React from 'react';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

import Form from './Form';
import FormItem from './FormItem';

const withForm = (WrappedComponent) => {
  const propTypes = {
    dataSource: PropTypes.shape({}),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  const defaultProps = {
    dataSource: {},
    onChange: () => {},
    onSubmit: () => {},
  };

  class DecoratedForm extends React.PureComponent {
    constructor(props) {
      super(props);

      this.rules = {};

      this.getFieldDecorator = this.getFieldDecorator.bind(this);
      this.validate = this.validate.bind(this);
      this.clearError = this.clearError.bind(this);

      this.state = {
        errors: {},
      };
    }

    getWrappedInstance() {
      return this.wrappedInstance;
    }

    getFieldDecorator(name, options = {}) {
      return (Item) => {
        const error = this.state.errors[name];
        this.rules[name] = options.rules;

        return React.cloneElement(Item, {
          className: classNames(Item.props.className, {
            'is-invalid': error != null,
          }),
          value: this.props.dataSource[name],
          onChange: (value) => {
            if (isFunction(Item.props.onChange)) {
              Item.props.onChange(value);
            }

            this.clearError(name);
            this.props.onChange(name, value);
          },
          name,
          error,
        });
      };
    }

    clearError(field) {
      let fields;

      if (field == null) {
        fields = Object.keys(this.rules);
      } else if (typeof field === 'string') {
        fields = [field];
      } else {
        fields = field;
      }

      this.setState({ errors: omit(this.state.errors, fields) });
    }

    validate = (field) => {
      const errors = pick(this.state.errors, Object.keys(this.rules));

      let fields;

      if (field == null) {
        fields = Object.keys(this.rules);
      } else if (typeof field === 'string') {
        fields = [field];
      } else {
        fields = field;
      }

      const addToError = (name, message) => {
        if (name in this.state.errors) {
          delete errors[name];
        }

        if (name in errors) {
          errors[name] = `${errors[name]}, ${message}`;
        } else {
          errors[name] = message;
        }
      };

      fields.forEach((name) => {
        const rules = this.rules[name];

        if (rules) {
          let value = this.props.dataSource[name];

          rules.forEach((rule) => {
            if (value == null || value === '' || (typeof value === 'string' && value.trim() === '')) {
              if (rule.required) {
                errors[name] = rule.message || '必填项不能为空';
              }

              return;
            }

            value = value || '';

            if (isFunction(rule.validator)) {
              const isValid = rule.validator(value);

              if (!isValid) {
                addToError(name, rule.message || '不符合自定义规则');
              }
            } else if (rule.maxLength != null && value.length > rule.maxLength) {
              addToError(name, rule.message || `不得大于${rule.maxLength}个字符`);
            } else if (rule.minLength != null && value.length < rule.minLength) {
              addToError(name, rule.message || `不得少于${rule.minLength}个字符`);
            } else if (rule.regex != null && !rule.regex.test(value)) {
              addToError(name, rule.message || '格式不正确');
            }
          });
        }
      });

      this.setState({ errors });

      return Object.keys(errors).length === 0;
    };

    render() {
      // clear rules at first, let 'getFieldDecorator' start over the adding
      this.rules = [];

      return (
        <WrappedComponent
          {...this.props}
          validate={this.validate}
          getFieldDecorator={this.getFieldDecorator}
          errors={this.state.errors}
          clearError={this.clearError}
          ref={(el) => { this.wrappedInstance = el; }}
        />
      );
    }
  }

  DecoratedForm.propTypes = propTypes;
  DecoratedForm.defaultProps = defaultProps;

  return DecoratedForm;
};

export {
  withForm,
  Form,
  FormItem,
};
