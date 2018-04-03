import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableCell from './TableCell';

const propTypes = {
  expandedRowRender: PropTypes.func,
  rowKey: PropTypes.string,
  rowClassName: PropTypes.func,
  onRowClick: PropTypes.func,
  rowsState: PropTypes.shape({}),
  rowsHeight: PropTypes.shape({}),
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  dataSource: PropTypes.arrayOf(PropTypes.any),
};

const defaultProps = {
  dataSource: [],
  onRowClick: () => {},
  expandedRowRender: null,
  rowKey: null,
  rowClassName: null,
  rowsState: null,
  rowsHeight: null,
  columns: null,
};

class TableBody extends React.PureComponent {
  render() {
    return (
      <tbody>
        {this.props.dataSource
          && this.props.dataSource.map((record, rowIndex) => {
          const rowState = this.props.rowsState[`${rowIndex}`];

          const rows = [(
            <tr
              key={this.props.rowKey
                ? record[this.props.rowKey]
                : rowIndex}
              className={classNames(
                'row-container',
                this.props.rowClassName(record, rowIndex),
                { expanded: rowState && rowState.expanded },
                { hover: rowState && rowState.hover },
              )}
              onClick={() => this.props.onRowClick(record)}
              style={{
                height: this.props.rowsHeight
                  ? this.props.rowsHeight[rowIndex]
                  : null,
              }}
            >
              {this.props.columns.map((column, columnIndex) => (
                column.children
                  ? column.children.map((child, childColumnIndex) => (
                    <TableCell
                      column={child}
                      record={record}
                      rowIndex={rowIndex}
                      key={`${childColumnIndex + 1}`}
                    />
                  ))
                  : (
                    <TableCell
                      column={column}
                      record={record}
                      rowIndex={rowIndex}
                      key={`${columnIndex + 1}`}
                    />
                  )
              ))}
            </tr>
          )];

          if (this.props.expandedRowRender
            && rowState
            && rowState.expanded
          ) {
            rows.push((
              <tr
                key={`${rowIndex + 1}_detail`}
              >
                <td
                  colSpan={this.props.columns.length}
                  className="detail-container"
                >
                  {this.props.expandedRowRender(record)}
                </td>
              </tr>
            ));
          }

          return rows;
        })}
      </tbody>
    );
  }
}

TableBody.propTypes = propTypes;
TableBody.defaultProps = defaultProps;

export default TableBody;
