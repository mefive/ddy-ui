import React from 'react';
import PropTypes from 'prop-types';

import './style/index.scss';

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.any]),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    title: PropTypes.string,
  })),
  onChange: PropTypes.func,
};

const defaultProps = {
  value: null,
  options: [],
  onChange: () => null,
};

class RadioGroup extends React.PureComponent {
  render() {
    return (
      <div className="radio-group">
        {this.props.options.map(option => (
          <label key={option.value}>
            <input
              type="radio"
              checked={option.value === this.props.value}
              onChange={(e) => {
              this.props.onChange(option.value, e);
            }}
            />
            <span>
              {option.title}
            </span>
          </label>
      ))}
      </div>
    );
  }
}

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;

export default RadioGroup;
