import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  labelWidth: PropTypes.number,
  vertical: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node,
  helpBlock: PropTypes.string,
};

const defaultProps = {
  label: null,
  className: null,
  labelWidth: 120,
  vertical: false,
  required: false,
  children: null,
  helpBlock: null,
};

class FormGroup extends React.PureComponent {
  render() {
    const marginLeft = (this.props.vertical || this.props.label == null)
      ? null : this.props.labelWidth;

    return (
      <div
        className={classNames(
          'form-group',
          this.props.className,
        )}
      >
        {this.props.label && (
          <label
            style={{ width: this.props.vertical ? null : this.props.labelWidth }}
            className={classNames({ vertical: !!this.props.vertical })}
          >
            {this.props.required && (
              <span className="required">*</span>
            )}
            {this.props.label}
          </label>
        )}

        <div style={{ marginLeft }}>
          {this.props.children}
        </div>

        {this.props.helpBlock && (
          <div
            className="help-block"
            style={{ marginLeft }}
          >
            {this.props.helpBlock}
          </div>
        )}
      </div>
    );
  }
}

FormGroup.propTypes = propTypes;
FormGroup.defaultProps = defaultProps;

export default FormGroup;
