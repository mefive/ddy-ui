import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Hammer from 'hammerjs';

import Image from '../Image';
import Clickable from '../Clickable';
import { isMobile } from '../utils/browser';

import './style.scss';

class Carousel extends React.PureComponent {
  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}),
    ])).isRequired,
    renderSlide: PropTypes.func,
    // interval: PropTypes.number,
    enableLoop: PropTypes.bool,
    hasIndicator: PropTypes.bool,
    hasPageTurner: PropTypes.bool,
    slideIndex: PropTypes.number,
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    renderSlide: null,
    // interval: null,
    enableLoop: false,
    hasIndicator: true,
    hasPageTurner: false,
    slideIndex: 0,
    transitionDuration: 500,
  };

  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.scroller = React.createRef();
  }

  state = {
    width: 0,
    slideIndex: this.props.slideIndex,
    leadingSlides: [],
    trailingSlides: [],
    disableTransition: false,
    panningDelta: 0,
  };

  componentDidMount() {
    this.updateWidth();

    if (isMobile()) {
      const hammer = Hammer(this.container.current);

      hammer.on('pan', (e) => {
        this.setState({ panningDelta: e.deltaX, disableTransition: true  });
      });

      hammer.on('panend', () => this.setState({ panningDelta: 0, disableTransition: false }));

      hammer.on('swipe', (e) => {
        this.setState({ panningDelta: 0 });

        if (e.deltaX > 0) {
          this.prev();
        }

        if (e.deltaX < 0) {
          this.next();
        }
      });
    }
  }

  componentWillUnmount() {
    this.clearRecoverTimer();
  }

  get scrollLeft() {
    const {
      slideIndex, leadingSlides, trailingSlides, width, panningDelta,
    } = this.state;
    const { dataSource } = this.props;

    if (panningDelta !== 0) {
      return (slideIndex * width) - panningDelta;
    }

    if (leadingSlides.length > 0) {
      return -leadingSlides.length * width;
    }

    if (trailingSlides.length > 0) {
      return (dataSource.length + (trailingSlides.length - 1)) * width;
    }

    return slideIndex * width;
  }

  clearRecoverTimer = () => {
    if (this.recoverTimer) {
      clearTimeout(this.recoverTimer);
      this.recoverTimer = null;
    }
  };

  recover = () => {
    this.setState({ leadingSlides: [], trailingSlides: [], disableTransition: true });
  };

  updateWidth = () => {
    this.setState({ width: this.container.current.clientWidth });
  };

  prev = () => {
    const { slideIndex, leadingSlides } = this.state;
    const { dataSource } = this.props;

    if (this.props.enableLoop || slideIndex > 0) {
      if (slideIndex === 0 || leadingSlides.length > 0) {
        this.clearRecoverTimer();

        const prependSlideIndex
          = dataSource.length - (leadingSlides.length % dataSource.length) - 1;

        this.setState({
          slideIndex: prependSlideIndex,
          leadingSlides: [
            dataSource[prependSlideIndex],
            ...leadingSlides,
          ],
        });

        this.recoverTimer = setTimeout(this.recover, this.props.transitionDuration);
      } else {
        this.setState({ slideIndex: slideIndex - 1 });
      }

      this.setState({ disableTransition: false });
    }
  };

  next = () => {
    const { slideIndex, trailingSlides } = this.state;
    const { dataSource } = this.props;

    if (this.props.enableLoop || slideIndex < dataSource.length - 1) {
      if (slideIndex === this.props.dataSource.length - 1 || trailingSlides.length > 0) {
        this.clearRecoverTimer();

        const appendSlideIndex = trailingSlides.length % dataSource.length;

        this.setState({
          slideIndex: appendSlideIndex,
          trailingSlides: [
            ...trailingSlides,
            dataSource[appendSlideIndex],
          ],
        });

        this.recoverTimer = setTimeout(this.recover, this.props.transitionDuration);
      } else {
        this.setState({ slideIndex: slideIndex + 1 });
      }

      this.setState({ disableTransition: false });
    }
  };

  renderSlide = (slide, index) => {
    const { renderSlide } = this.props;
    const { width } = this.state;

    return (
      <div
        key={`${index + 1}`}
        className="carousel-item"
        style={{
          width,
          left: index * width,
        }}
      >
        {renderSlide != null
          ? renderSlide(slide)
          : (
            <Image width="100%" height="100%" src={slide} />
          )}
      </div>
    );
  };

  render() {
    const { scrollLeft } = this;
    const { dataSource } = this.props;
    const {
      slideIndex,
      leadingSlides,
      trailingSlides,
      disableTransition,
      panningDelta,
    } = this.state;

    return (
      <div className="carousel" ref={this.container}>
        <div
          ref={this.scroller}
          className={classNames(
            'carousel-inner',
            { 'disable-transition': disableTransition },
          )}
          style={{
            transform: `translateX(${-scrollLeft}px)`,
            transitionDuration: `${this.props.transitionDuration}ms`,
          }}
        >
          {leadingSlides.map((slide, index) =>
            this.renderSlide(slide, -(leadingSlides.length - index)))}

          {dataSource.map(this.renderSlide)}

          {trailingSlides.map((slide, index) => this.renderSlide(slide, dataSource.length + index))}
        </div>

        {this.props.hasIndicator && dataSource.length > 1 && (
          <ol className="carousel-indicators">
            {dataSource.map((slide, index) => (
              <li
                key={`${index + 1}`}
                className={classNames({ active: index === slideIndex })}
              />
            ))}
          </ol>
        )}

        {this.props.hasPageTurner && !isMobile() && (
          <React.Fragment>
            <Clickable onClick={this.prev}>
              <div className="carousel-control-prev">
                <div className="carousel-control-prev-icon" />
              </div>
            </Clickable>

            <Clickable onClick={this.next}>
              <div className="carousel-control-next">
                <div className="carousel-control-next-icon" />
              </div>
            </Clickable>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Carousel;
