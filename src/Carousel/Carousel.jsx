import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import style from 'dom-helpers/style';
import addClass from 'dom-helpers/class/addClass';
import hasClass from 'dom-helpers/class/hasClass';
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
  interval: 5000,
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
    this.next = throttle(this.next.bind(this), TRANSITION_DURATION, { trailing: false });
    this.prev = throttle(this.prev.bind(this), TRANSITION_DURATION, { trailing: false });
  }

  componentDidMount() {
    this.hasMounted = true;
    this.enableTransition();
    this.setWidth();
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

  start() {
    return;
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
    const { length } = this.props.dataSource;

    let { current } = this.state;

    current += 1;

    if (current === length - 1) {
      this.setState({
        dataSource: [...this.props.dataSource, this.props.dataSource[0]],
      });
    }

    if (current === length) {
      setTimeout(() => {
        if (this.hasMounted) {
          this.disableTransition();

          this.setState({
            dataSource: [...this.props.dataSource],
            current: 0,
          });
        }
      }, TRANSITION_DURATION);
    }

    this.setState({ current }, callback);
  }

  prev(callback) {
    let { current } = this.state;
    const { length } = this.props.dataSource;

    current -= 1;

    if (current === 0) {
      this.setState({
        current,
      }, () => this.setState({
        dataSource: [this.props.dataSource[length - 1], ...this.props.dataSource],
      }));

      this.setState({
        dataSource: [this.props.dataSource[length - 1], ...this.props.dataSource],
      });

      current = 1;
    }

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

        {this.props.hasPageTurner && (
          <Clickable
            onClick={() => {
              this.stop();
              this.prev(() => this.start());
            }}
          >
            <div className="carousel-page-turner-left">
              <i className="icon icon-angle-left" />
            </div>
          </Clickable>
        )}

        {this.props.hasPageTurner && (
          <Clickable
            onClick={() => {
              this.stop();
              this.next(() => this.start());
            }}
          >
            <div className="carousel-page-turner-right">
              <i className="icon icon-angle-right" />
            </div>
          </Clickable>
        )}
      </div>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel;
