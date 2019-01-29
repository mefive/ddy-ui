import React from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import classNames from 'classnames';
import memoize from 'memoize-one';

class TableHeader extends React.PureComponent {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      width: PropTypes.number,
      minWidth: PropTypes.number,
      align: PropTypes.string,
      children: PropTypes.array,
    })).isRequired,
    columnsWidth: PropTypes.objectOf(PropTypes.number),
    noWrap: PropTypes.bool,
    renderColumn: PropTypes.func.isRequired,
  };

  static defaultProps = {
    columnsWidth: {},
    noWrap: false,
  };

  getFlattenColumns = memoize(columns =>
    columns.reduce((p, c) => [...p, ...this.buildFlattenColumns(c, [], 1, [])], []));

  buildFlattenColumns(col, cols, level, paths) {
    const column = {
      ...col,
      level,
      paths: [...paths, col.key],
    };

    return [
      ...cols,
      column,
      ...(col.children || []).reduce((p, c) => [
        ...p,
        ...this.buildFlattenColumns(
          c,
          cols,
          level + 1,
          [...paths, col.key],
        ),
      ], []),
    ];
  }

  render() {
    const { columnsWidth, noWrap } = this.props;
    const flattenColumns = this.getFlattenColumns(this.props.columns);
    const levelGroupedColumns = groupBy(flattenColumns, ({ level }) => level);
    const max = Object.keys(levelGroupedColumns).length;

    return (
      <thead>
        {Object.keys(levelGroupedColumns).map((level) => {
          const columns = levelGroupedColumns[level];

          return (
            <tr key={level}>
              {columns.map((col, colIndex) => (
                <th
                  key={col.key}
                  scope="col"
                  width={columnsWidth[col.key] || col.width}
                  style={{
                    minWidth: columnsWidth[col.key] || col.minWidth,
                    textAlign: col.align,
                  }}
                  colSpan={col.children
                    ? flattenColumns.filter(c =>
                      c.children == null && c.paths[level - 1] === col.key).length
                    : null}
                  rowSpan={col.children ? null : (max - +level) + 1}
                  data-key={col.key}
                  className={classNames({ 'text-nowrap': noWrap || col.noWrap })}
                >
                  {this.props.renderColumn(col, colIndex)}
                </th>
              ))}
            </tr>
          );
        })}
      </thead>
    );
  }
}

export default TableHeader;
