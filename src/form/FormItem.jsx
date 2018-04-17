import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Row, Col } from '../grid';

const propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node,
  required: PropTypes.bool,

  labelCol: PropTypes.shape({
    alignRight: PropTypes.bool,
  }),
  wrapperCol: PropTypes.shape({}),
};

const defaultProps = {
  label: '',
  id: null,
  children: null,
  required: false,

  labelCol: {
    alignRight: false,
    xs: {
      span: 12,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
  },
};

class FormItem extends React.PureComponent {
  getChildrenField(field) {
    const child = React.Children.only(this.props.children);
    return child.props[field];
  }

  getLabelFor() {
    return this.props.id || this.getChildrenField('id');
  }

  render() {
    const error = this.getChildrenField('error');

    return (
      <Row
        className={classNames('form-item', {
          'has-error': error != null,
        })}
      >
        {this.props.label != null && (
          <Col
            {...this.props.labelCol}
            className={classNames(
              'label-col',
              { right: this.props.labelCol.alignRight },
            )}
          >
            <label
              htmlFor={this.getLabelFor()}
            >
              {this.props.required && (
                <span className="required">*</span>
              )}
              {this.props.label}
            </label>
          </Col>
        )}

        <Col {...this.props.wrapperCol} className="form-item">
          {this.props.children}

          {error && (
            <div className="error">
              {error}
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;

export default FormItem;
