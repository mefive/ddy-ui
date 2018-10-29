import React from 'react';
import { dailyBasicKeys, dailyBaiscKeyNames, dailyBaiscDataSource } from './rawData';
import ShowcaseContainer from '../ShowcaseContainer';
import Table from '../../../../src/Table2';
import Switch from '../../../../src/Switch/Switch';

class AllFeaturedTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      dataSource: dailyBaiscDataSource,
      fixedHeight: 500,
      loading: false,
      page: null,
    };
  }

  componentWillMount() {
    this.updateColumns();
  }

  updateColumns(fixedCount) {
    this.setState({
      columns: dailyBasicKeys.map((key, index) => ({
        key,
        title: dailyBaiscKeyNames[key],
        fixed: index < fixedCount,
      })),
    });
  }

  render() {
    return (
      <ShowcaseContainer title="All featured">
        <div className="p-2 ml-n3 mt-n2">
          <div className="d-inline-block ml-3 mt-2">
            Loading
            <Switch
              className="d-inline-block align-middle ml-1"
              value={this.state.loading}
              onChange={loading => this.setState({ loading })}
            />
          </div>

          <div className="d-inline-block ml-3 mt-2">
            Paging
            <Switch
              className="d-inline-block align-middle ml-1"
              value={this.state.page != null}
              onChange={page => this.setState({ page: page ? 1 : null })}
            />
          </div>

          <div className="d-inline-block ml-3 mt-2">
            Fix header
            <Switch
              className="d-inline-block align-middle ml-1"
              value={this.state.fixedHeight != null}
              onChange={fixed => this.setState({ fixedHeight: fixed ? 500 : null })}
            />
          </div>

          <div className="d-inline-block ml-3 mt-2">
            Fix column
            <Switch
              className="d-inline-block align-middle ml-1"
              value={this.state.columns.some(({ fixed }) => fixed)}
              onChange={fixed => this.updateColumns(fixed ? 1 : 0)}
            />
          </div>
        </div>

        <Table
          className="custom-table"
          columns={this.state.columns}
          dataSource={this.state.dataSource}
          noWrap
          height={this.state.fixedHeight}
          loading={this.state.loading}
          pagination={this.state.page == null ? null : {
            page: this.state.page,
            onChange: page => this.setState({ page }),
            rowsPerPage: 10,
          }}
        />
      </ShowcaseContainer>
    );
  }
}

export default AllFeaturedTable;
