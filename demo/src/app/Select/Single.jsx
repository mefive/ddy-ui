import React from 'react';
import random from 'lodash/random';
import ShowcaseContainer from '../ShowcaseContainer/ShowcaseContainer';
import Select from '../../../../src/Select';

class Single extends React.PureComponent {
  state = {
    value: null,
    options: Array(20).fill(0).map((i, index) => ({
      value: index,
      title: `${random(100, 200)}`,
    })),
  };

  render() {
    return (
      <ShowcaseContainer title="Single">
        <Select
          options={this.state.options}
          value={this.state.value}
          onChange={value => this.setState({ value })}
        />
      </ShowcaseContainer>
    );
  }
}

export default Single;
