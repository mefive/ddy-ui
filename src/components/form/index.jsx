import React from 'react';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import omit from 'lodash/omit';

import Form from './Form';
import FormGroup from './FormGroup';
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
          ...Item.props,
          value: this.props.dataSource[name],
          onChange: (value) => {
            this.setState({ errors: omit(this.state.errors, [name]) });
            this.props.onChange(name, value);
          },
          error,
        });
      };
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
              if (maxLength != null && value.length > maxLength) {
                error.push(`不得大于${maxLength}个字符`);
              }

              if (minLength != null && value.length < minLength) {
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
      return (
        <WrappedComponent
          {...this.props}
          validate={this.validate}
          getFieldDecorator={this.getFieldDecorator}
          errors={this.state.errors}
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
  FormGroup,
  FormItem,
};
