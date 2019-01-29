import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import { domRelatedProps } from './utils/dom';

class Image extends React.PureComponent {
  static MODE_STRETCH = 'stretch';
  static MODE_AUTO = 'auto';
  static MODE_OUTER_CUT = 'outer_cut';
  static MODE_INNER_CUT = 'inner_cut';

  static propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    mode: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    className: PropTypes.string,
    backgroundColor: PropTypes.string,
  };

  static defaultProps = {
    src: null,
    alt: 'image',
    width: null,
    height: null,
    mode: 'auto',
    className: null,
    backgroundColor: '#fff',
  };

  constructor(props) {
    super(props);

    this.state = {
      width: null,
      height: null,
      marginLeft: null,
      marginTop: null,
      hasLoaded: false,
    };

    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount() {
    if (this.props.mode === Image.MODE_AUTO) {
      return;
    }

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    if (this.props.mode === Image.MODE_STRETCH) {
      // eslint-disable-next-line
      this.setState({ width, height });
    }
  }

  onLoad() {
    const { clientWidth: containerWidth, clientHeight: containerHeight } = this.container;
    const { clientWidth: imageWidth, clientHeight: imageHeight } = this.fakeImage;

    const containerAspectRatio = containerWidth / containerHeight;
    const imageAspectRatio = imageWidth / imageHeight;

    let width;
    let height;
    let marginLeft;
    let marginTop;

    if (this.props.mode === Image.MODE_OUTER_CUT) {
      if (containerAspectRatio >= imageAspectRatio) {
        width = containerWidth;
        height = width / imageAspectRatio;
        marginTop = -0.5 * (height - containerHeight);
      } else {
        height = containerHeight;
        width = height * imageAspectRatio;
        marginLeft = -0.5 * (width - containerWidth);
      }
    } else if (this.props.mode === Image.MODE_INNER_CUT) {
      if (containerAspectRatio >= imageAspectRatio) {
        height = containerHeight;
        width = height * imageAspectRatio;
        marginLeft = 0.5 * (containerWidth - width);
      } else {
        width = containerWidth;
        height = width / imageAspectRatio;
        marginTop = 0.5 * (containerHeight - height);
      }
    }

    this.setState({
      hasLoaded: true,
      height,
      width,
      marginTop,
      marginLeft,
    });
  }

  render() {
    const domProps = pick(this.props, domRelatedProps);

    if (this.props.mode === Image.MODE_AUTO) {
      return (
        <img
          {...domProps}
          className={this.props.className}
          src={this.props.src}
          alt={this.props.alt}
          style={{ width: this.props.width, height: 'auto' }}
        />
      );
    }

    return (
      <div
        {...domProps}
        style={{
          width: this.props.width,
          height: this.props.height,
          overflow: 'hidden',
          backgroundColor: this.props.backgroundColor,
        }}
        ref={(el) => { this.container = el; }}
        className={this.props.className}
      >
        <img
          src={this.props.src}
          alt={this.props.alt}
          style={{
            width: this.state.width,
            height: this.state.height,
            marginLeft: this.state.marginLeft,
            marginTop: this.state.marginTop,
          }}
        />

        {this.props.mode !== Image.MODE_STRETCH && !this.state.hasLoaded && (
          <img
            style={{ opacity: 0, position: 'fixed' }}
            src={this.props.src}
            alt={this.props.alt}
            ref={(el) => { this.fakeImage = el; }}
            onLoad={this.onLoad}
          />
        )}
      </div>
    );
  }
}

export default Image;
