import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  errorClass: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  keyName: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClearError: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.any]),
};

const defaultProps = {
  children: null,
  errorClass: 'has-error',
  onChange: () => null,
  error: null,
  value: null,
  onClearError: () => {},
};

class FormItem extends React.PureComponent {
  render() {
    return (
      <div
        className={classNames(
          'form-control',
          { [this.props.errorClass]: this.props.error != null },
        )}
        data-key={this.props.keyName}
      >
        {React.Children.map(this.props.children, child =>
          React.cloneElement(
            child,
            {
              onChange: (value) => {
                this.props.onChange(this.props.keyName, value);
                this.props.onClearError();
              },
              value: this.props.value,
            },
          ))}

        {this.props.error && (
          <div
            className="error-tip"
          >
            {this.props.error}
            <i className="icon icon-times-circle-o" />
          </div>
        )}
      </div>
    );
  }
}

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;

export default FormItem;
