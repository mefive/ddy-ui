import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Row, Col } from '../grid';

import './style.scss';
import Animate from '../Animate/Animate';

const propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node,
  required: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,

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
  wrapperClassName: null,

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

class FormItem extends React.Component {
  getChildrenField(field) {
    let value = null;

    React.Children.forEach(this.props.children, (child) => {
      if (field in child.props) {
        value = child.props[field];
      }
    });

    return value;
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
             { 'text-right pr-2': this.props.labelCol.alignRight },
            )}
          >
            <label
              htmlFor={this.getLabelFor()}
              className={classNames({ required: this.props.required })}
            >
              {this.props.label}
            </label>
          </Col>
        )}

        <Col
          {...this.props.wrapperCol}
        >
          <div className={this.props.wrapperClassName}>
            {this.props.children}
          </div>

          <Animate
            enterClassName="fade-in"
          >
            {error && (
              <div className="invalid-feedback">
                {error}
              </div>
            )}
          </Animate>
        </Col>
      </Row>
    );
  }
}

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;

export default FormItem;
