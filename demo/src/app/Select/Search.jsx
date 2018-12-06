import React from 'react';
import range from 'lodash/range';
import debounce from 'lodash/debounce';
import ShowcaseContainer from '../ShowcaseContainer/ShowcaseContainer';
import Select from '../../../../src/Select';

const words = range(500).map(number => `${number}`);

function search(keyword) {
  return words.filter(w => w.startsWith(keyword)).map(w => ({
    title: w,
    value: w,
  }));
}

class Search extends React.PureComponent {
  state = {
    options: [],
    value: null,
  };

  search = debounce((keyword) => {
    const options = search(keyword);
    this.setState({ options });
  }, 500);

  render() {
    return (
      <ShowcaseContainer title="Search">
        <Select
          options={this.state.options}
          value={this.state.value}
          onChange={value => this.setState({ value })}
          onSearch={this.search}
          showSearch
          multiple
        />
      </ShowcaseContainer>
    );
  }
}

export default Search;
