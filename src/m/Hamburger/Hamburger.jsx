import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style/index.scss';
import Clickable from '../../Clickable';

const propTypes = {
  active: PropTypes.bool,
  onActiveChange: PropTypes.func,
};

const defaultProps = {
  active: null,
  onActiveChange: () => {},
};

class Hamburger extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  getActive() {
    return this.props.active == null ? this.state.active : this.props.active;
  }

  setActive(active) {
    if (this.props.active == null) {
      this.setState({ active });
    } else {
      this.props.onActiveChange(active);
    }
  }

  render() {
    const active = this.getActive();

    return (
      <Clickable
        onClick={() => this.setActive(!active)}
      >
        <div
          className={classNames(
            style.hamburger,
            { active },
          )}
        >
          <span />
          <span />
          <span />
        </div>
      </Clickable>
    );
  }
}

Hamburger.propTypes = propTypes;
Hamburger.defaultProps = defaultProps;

export default Hamburger;
