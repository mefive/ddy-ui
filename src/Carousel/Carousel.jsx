import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import addClass from 'dom-helpers/class/addClass';
import removeClass from 'dom-helpers/class/removeClass';

import './style/index.scss';
import Clickable from '../Clickable';

const propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    render: PropTypes.func,
  })),
  interval: PropTypes.number,
  hasPageTurner: PropTypes.bool,
};

const defaultProps = {
  dataSource: [],
  interval: 3000,
  hasPageTurner: false,
};

const TRANSITION_DURATION = 500;

class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [...this.props.dataSource],
      width: null,
      current: 0,
    };

    this.loopMove = this.loopMove.bind(this);
    this.start = this.start.bind(this);
    this.setPadding = this.setPadding.bind(this);
    this.next = throttle(this.next.bind(this), TRANSITION_DURATION, { trailing: false });
    this.prev = throttle(this.prev.bind(this), TRANSITION_DURATION, { trailing: false });
  }

  componentDidMount() {
    this.hasMounted = true;
    this.setWidth();
    this.setPadding();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataSource !== this.state.dataSource) {
      setTimeout(() => {
        if (this.hasMounted) {
          this.enableTransition();
        }
      }, 100);
    }
  }

  componentWillUnmount() {
    this.hasMounted = false;
    this.stop();
  }

  setWidth() {
    this.stop();

    this.setState({
      width: this.container.clientWidth,
    }, this.start);
  }

  setPadding() {
    if (!this.hasMounted) {
      return;
    }

    const { length } = this.props.dataSource;

    let { current, dataSource } = this.state;

    if (length < 2) {
      return;
    }

    if (this.state.current === this.state.dataSource.length - 1 || this.state.current === 0) {
      this.disableTransition();

      dataSource = [...dataSource];

      if (this.state.current === this.state.dataSource.length - 1) {
        if (this.state.dataSource[this.state.current] !== this.props.dataSource[0]) {
          dataSource = [...dataSource, this.props.dataSource[0]];
        } else {
          dataSource.splice(-1);
          current = 1;
        }
      }

      if (this.state.current === 0) {
        if (this.state.dataSource[0] !== this.props.dataSource[length - 1]) {
          dataSource = [this.props.dataSource[length - 1], ...dataSource];
          current = 1;
        } else {
          dataSource.splice(0, 1);
          current = length - 1;
        }
      }
    }

    this.setState({
      dataSource,
      current,
    });
  }

  start() {
    if (this.state.dataSource.length < 2
      || this.props.interval == null
      || this.props.interval < 0
    ) {
      return;
    }

    this.timer = setTimeout(this.loopMove, this.props.interval);
  }

  loopMove() {
    this.next();
    this.timer = setTimeout(this.loopMove, this.props.interval);
  }

  next(callback = () => {}) {
    let { current } = this.state;

    current += 1;

    setTimeout(this.setPadding, TRANSITION_DURATION);

    this.setState({ current }, callback);
  }

  prev(callback = () => {}) {
    let { current } = this.state;

    current -= 1;

    setTimeout(this.setPadding, TRANSITION_DURATION);

    this.setState({ current }, callback);
  }

  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  enableTransition() {
    addClass(this.container, 'ready');
  }

  disableTransition() {
    removeClass(this.container, 'ready');
  }

  render() {
    const { dataSource, width } = this.state;

    return (
      <div
        className="carousel"
        ref={(el) => { this.container = el; }}
      >
        <div
          className="carousel-wrapper"
          ref={(el) => { this.wrapper = el; }}
          style={{
            width: width && dataSource.length * width,
            left: `${-((this.state.width || 0) * this.state.current)}px`,
          }}
        >
          {dataSource.map((item, index) => (
            <div
              className="carousel-item"
              key={`${index + 1}`}
              style={{ width }}
            >
              {item.render != null
                ? item.render(item)
                : (
                  <img src={item.url} alt={item.name || 'image'} />
                )}
            </div>
          ))}
        </div>

        {this.props.hasPageTurner && this.props.dataSource.length > 1 && [
          <Clickable
            onClick={() => {
              this.stop();
              this.prev(this.start);
            }}
            key="prev"
          >
            <div className="carousel-page-turner-left">
              <i className="icon icon-angle-left" />
            </div>
          </Clickable>,

          <Clickable
            onClick={() => {
              this.stop();
              this.next(this.start);
            }}
            key="next"
          >
            <div className="carousel-page-turner-right">
              <i className="icon icon-angle-right" />
            </div>
          </Clickable>
        ]}
      </div>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel;
