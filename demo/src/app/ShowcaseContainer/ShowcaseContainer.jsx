import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import style from './style/index.scss';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
};

const defaultProps = {
  className: null,
  children: null,
  title: null,
};

class ShowcaseContainer extends React.PureComponent {
  render() {
    return (
      <div className={classNames(
        style.container,
        this.props.className,
      )}
      >
        <h1>{this.props.title}</h1>
        <div className={style.items}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

ShowcaseContainer.propTypes = propTypes;
ShowcaseContainer.defaultProps = defaultProps;

export default ShowcaseContainer;
