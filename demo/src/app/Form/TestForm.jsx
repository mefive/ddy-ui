import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormItem, withForm } from '../../../../src/components/form';
import { DatePicker, Input, Clickable } from '../../../../src/components';
import { Row, Col } from '../../../../src/components/grid';

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

const labelCol = {
  xs: 6,
  alignRight: true,
};

const wrapperCol = {
  xs: 6,
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
    const { getFieldDecorator, dataSource, validate } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem
          label="Name"
          required
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true,
              message: '需要 name 啊！！！',
            }, {
              validator: v => v !== 'mefive',
              message: '不能是 mefive !',
            }, {
              validator: v => v.indexOf('m') === -1,
              message: '不能有 m',
            }, {
              maxLength: 20,
            }, {
              minLength: 3,
            }],
          })((
            <Input id="name" onBlur={() => validate('name')} />
          ))}
        </FormItem>

        <FormItem
          label="Birth Date"
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          {getFieldDecorator('birthDate')((
            <DatePicker />
          ))}
        </FormItem>

        <FormItem
          label="Age"
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          <div className="form-item-line-height">
            {dataSource.age}
          </div>
        </FormItem>

        <div className="mt-2">
          <Row>
            <Col xs={{ span: 6, offset: 6 }}>
              <Clickable onClick={this.onSubmit}>
                <div className="btn btn-primary">
                  提交
                </div>
              </Clickable>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

TestForm.propTypes = propTypes;
TestForm.defaultProps = defaultProps;

export default withForm(TestForm);
