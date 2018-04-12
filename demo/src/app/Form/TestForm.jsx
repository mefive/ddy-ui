import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormItem, FormGroup, form } from '../../../../src/components/Form';
import Input from '../../../../src/components/Input';

const propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
};

class TestForm extends React.PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <FormGroup label="name">
          {getFieldDecorator((
            <FormItem keyName="name">
              <Input />
            </FormItem>
          ))}
        </FormGroup>
      </Form>
    );
  }
}

TestForm.propTypes = propTypes;
TestForm.defaultProps = defaultProps;

export default form()(TestForm);
