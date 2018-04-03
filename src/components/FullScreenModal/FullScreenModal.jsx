import React from 'react';
import PropTypes from 'prop-types';

import style from './style/index.scss';
import Portal from '../Portal';
import Animate from '../Animate/Animate';

const propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  visible: false,
  onClose: () => {},
  children: null,
};

class FullScreenModal extends React.PureComponent {
  render() {
    return (
      <Animate>
        {this.props.visible && (
          <Portal>
            <div className={style.modal}>
              <div className={style.mask} />
              <div className={style.body}>
                {this.props.children}
              </div>
              <div
                className={style.close}
                aria-hidden
                onClick={() => this.props.onClose()}
              >
                <i className="icon icon-times" />
              </div>
            </div>
          </Portal>
        )}
      </Animate>
    );
  }
}

FullScreenModal.propTypes = propTypes;
FullScreenModal.defaultProps = defaultProps;

export default FullScreenModal;
