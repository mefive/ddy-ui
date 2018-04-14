import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormGroup from './FormGroup';

import './style/index.scss';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  labelWidth: PropTypes.number,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  className: null,
  children: null,
  labelWidth: null,
  onSubmit: () => {},
};

class Form extends React.PureComponent {
  render() {
    return (
      <form
        className={classNames(
          'form',
          this.props.className,
        )}
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onSubmit();
        }}
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

        <input type="submit" className="hidden" />
      </form>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
