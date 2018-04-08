import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import StaticCard from './StaticCard';
import AnimatedCard from './AnimatedCard';

import style from './style/index.scss';
import './style/flip.sass';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
};

const defaultProps = {
  className: null,
  value: 0,
};

class NumberFlip extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      lastValue: this.props.value,
      shuffle: false,
    };
  }

  componentWillReceiveProps({ value }) {
    if (value !== this.props.value) {
      this.setState({
        value,
        lastValue: this.props.value,
        shuffle: !this.state.shuffle,
      });
    }
  }

  render() {
    console.log('render');

    const { lastValue, value, shuffle } = this.state;

    // shuffle digits
    const digit1 = shuffle ? lastValue : value;
    const digit2 = !shuffle ? lastValue : value;

    // shuffle animations
    const animation1 = shuffle ? 'fold' : 'unfold';
    const animation2 = !shuffle ? 'fold' : 'unfold';

    return (
      <div
        ref={(el) => { this.container = el; }}
        className={classNames(
          style.container,
          this.props.className,
        )}
      >
        <div className="flipUnitContainer">
          <StaticCard position="upperCard" digit={this.state.value} />
          <StaticCard position="lowerCard" digit={this.state.lastValue} />
          <AnimatedCard position="first" digit={digit1} animation={animation1} />
          <AnimatedCard position="second" digit={digit2} animation={animation2} />
        </div>
      </div>
    );
  }
}

NumberFlip.propTypes = propTypes;
NumberFlip.defaultProps = defaultProps;

export default NumberFlip;
