import React from 'react';
import Test from './Test';
import ShowcaseContainer from '../ShowcaseContainer/ShowcaseContainer';
import Portal from '../../../../src/Portal';

class PortalShowcase extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPortal: false,
      hasMounted: false,
    };
  }

  componentDidMount() {
    setTimeout(
      () => this.setState({ showPortal: true }, () => this.setState({ hasMounted: true })),
      1000,
    );
  }

  render() {
    return (
      <ShowcaseContainer title="Portal">
        {this.state.showPortal && (
          <Portal>
            <div
              className="bold"
              ref={(el) => {
                console.log(1);
                this.portalNode = el;
              }}
            >
              Mark
            </div>
          </Portal>
        )}

        <div>
          <Test
            renderContainer={this.state.hasMounted
              ? (element) => {
                console.log(2);
                return (
                  <Portal node={this.portalNode}>{element}</Portal>
                );
              }
              : null
            }
          />
        </div>
      </ShowcaseContainer>
    );
  }
}

export default PortalShowcase;
