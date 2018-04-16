import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style/index.scss';
import Portal from '../../Portal';

const propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  visible: false,
  children: null,
  className: null,
};

const SlideDownPopover = props => (
  <Portal>
    <div
      className={classNames(
        'slide-down-popover',
        props.className,
        { active: props.visible },
      )}
    >
      {props.children}
    </div>
  </Portal>
);

SlideDownPopover.propTypes = propTypes;
SlideDownPopover.defaultProps = defaultProps;

export default SlideDownPopover;
