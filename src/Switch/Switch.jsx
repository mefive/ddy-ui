import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Clickable from '../Clickable';

import './style.scss';

class Switch extends React.PureComponent {
  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    trueText: PropTypes.string,
    falseText: PropTypes.string,
    width: PropTypes.number,
    disabled: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    value: null,
    onChange: () => {},
    trueText: null,
    falseText: null,
    width: null,
    disabled: false,
    className: null,
  };

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
    }, () => setTimeout(() => this.setState({ ready: true })));
  }

  render() {
    const {
      value, width, trueText, falseText,
    } = this.props;

    return (
      <Clickable
        onClick={() => {
          if (this.props.disabled) {
            return;
          }

          this.props.onChange(!value);
        }}
      >
        <div
          className={classNames(
            this.props.className,
            'switch',
            { ready: this.state.ready },
            { checked: value },
          )}
          style={{ width, cursor: this.props.disabled ? 'not-allowed' : null }}
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

export default Switch;
