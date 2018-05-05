import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style/index.scss';

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.any]),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    title: PropTypes.string,
  })),
  onChange: PropTypes.func,
  renderLabel: PropTypes.func,
  className: PropTypes.string,
};

const defaultProps = {
  value: null,
  options: [],
  onChange: () => null,
  renderLabel: null,
  className: null,
};

class RadioGroup extends React.PureComponent {
  render() {
    return (
      <div
        className={classNames(
          'radio-groups',
          this.props.className,
        )}
      >
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
              {this.props.renderLabel == null ? option.title : this.props.renderLabel(option)}
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
