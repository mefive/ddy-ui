import React from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import classNames from 'classnames';
import { flattenWith } from '../utils/array';

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
  };

  static defaultProps = {
    columnsWidth: {},
    noWrap: false,
  };

  getColumnLines() {
    const { columns } = this.props;

    const flattenColumns = flattenWith(columns, (col, parentCol, level) => ({
      level,
      ...col,
    }), 'children');

    return groupBy(flattenColumns, ({ level }) => level);
  }

  render() {
    const { columnsWidth, noWrap } = this.props;
    const lines = this.getColumnLines();
    const max = Object.keys(lines).length;

    return (
      <thead>
        {Object.keys(lines).map((level) => {
          const columns = lines[level];

          return (
            <tr key={level}>
              {columns.map(col => (
                <th
                  key={col.key}
                  scope="col"
                  width={columnsWidth[col.key] || col.width}
                  style={{
                    minWidth: columnsWidth[col.key] || col.minWidth,
                    textAlign: col.align,
                  }}
                  colSpan={col.children ? col.children.length : null}
                  rowSpan={col.children ? null : (max - +level) + 1}
                  data-key={col.key}
                  className={classNames({ 'text-nowrap': noWrap || col.noWrap })}
                >
                  {col.title}
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
