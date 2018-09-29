import React from 'react';
import ShowcaseContainer from './ShowcaseContainer/ShowcaseContainer';
import Animate from '../../../src/Animate';
import Clickable from '../../../src/Clickable';

class AnimateShowcase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Animate">
        <div>
          <div>
            <Clickable onClick={() => this.setState({ show: !this.state.show })}>
              <div className="btn btn-primary">
                Toggle
              </div>
            </Clickable>
          </div>

          <div className="mt-2">
            <Animate
              enterClassName="slide-down-in"
              enterDuration={500}
              leaveClassName="slide-down-out"
            >
              {this.state.show && (
                <div style={{ width: 50, height: 50, background: '#000' }} />
              )}
            </Animate>
          </div>
        </div>
      </ShowcaseContainer>
    );
  }
}

export default AnimateShowcase;
