import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Row, Col } from '../grid';

import './style.scss';

const propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node,
  required: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,

  labelCol: PropTypes.shape({
    alignRight: PropTypes.bool,
  }),
  wrapperCol: PropTypes.shape({}),
};

const defaultProps = {
  label: null,
  id: null,
  children: null,
  required: false,
  className: null,
  labelClassName: null,

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
        className={classNames(
          'form-group',
          this.props.className,
        )}
      >
        {this.props.label != null && (
          <Col
            {...this.props.labelCol}
            className={classNames(
              'col-form-label',
              this.props.labelClassName,
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

        <Col {...this.props.wrapperCol}>
          {this.props.children}

          {error && (
            <div className="invalid-feedback">
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
