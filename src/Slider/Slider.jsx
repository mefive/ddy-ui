import React from 'react';
import PropTypes from 'prop-types';
import contains from 'dom-helpers/query/contains';

import './style/index.scss';
import Clickable from '../Clickable';
import Draggable from '../Draggable';

const propTypes = {
  value: PropTypes.oneOfType([PropTypes.any]),
  onChange: PropTypes.func,
  onStopDragging: PropTypes.func,
  onClick: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  width: PropTypes.number,
};

const defaultProps = {
  value: null,
  onChange: () => {},
  onClick: () => {},
  onStopDragging: () => {},
  min: 0,
  max: 100,
  step: 1,
  width: 100,
};

class Slider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      railWidth: 0,
    };

    this.clicked = false;

    this.onClick = this.onClick.bind(this);
    this.setValueByLeft = this.setValueByLeft.bind(this);
  }

  componentDidMount() {
    this.setRailWidth();
  }

  componentWillReceiveProps({ value }) {
    if (this.props.value !== value) {
      if (this.clicked) {
        this.clicked = false;
        this.props.onClick();
      }
    }
  }

  onClick(e) {
    if (e.target === this.thumb.node || contains(e.target, this.thumb.node)) {
      return;
    }

    const left = e.clientX - this.rail.getBoundingClientRect().left;
    this.setValueByLeft(left);
    this.clicked = true;
  }

  getPercent() {
    if (this.props.value == null) {
      return 0;
    }

    const total = this.props.max - this.props.min;

    if (total === 0) {
      return 0;
    }

    return Math.max(0, this.props.value / total) * 100;
  }

  getCorrectionValue(value) {
    const { step } = this.props;

    const mod = value % step;

    let correctValue = value - mod;

    if (mod > (step / 2)) {
      correctValue += step;
    }

    return Math.max(this.props.min, Math.min(this.props.max, correctValue));
  }

  setRailWidth() {
    this.setState({
      railWidth: this.rail.clientWidth,
    });
  }

  setValueByLeft(left) {
    const total = this.rail.clientWidth;

    const value = Math.ceil((left / total) * (this.props.max - this.props.min));

    this.props.onChange(this.getCorrectionValue(value));
  }

  render() {
    const percent = this.getPercent();

    return (
      <div>
        <div className="d-inline-block align-middle mr-2">{this.props.min}</div>

        <Clickable onClick={this.onClick}>
          <div className="slider" style={{ width: this.props.width }}>

            <div
              className="slider-rail"
              ref={(el) => { this.rail = el; }}
            />

            <div
              className="slider-track"
              style={{ width: `${percent}%` }}
            />

            <Draggable
              containerWidth={this.state.railWidth + 6}
              containerHeight={0}
              left={(percent * this.state.railWidth) / 100}
              onLeftChange={this.setValueByLeft}
              onStop={this.props.onStopDragging}
              ref={(el) => { this.thumb = el; }}
            >
              <div className="slider-thumb" />
            </Draggable>
          </div>
        </Clickable>

        <div className="d-inline-block align-middle ml-2">{this.props.max}</div>
      </div>
    );
  }
}

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;
