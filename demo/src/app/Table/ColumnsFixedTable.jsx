import React from 'react';

import { dailyBasicKeys, dailyBaiscKeyNames, dailyBaiscDataSource } from './rawData';
import ShowcaseContainer from '../ShowcaseContainer';
import Table from '../../../../src/Table2';

class ColumnsFixedTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: dailyBasicKeys.map((key, index) => ({
        key,
        title: dailyBaiscKeyNames[key],
        fixed: index <= 2,
      })),
      dataSource: dailyBaiscDataSource,
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Header & Columns Fixed">
        <Table
          className="custom-table"
          columns={this.state.columns}
          dataSource={this.state.dataSource}
          noWrap
          height={500}
        />
      </ShowcaseContainer>
    );
  }
}

export default ColumnsFixedTable;
