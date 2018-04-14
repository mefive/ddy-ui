import React from 'react';
import moment from 'moment';
import ShowcaseContainer from '../ShowcaseContainer';
import TestForm from './TestForm';

class ShowcaseForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: {
        name: 'mefive',
        birthDate: '1985-12-20',
        age: 32,
      },
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Form">
        <div className="mt-3" style={{ width: 500 }}>
          <TestForm
            dataSource={this.state.dataSource}
            onChange={(key, value) => {
              const diff = { [key]: value };

              if (key === 'birthDate') {
                diff.age = Math.floor(moment.duration(moment() - moment(value)).asYears());
              }

              this.setState({
                dataSource: {
                  ...this.state.dataSource,
                  ...diff,
                },
              });
            }}
          />
        </div>
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseForm;