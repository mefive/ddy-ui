import React from 'react';
import PropTypes from 'prop-types';

import './style/index.scss';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
  })),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
  ]),
  onChange: PropTypes.func,
};

const defaultProps = {
  options: [],
  onChange: () => {},
  value: null,
};

class Select extends React.PureComponent {
  render() {
    const { options } = this.props;

    return (
      <select
        onChange={e => this.props.onChange(e.target.value, e)}
        value={this.props.value}
      >
        {options && options.map((option, index) => (
          <option
            value={option.value}
            key={`${index + 1}`}
          >
            {option.title}
          </option>
        ))}
      </select>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
