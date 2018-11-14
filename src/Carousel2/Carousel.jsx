import React from 'react';
import PropTypes from 'prop-types';
import addClass from 'dom-helpers/class/addClass';
import removeClass from 'dom-helpers/class/removeClass';

import Image from '../Image';
import Clickable from '../Clickable';

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
    hasPageTurner: PropTypes.bool,
    slideIndex: PropTypes.number,
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    renderSlide: null,
    // interval: null,
    enableLoop: false,
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
  };

  componentDidMount() {
    this.updateWidth();
  }

  componentWillUnmount() {
    this.clearRecoverTimer();
  }

  get scrollLeft() {
    const {
      slideIndex, leadingSlides, trailingSlides, width,
    } = this.state;
    const { dataSource } = this.props;

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
    this.disableTransition();
    this.setState({ leadingSlides: [], trailingSlides: [] }, () => {
      this.recoverTimer = setTimeout(this.enableTransition, 100);
    });
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
    }
  };

  enableTransition = () => removeClass(this.scroller.current, 'disable-transition');

  disableTransition = () => addClass(this.scroller.current, 'disable-transition');

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
    const { dataSource } = this.props;
    const {
      leadingSlides,
      trailingSlides,
    } = this.state;

    return (
      <div className="carousel" ref={this.container}>
        <div
          ref={this.scroller}
          className="carousel-inner"
          style={{
            transform: `translateX(${-this.scrollLeft}px)`,
            transitionDuration: `${this.props.transitionDuration}ms`,
          }}
        >
          {leadingSlides.map((slide, index) =>
            this.renderSlide(slide, -(leadingSlides.length - index)))}

          {dataSource.map(this.renderSlide)}

          {trailingSlides.map((slide, index) => this.renderSlide(slide, dataSource.length + index))}
        </div>

        {this.props.hasPageTurner && (
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
