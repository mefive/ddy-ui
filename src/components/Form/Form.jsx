import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormGroup from './FormGroup';

import './style/index.scss';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  labelWidth: PropTypes.number,
};

const defaultProps = {
  className: null,
  children: null,
  labelWidth: null,
};

class Form extends React.PureComponent {
  render() {
    return (
      <div
        className={classNames(
          'form',
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
