import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style/index.scss';
import Clickable from '../Clickable';

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
          <Clickable
            onClick={() => this.props.onChange(tab.value)}
          >
            <div
              className={classNames(
                this.props.itemClassName,
                { [this.props.currentClassName]: tab.value === this.props.value },
              )}
              key={`${index + 1}`}
            >
              {this.props.renderTitle != null ? this.props.renderTitle(tab) : tab.title}
            </div>
          </Clickable>
        ))}
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
