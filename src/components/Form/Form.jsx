import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormGroup from './FormGroup';

import './style/index.scss';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  vertical: PropTypes.bool,
  labelWidth: PropTypes.number,
};

const defaultProps = {
  className: null,
  children: null,
  vertical: false,
  labelWidth: 120,
};

class Form extends React.PureComponent {
  render() {
    return (
      <div
        className={classNames(
          'form text-sm',
          this.props.className,
        )}
      >
        <div className="form-group-container">
          {React.Children.map(
            this.props.children,
            (child) => {
              if (child && child.type === FormGroup) {
                return React.cloneElement(
                  child,
                  {
                    vertical: this.props.vertical,
                    labelWidth: this.props.labelWidth,
                  },
                );
              }

              return child;
            },
          )}
        </div>
      </div>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
