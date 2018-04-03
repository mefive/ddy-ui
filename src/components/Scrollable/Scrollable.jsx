import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Draggable from '../Draggable';

import './style/index.scss';

const propTypes = {
  height: PropTypes.number.isRequired,
};

const defaultProps = {
  height: 0,
};

const defaultState = {
  scrollTop: 0,
  scrollHeight: 0,
  thumbSize: 0,
  thumbOffset: 0,
};

class Scrollable extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
    this.onWheel = ::this.onWheel;
  }

  componentDidMount() {
    this.setState({
      ...defaultState,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { scrollTop } = this.state;
    const { wrapper } = this;

    if (prevState.scrollTop !== scrollTop) {
      wrapper.scrollTop = scrollTop;
      this.syncThumb();
    } else {
      const { scrollHeight } = wrapper;

      if (scrollHeight !== this.state.scrollHeight) {
        this.setState({ scrollHeight });
        this.syncThumb();
      }
    }
  }

  onWheel(e) {
    const { deltaY } = e;

    const scrollTop = this.wrapper.scrollTop + deltaY;

    if (scrollTop === this.restrictScrollTop(scrollTop)) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({ scrollTop: this.restrictScrollTop(scrollTop) });
  }

  restrictScrollTop(scrollTop) {
    let top = scrollTop;

    const max = this.wrapper.scrollHeight - this.props.height;
    const min = 0;

    top = Math.max(top, min);
    top = Math.min(top, max);

    return top;
  }

  syncThumb() {
    const ratio = this.getRatio();

    const thumbSize = this.props.height * ratio;
    const thumbOffset = this.state.scrollTop * ratio;

    this.setState({ thumbSize, thumbOffset });
  }

  getRatio() {
    const { wrapper } = this;
    const { height } = this.props;

    return height / wrapper.scrollHeight;
  }

  render() {
    const { wrapper } = this;

    return (
      <div className="scrollable">
        <div
          className="scrollable-wrapper"
          ref={wrapper => this.wrapper = wrapper}
          style={{
            height: this.props.height,
          }}
          onWheel={this.onWheel}
        >
          {this.props.children}
        </div>

        {this.state.thumbSize < this.props.height && (
          <div className="scrollable-track">
            <Draggable
              containerWidth={0}
              containerHeight={wrapper ? wrapper.clientHeight : 0}
              top={this.state.thumbOffset}
              onTopChange={(top) => {
                const scrollTop = top / this.getRatio();

                this.setState({ scrollTop: this.restrictScrollTop(scrollTop) });
              }}
            >
              <div
                className="scrollable-thumb"
                style={{
                  height: this.state.thumbSize,
                }}
              />
            </Draggable>
          </div>
        )}
      </div>
    );
  }
}

Scrollable.propTypes = propTypes;
Scrollable.defaultProps = defaultProps;

export default Scrollable;
