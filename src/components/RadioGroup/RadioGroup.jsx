import React from 'react';
import PropTypes from 'prop-types';

import './style/index.scss';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    title: PropTypes.string,
  })),
  onChange: PropTypes.func,
};

const defaultProp = {
  options: [],
  onChange: () => null,
};

class RadioGroup extends React.Component {
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
RadioGroup.defaultProp = defaultProp;

export default RadioGroup;
