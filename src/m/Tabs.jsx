import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  currentClassName: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.any,
  })),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  renderTitle: PropTypes.func,
};

const defaultProps = {
  className: null,
  onChange: () => {},
  currentClassName: 'current',
  value: null,
  options: [],
  renderTitle: null,
};

class Tabs extends React.PureComponent {
  onChange(value) {
    const { value: old, onChange } = this.props;

    if (old !== value) {
      onChange(value);
    }
  }

  render() {
    return (
      <ul className={this.props.className}>
        {this.props.options.map(option => (
          <li
            key={option.value}
            className={
              classNames({ [this.props.currentClassName]: option.value === this.props.value })
            }
            aria-hidden
            onClick={() => this.onChange(option.value)}
          >
            {this.props.renderTitle != null ? this.props.renderTitle(option) : option.title}
          </li>
        ))}
      </ul>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
