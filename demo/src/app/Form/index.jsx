import React from 'react';
import ShowcaseContainer from '../ShowcaseContainer';
import TestForm from './TestForm';

class ShowcaseForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: {
        name: 'mefive',
      },
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Form">
        <TestForm
          dataSource={this.state.dataSource}
          onChange={(key, value) => this.setState({
            dataSource: {
              ...this.state.dataSource,
              [key]: value,
            },
          })}
        />
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseForm;
