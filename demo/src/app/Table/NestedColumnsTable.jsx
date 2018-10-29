import React from 'react';
import ShowcaseContainer from '../ShowcaseContainer';
import Table from '../../../../src/Table2';
import { employeeDataSource, employeeKeys } from './rawData';

class NestedColumnsTable extends React.PureComponent {
  constructor(props) {
    super(props);

    const keys = employeeKeys.slice(1, employeeKeys.length);

    this.state = {
      columns: [{
        title: 'Name',
        key: 'name',
        align: 'center',
        children: [{
          title: 'First',
          key: 'firstName',
          render: ({ name }) => name.split(' ')[0],
        }, {
          title: 'Last',
          key: 'lastName',
          render: ({ name }) => name.split(' ')[1],
        }],
      }, ...keys.map(key => ({
        title: key.replace(/^w/, f => f.toUpperCase()),
        key,
      }))],
      dataSource: employeeDataSource.slice(0, 3).map(row => row.reduce((p, c, index) => ({
        ...p,
        [employeeKeys[index]]: c,
      }), {})),
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Nested columns">
        <Table
          className="custom-table"
          columns={this.state.columns}
          dataSource={this.state.dataSource}
        />
      </ShowcaseContainer>
    );
  }
}

export default NestedColumnsTable;
