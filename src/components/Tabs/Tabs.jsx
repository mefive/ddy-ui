import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style/index.scss';

const propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
  })),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  currentClassName: PropTypes.string,
  onChange: PropTypes.func,
  renderTitle: PropTypes.func,
};

const defaultProps = {
  dataSource: [],
  className: null,
  itemClassName: null,
  currentClassName: 'current',
  onChange: () => {},
  value: null,
  renderTitle: null,
};

class Tabs extends React.PureComponent {
  render() {
    return (
      <div
        className={this.props.className}
      >
        {this.props.dataSource.map((tab, index) => (
          <div
            aria-hidden
            className={classNames(
              this.props.itemClassName,
              { [this.props.currentClassName]: tab.value === this.props.value },
            )}
            onClick={() => this.props.onChange(tab.value)}
            key={`${index + 1}`}
          >
            {this.props.renderTitle != null ? this.props.renderTitle(tab) : tab.title}
          </div>
        ))}
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
