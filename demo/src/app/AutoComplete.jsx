import React from 'react';
import ShowcaseContainer from './ShowcaseContainer';
import AutoComplete from '../../../src/AutoComplete/AutoComplete';

const dataSource = [
  'a',
  'a1',
  'a1a',
];

class AutoCompleteShowcase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: [],
    };
  }

  render() {
    return (
      <ShowcaseContainer>
        <div style={{ width: 500 }}>
          <AutoComplete
            value={this.state.value}
            onChange={value => this.setState({ value })}
            multiple
            getOptions={async keyword => dataSource.filter(d =>
              d.startsWith(keyword)).map(d => ({
                title: d,
                value: d,
              }))}
          />
        </div>
      </ShowcaseContainer>
    );
  }
}

export default AutoCompleteShowcase;
