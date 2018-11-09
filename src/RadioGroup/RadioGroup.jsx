import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style/index.scss';
import Input from '../Input';

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.any]),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    title: PropTypes.string,
  })),
  onChange: PropTypes.func,
  renderOption: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
};

const defaultProps = {
  value: null,
  options: [],
  onChange: () => null,
  renderOption: null,
  className: null,
  name: null,
};

class RadioGroup extends React.PureComponent {
  static getId(value) {
    return `form-check-option-id-${value}`;
  }

  render() {
    const { renderOption } = this.props;

    return (
      <div
        className={classNames(
          'radio-groups',
          this.props.className,
        )}
      >
        {this.props.options.map(option => (renderOption
          ? renderOption(option)
          : (
            <div className="form-check" key={option.value}>
              <Input
                id={RadioGroup.getId(option.value)}
                onChange={() => this.props.onChange(option.value)}
                type="radio"
                checked={option.value === this.props.value}
                className="form-check-input"
                name={this.props.name}
              />

              <label
                htmlFor={RadioGroup.getId(option.value)}
                className="form-check-label"
              >
                {option.title}
              </label>
            </div>
          )))}
      </div>
    );
  }
}

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;

export default RadioGroup;
