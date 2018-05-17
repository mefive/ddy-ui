import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Clickable from '../Clickable';

import './style/index.scss';

const propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  trueText: PropTypes.string,
  falseText: PropTypes.string,
  width: PropTypes.number,
};

const defaultProps = {
  value: null,
  onChange: () => {},
  trueText: '开',
  falseText: '关',
  width: null,
};

class Switch extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      ready: false,
    };
  }

  componentDidMount() {
    this.setWidth();
  }

  setWidth() {
    this.setState({
      width: this.node.clientWidth,
    }, () => this.setState({ ready: true }));
  }

  render() {
    const {
      value, width, trueText, falseText,
    } = this.props;

    return (
      <Clickable
        onClick={() => this.props.onChange(!value)}
      >
        <div
          className={classNames(
            'switch',
            { ready: this.state.ready },
            { checked: value },
          )}
          style={{ width }}
          ref={(el) => { this.node = el; }}
        >
          <div
            className="switch-ball"
            style={{
              left: value ? this.state.width - 2 - 20 : 2,
            }}
          />

          <span className="switch-text">
            {value ? trueText : falseText}
          </span>
        </div>
      </Clickable>
    );
  }
}

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
