import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  labelWidth: PropTypes.number,
  label: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.node,
  helpBlock: PropTypes.string,
};

const defaultProps = {
  label: null,
  className: null,
  labelWidth: null,
  required: false,
  children: null,
  helpBlock: null,
};

class FormGroup extends React.PureComponent {
  render() {
    return (
      <div
        className={classNames(
          'form-group',
          this.props.className,
          { inline: this.props.labelWidth != null },
        )}
      >
        {this.props.label && (
          <label
            style={{ width: this.props.labelWidth }}
          >
            {this.props.required && (
              <span className="required">*</span>
            )}
            {this.props.label}
          </label>
        )}

        <div style={{ marginLeft: this.props.labelWidth }}>
          {this.props.children}
        </div>

        {this.props.helpBlock && (
          <div
            className="help-block"
            style={{ marginLeft: this.props.labelWidth }}
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
