import React from 'react';
import ShowcaseContainer from '../ShowcaseContainer';
import Table from '../../../../src/Table2';
import { employeeDataSource, employeeKeys } from './rawData';

class PaginationTable extends React.PureComponent {
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
      page: 1,
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Pagination">
        <div className="d-flex flex-column">
          <Table
            className="custom-table"
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            pagination={{
              page: this.state.page,
              onChange: page => this.setState({ page }, this.fetchData),
              rowsPerPage: 5,
            }}
          />
        </div>
      </ShowcaseContainer>
    );
  }
}

export default PaginationTable;
