import React from 'react';
import moment from 'moment';
import { DatePicker } from '../../../src';

import ShowcaseContainer from './ShowcaseContainer';

class ShowcaseDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment().format('YYYY-MM-DD'),
    };
  }

  render() {
    return (
      <ShowcaseContainer title="DatePicker">
        <DatePicker
          value={this.state.value}
          onChange={value => this.setState({ value })}
        />
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseDatePicker;
