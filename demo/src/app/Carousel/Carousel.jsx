import React from 'react';

import pic1 from './images/1.png';
import pic2 from './images/2.png';
import pic3 from './images/3.png';
import ShowcaseContainer from '../ShowcaseContainer/ShowcaseContainer';
import Carousel from '../../../../src/Carousel';
import Image from '../../../../src/Image';

class CarouselShowcase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.slider = React.createRef();
  }

  state = {
    dataSource: [pic1, pic2, pic3],
    height: null,
  };

  componentDidMount() {
    this.updateHeight();
  }

  updateHeight() {
    this.setState({ height: this.slider.current.clientWidth });
  }

  render() {
    return (
      <ShowcaseContainer title="Carousel">
        <div
          className="border"
          ref={this.slider}
          style={{
            height: this.state.height,
          }}
        >
          <Carousel
            dataSource={this.state.dataSource}
            renderSlide={url => (
              <Image src={url} mode={Image.MODE_OUTER_CUT} width="100%" height="100%" />
            )}
            enableLoop
            hasPageTurner
          />
        </div>
      </ShowcaseContainer>
    );
  }
}

export default CarouselShowcase;
