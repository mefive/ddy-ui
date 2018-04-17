import React from 'react';
import ShowcaseContainer from './ShowcaseContainer';
import Table from '../../../src/Table/Table';

const columns = ['原始渠道号', '周编号', '周新增', '0周广告点击', '0周广告收益', '1周广告点击', '1周广告收益', '新增成本'];

const rawRows = [
  ['android_oem_oppo', null, 1653044, 0, null, 0, 0, -588445.889978826],
  ['android_oem_oppo', 1, 2235285, 0, 0, 0, 0, -582024.790088176],
  ['android_oem_oppo', 2, 2229109, 0, 0, 734, 108439, -580659.790111422],
  ['tg_ff_dingkai1', 4, 2303, 0, 0, 0, 0, -725.399973392485],
  ['android_oem_oppo', 5, 2143737, 1565, 220250, 1606, 261355, -557899.290499031],
  ['android_oem_oppo', 6, 2110408, 1362, 171238, 1199, 187071, -547938.290668666],
  ['android_oem_oppo', 7, 2049930, 949, 106695, 63, 9020, -529776.090977967],
  ['android_oem_oppo', 3, 2225514, 642, 83401, 1639, 248164, -172090.797069311],
  ['android_oem_oppo', 8, 497809, 39, 3209, 0, 0, -127538.59782803],
  ['tg_ff_dingkai13', 3, 123308, 1223, 164186, 2605, 417265, -83908.4969222542],
  ['tg_ff_dingkai13', 2, 121887, 0, 0, 953, 135396, -83523.6969363685],
  ['tg_ff_dingkai13', 0, 87433, 0, 0, 0, 0, -82752.7969646451],
  ['tg_ff_dingkai13', 1, 120415, 0, 0, 0, 0, -82244.4969832895],
  ['wap_ff_yidiancd11', 4, 6400, 0, 0, 0, 0, -2562],
  ['tg_ff_dingkai13', 5, 121928, 4689, 534135, 2670, 376489, -79754.9970746036],
  ['tg_ff_dingkai13', 6, 111270, 4304, 496591, 1862, 220977, -72590.6973373889],
  ['tg_ff_dingkai13', 7, 108159, 3822, 420125, 101, 9293, -70183.0974256991],
  ['android_oem_aliyun_tx', 6, 151116, 5294, 575311, 2229, 286756, -69801.1988112925],
  ['android_oem_aliyun_tx', 5, 148278, 5436, 633415, 3129, 376026, -68587.3988319634],
  ['android_oem_aliyun_tx', 0, 93402, 0, 0, 0, 0, -66376.7988696098],
  ['android_oem_zhangzhong_tx3', 4, 1749, 0, 0, 0, 0, -562],
  ['android_oem_aliyun_tx', 3, 124942, 1757, 227249, 3242, 411405, -63807.0989133715],
  ['android_oem_aliyun_tx', 7, 138568, 3567, 371036, 120, 11446, -63804.2989134192],
  ['android_oem_aliyun_tx', 2, 122901, 0, 0, 1200, 145557, -62490.3989357948],
  ['android_oem_aliyun_tx', 1, 122546, 0, 0, 0, 0, -62235.598940134],
  ['tg_ff_fanyue1', 2, 82616, 0, 0, 597, 89675, -59693.3978104591],
  ['tg_ff_xda1', 2, 78152, 0, 0, 425, 59122, -58688.4978473186],
  ['tg_ff_fanyue1', 3, 84179, 818, 115412, 1565, 226522, -58676.7978477478],
  ['tg_ff_fanyue1', 0, 60335, 0, 0, 0, 0, -58609.1978502273],
  ['tg_ff_xda1', 3, 80667, 563, 76724, 1246, 170159, -58128.1978678703],
  ['tg_ff_fanyue1', 1, 81278, 0, 0, 0, 0, -57084.2979061603],
  ['tg_ff_xda1', 1, 75427, 0, 0, 0, 0, -55766.0979545116],
  ['tg_ff_xda1', 5, 77500, 2249, 251730, 1163, 147098, -55355.2979695797],
  ['tg_ff_xda1', 0, 53060, 0, 0, 0, 0, -55309.7979712486],
  ['tg_ff_dingkai3', 4, 1707, 0, 0, 0, 0, -623.999977111816],
  ['android_oem_lenovo', 0, 161728, 0, 0, 0, 0, -54344.5],
  ['wap_ff_anonline1', 4, 3187, 1, 60, 0, 0, -397],
  ['wap_ff_anonline2', 4, 3187, 1, 60, 0, 0, -397],
  ['wap_ff_anonline3', 4, 3187, 1, 60, 0, 0, -397],
  ['wap_ff_anonline4', 4, 3187, 1, 60, 0, 0, -397],
];

let rows = [];

(function () {
  for (let i = 0; i < 50; i += 1) {
    rows = rows.concat(rawRows.map(r => r.map((c) => {
      if (c == null) {
        return null;
      }

      return typeof c === 'string' ? `${c}${i}` : c + i;
    })));
  }
}());

function getColumns() {
  // const max = 3;
  // const rt = [];

  // for (let i = 0; i < max; i++) {
  //   rt.push({
  //     key: `${i}`,
  //     title: `${i}_column`,
  //     sortKey: `${i}`,
  //     filterable: true,
  //     noWrap: true,
  //   });
  // }

  // return rt;

  return columns.map((c, index) => ({
    key: index,
    title: c,
    // sortKey: `${i}`,
    filterable: true,
    noWrap: true,
  }));
}

function getDataSource() {
  // const max = 10;
  // const rt = [];

  // for (let i = 0; i < max; i++) {
  //   const row = {};
  //   columns.forEach((column) => {
  //     row[`${column.key}`] = `${i}_data`;
  //   });
  //   row.description = '';
  //   rt.push(row);
  // }

  // return rt;
  return rows.map(row => row.reduce(
    (p, c, i) => ({
      ...p,
      [i]: c,
    }),
    {},
  ));
}

class ShowcaseTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: getColumns(),
      dataSource: getDataSource(columns),
      selectedRowKeys: [],
      page: 1,
    };
  }

  render() {
    return (
      <div id="table">
        <ShowcaseContainer title="Table">
          <div className="table-container">
            <Table
              columns={this.state.columns}
              dataSource={this.state.dataSource}
              // height="auto"
              // fixHeader
              // fixColumnCount={2}
              rowSelection={{
                onChange: selectedRowKeys =>
                  this.setState({ selectedRowKeys }),
                selectedRowKeys: this.state.selectedRowKeys,
              }}
              defaultSort={{
                key: '2',
                direction: Table.ASC,
              }}
              // rowKey="2"
              enablePagination
              page={this.state.page}
              rowsPerPage={10}
              onPageChange={page => this.setState({ page })}
              // expandedRowRender={record => (
              //   <div className="description">
              //     {record.description}
              //   </div>
              // )}
            />
          </div>
        </ShowcaseContainer>
      </div>
    );
  }
}

export default ShowcaseTable;
