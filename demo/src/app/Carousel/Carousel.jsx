import React from 'react';

import pic0 from './images/0.png';
import pic1 from './images/1.png';
import pic2 from './images/2.png';
import pic3 from './images/3.png';
import pic4 from './images/4.png';
import pic5 from './images/5.png';
import pic6 from './images/6.png';
import pic7 from './images/7.png';
import pic8 from './images/8.png';
import pic9 from './images/9.png';
import ShowcaseContainer from '../ShowcaseContainer/ShowcaseContainer';
import Carousel from '../../../../src/Carousel2';

const dataSource = [pic0, pic1, pic2];

class CarouselShowcase extends React.PureComponent {
  render() {
    return (
      <ShowcaseContainer title="Carousel">
        <div
          style={{ width: 500, height: 500, margin: '0 auto' }}
          className="border"
        >
          <Carousel
            // dataSource={Array(2).fill(0).map((n, index) => ({
            //   render: () => (
            //     <div data-key={index} style={{ lineHeight: '500px', textAlign: 'center', fontSize: '40px' }}>
            //       {index}
            //     </div>
            //   ),
            // }))}
            dataSource={dataSource}
            hasPageTurner
          />
        </div>
      </ShowcaseContainer>
    );
  }
}

export default CarouselShowcase;
