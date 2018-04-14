import React from 'react';
import PropTypes from 'prop-types';
import { form } from '../../../../';
import Input from '../../../../src/components/Input';
import Clickable from '../../../../src/components/Clickable';
import DatePicker from '../../../../src/components/DatePicker/DatePicker';

const {
  Form, FormItem, FormGroup, withForm,
} = form;

const propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  dataSource: PropTypes.shape({}),
};

const defaultProps = {
  onSubmit: () => {},
  dataSource: {},
};

class TestForm extends React.PureComponent {
  render() {
    const { getFieldDecorator, dataSource } = this.props;

    return (
      <Form>
        <FormGroup label="Name" required>
          {getFieldDecorator((
            <FormItem
              keyName="name"
              required
              validateOnBlur
            >
              <Input />
            </FormItem>
          ))}
        </FormGroup>

        <FormGroup label="Birth Date">
          {getFieldDecorator((
            <FormItem keyName="birthDate">
              <DatePicker />
            </FormItem>
          ))}
        </FormGroup>

        <FormGroup label="Age">
          <div className="form-control-static">{dataSource.age}</div>
        </FormGroup>

        <div className="mt-2">
          <Clickable
            onClick={() => {
              if (this.props.validate()) {
                this.props.onSubmit();
              }
            }}
          >
            <div className="btn btn-primary">
              提交
            </div>
          </Clickable>
        </div>
      </Form>
    );
  }
}

TestForm.propTypes = propTypes;
TestForm.defaultProps = defaultProps;

export default withForm(TestForm);