import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormItem, FormGroup, withForm } from '../../../../src/components/form';
import { DatePicker, Input, Clickable } from '../../../../src/components';

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
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    if (this.props.validate()) {
      this.props.onSubmit();
    }
  }

  render() {
    const { getFieldDecorator, dataSource } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
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
          <Clickable onClick={this.onSubmit}>
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
