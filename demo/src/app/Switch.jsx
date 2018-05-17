import React from 'react';
import ShowcaseContainer from './ShowcaseContainer/ShowcaseContainer';
import Switch from '../../../src/Switch/Switch';

class SwitchShowcase extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Select">
        <div>
          <div style={{ width: 200 }}>
            <Switch
              value={this.state.value}
              onChange={value => this.setState({ value })}
            />
          </div>
        </div>
      </ShowcaseContainer>
    );
  }
}

export default SwitchShowcase;
