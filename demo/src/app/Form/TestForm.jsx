import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../../../src/form/Form';
import FormItem from '../../../../src/form/FormItem';
import Input from '../../../../src/Input';
import DatePicker from '../../../../src/DatePicker/DatePicker';
import Row from '../../../../src/grid/Row';
import Col from '../../../../src/grid/Col';
import Clickable from '../../../../src/Clickable';
import { withForm } from '../../../../src/form';
import RadioGroup from '../../../../src/RadioGroup/RadioGroup';
import ImageUploader from '../../../../src/ImageUploader/ImageUploader';

const propTypes = {
  dataSource: PropTypes.shape({
    avatar: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  }),
  getFieldDecorator: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  dataSource: {},
  onSubmit: () => {},
};

const labelCol = {
  md: 6,
  alignRight: true,
};

const wrapperCol = {
  md: 6,
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
            <Input className="form-control" id="name" onBlur={() => validate('name')} />
          ))}
        </FormItem>

        <FormItem
          label="Gender"
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          labelClassName="pt-0"
        >
          {getFieldDecorator('gender')((
            <RadioGroup
              options={[{
                value: 'male',
                title: 'Male',
              }, {
                value: 'female',
                title: 'Female',
              }]}
            />
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
          <div className="form-control-plaintext">
            {dataSource.age}
          </div>
        </FormItem>

        {/*<FormItem*/}
          {/*label="Avatar"*/}
          {/*labelCol={labelCol}*/}
          {/*wrapperCol={wrapperCol}*/}
        {/*>*/}
          {/*{getFieldDecorator('avatar', {*/}
            {/*rules: [{*/}
              {/*validator: (avatar) => {*/}
                {/*if (avatar != null && typeof avatar === 'object') {*/}
                  {/*if (!avatar.type.startsWith('image')) {*/}
                    {/*return false;*/}
                  {/*}*/}
                {/*}*/}

                {/*return true;*/}
              {/*},*/}
              {/*message: '请选择图片',*/}
            {/*}, {*/}
              {/*required: true,*/}
              {/*message: '图片必传',*/}
            {/*}],*/}
          {/*})((*/}
            {/*<ImageUploader width={80} uploadUrl="/api/upload/images" />*/}
          {/*))}*/}
        {/*</FormItem>*/}

        <div className="mt-2">
          <Row>
            <Col md={{ span: 6, offset: 6 }}>
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
