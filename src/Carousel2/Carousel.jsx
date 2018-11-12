import React from 'react';
import PropTypes from 'prop-types';

import Image from '../Image';
import Clickable from '../Clickable';

import './style.scss';

class Carousel extends React.PureComponent {
  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}),
    ])).isRequired,
    renderItem: PropTypes.func,
    // interval: PropTypes.number,
    enableLoop: PropTypes.bool,
    hasPageTurner: PropTypes.bool,
    cursorIndex: PropTypes.number,
  };

  static defaultProps = {
    renderItem: null,
    // interval: null,
    enableLoop: false,
    hasPageTurner: false,
    cursorIndex: 0,
  };

  constructor(props) {
    super(props);

    this.container = React.createRef();

    this.state = {
      width: 0,
      cursorIndex: this.props.cursorIndex,
    };
  }

  componentDidMount() {
    this.updateWidth();
  }

  updateWidth = () => {
    this.setState({ width: this.container.current.clientWidth });
  };

  prev = () => {
    const { cursorIndex } = this.state;

    if (this.props.enableLoop || cursorIndex > 0) {
      this.setState({ cursorIndex: cursorIndex - 1 });
    }
  };

  next = () => {
    const { cursorIndex } = this.state;

    if (this.props.enableLoop || cursorIndex < this.props.dataSource.length - 1) {
      this.setState({ cursorIndex: cursorIndex + 1 });
    }
  };

  render() {
    const { renderItem } = this.props;
    const { width, cursorIndex } = this.state;

    return (
      <div className="carousel" ref={this.container}>
        <div
          className="carousel-inner"
          style={{
            transform: `translateX(-${cursorIndex * width}px)`,
          }}
        >
          {this.props.dataSource.map((item, index) => (
            <div
              key={`${index + 1}`}
              className="carousel-item"
              style={{
                width,
                left: index * width,
              }}
            >
              {renderItem != null
                ? renderItem(item)
                : (
                  <Image width="100%" height="100%" src={item} />
                )}
            </div>
          ))}
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
