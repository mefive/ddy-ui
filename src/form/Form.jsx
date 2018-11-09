import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  className: null,
  children: null,
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
        <div>
          {this.props.children}
        </div>

        <input type="submit" className="d-none" />
      </form>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
