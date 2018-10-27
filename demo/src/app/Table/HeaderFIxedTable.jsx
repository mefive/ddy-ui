import React from 'react';
import ShowcaseContainer from '../ShowcaseContainer';
import Table from '../../../../src/Table';
import { employeeDataSource, employeeKeys } from './rawData';

class HeaderFixedTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: employeeKeys.map(key => ({
        title: key.replace(/^w/, f => f.toUpperCase()),
        key,
      })),
      dataSource: employeeDataSource.map(row => row.reduce((p, c, index) => ({
        ...p,
        [employeeKeys[index]]: c,
      }), {})),
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Header fixed">
        <div className="d-flex flex-column" style={{ height: 500 }}>
          <Table
            className="custom-table"
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            height="flex"
          />
        </div>
      </ShowcaseContainer>
    );
  }
}

export default HeaderFixedTable;
