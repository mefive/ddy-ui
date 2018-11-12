import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';

import './style.scss';

class Carousel extends React.PureComponent {
  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}),
    ])).isRequired,

    // interval: PropTypes.number,
    // hasPageTurner: PropTypes.bool,
  };

  static defaultProps = {
    // interval: null,
    // hasPageTurner: false,
  };

  constructor(props) {
    super(props);

    this.container = React.createRef();
  }

  state = {
    width: 0,
  };

  componentDidMount() {
    this.updateWidth();
  }

  updateWidth = () => {
    this.setState({ width: this.container.current.clientWidth });
  };

  render() {
    return (
      <div className="carousel" ref={this.container}>
        {this.props.dataSource.map((item, index) => (
          <div
            key={`${index + 1}`}
            className="carousel-item"
            style={{ width: this.state.width }}
          >
            {typeof item === 'string'
              ? (
                <Image width="100%" height="100%" src={item} />
              )
              : item.render(item)
            }
          </div>
        ))}
      </div>
    );
  }
}

export default Carousel;
