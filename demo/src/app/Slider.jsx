import React from 'react';
import ShowcaseContainer from './ShowcaseContainer/ShowcaseContainer';
import Slider from '../../../src/Slider/Slider';

class ShowcaseSlider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Slider">
        <div>
          <div className="d-inline-block">
            <Slider
              width={200}
              value={this.state.value}
              onChange={value => this.setState({ value })}
              step={20}
            />
          </div>

          <span className="ml-3 align-middle">{this.state.value}</span>
        </div>

        <div className="mt-2">
          <div className="d-inline-block">
            <Slider
              width={200}
              value={this.state.value}
              onChange={value => this.setState({ value })}
            />
          </div>

          <span className="ml-3 align-middle">{this.state.value}</span>
        </div>

      </ShowcaseContainer>
    );
  }
}

export default ShowcaseSlider;
