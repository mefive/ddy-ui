import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';

import Trigger from '../Trigger';
import Popover from '../Popover';
import Table from './Table';
import TableFilterPopover from './TableFilterPopover';

const propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  columnsWidth: PropTypes.shape({}),
  noWrap: PropTypes.bool,
  onColumnClick: PropTypes.func,
  height: PropTypes.number,
  sort: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.string,
  }),
  visible: PropTypes.bool,
  filters: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    values: PropTypes.array,
    items: PropTypes.array,
  })),
  getFilterItems: PropTypes.func,
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  getPopoverContainer: PropTypes.func,
  getColumnClassName: PropTypes.func,
};

const defaultProps = {
  columns: [],
  onColumnClick: () => {},
  columnsWidth: {},
  visible: true,
  getFilterItems: () => null,
  getColumnClassName: null,
  onFiltersChange: () => {},
  onSortChange: () => {},
  sort: null,
  height: null,
  filters: null,
  getPopoverContainer: null,
  noWrap: false,
};

class TableHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterActiveIndex: null,
      filters: [],
    };
  }

  componentWillReceiveProps({ filters }) {
    if (filters !== this.props.filters) {
      this.setFilters(filters);
    }
  }

  componentDidUpdate(prevProps, { filterActiveIndex }) {
    if (!filterActiveIndex && this.filterActiveIndex != null) {
      this.setFilters();
    }
  }

  setFilters(filters = this.props.filters) {
    this.setState({
      filters: cloneDeep(filters),
    });
  }

  getFiltersByChangedFilter(filter) {
    const filters = [...this.state.filters];
    const index = filters.findIndex(f => f.key === filter.key);

    if (index === -1) {
      filters.push(filter);
    } else {
      filters.splice(index, 1, filter);
    }

    return filters;
  }

  filterPopoverPlace() {
    if (this.popover) {
      this.popover.place();
    }
  }

  closeFilter() {
    this.setState({ filterActiveIndex: null });
  }

  renderFilter(column, index) {
    return (
      <Trigger
        active={this.state.filterActiveIndex === index}
        onActiveChange={active => this.setState({
          filterActiveIndex: active
            ? index
            : null,
        })}
        getPopoverContainer={this.props.getPopoverContainer}
        renderPopover={() => {
          const filter = this.state.filters.find(f => f.key === `${column.key}`);

          const isLast = filter === this.state.filters[this.state.filters.length - 1];

          const filterItems = (filter == null || !isLast)
            ? this.props.getFilterItems(column.key)
            : filter.items;

          return (
            <Popover
              placement={{
                vertical: Popover.PLACEMENT_BOTTOM,
                horizontal: this.props.columns.length - 1 === index
                  ? Popover.PLACEMENT_RIGHT_ALIGN
                  : Popover.PLACEMENT_LEFT_ALIGN,
              }}
              adjustPlacement={false}
              className="table-filter-popover"
              ref={(el) => { this.popover = el; }}
            >
              <TableFilterPopover
                column={column}
                filterItems={filterItems}
                filter={filter}
                onFilterChange={f => this.setState({ filters: this.getFiltersByChangedFilter(f) })}
                isInFilters={this.props.filters.some(f => f.key === `${column.key}`)}
                isLast={isLast}
                onConfirm={f =>
                  this.setState(
                    {
                      filterActiveIndex: null,
                      filters: this.getFiltersByChangedFilter(f),
                    },
                    () => this.props.onFiltersChange(cloneDeep(this.state.filters)),
                  )
                }
                onClear={() => {
                  this.setState(
                    { filterActiveIndex: null },
                    () => {
                      const filters = [...this.state.filters];
                      const deleteIndex = filters.findIndex(f => f.key === `${column.key}`);
                      if (deleteIndex !== -1) {
                        filters.splice(deleteIndex, 1);
                        this.props.onFiltersChange(filters);
                      }
                    },
                  );
                }}
              />
            </Popover>
          );
        }}
        enterClassName="slide-down-in"
        leaveClassName="slide-down-out"
      >
        <i
          className={classNames(
            'icon icon-filter align-middle ml-1',
            { 'text-primary bold': this.props.filters.some(f => f.key === `${column.key}`) },
          )}
          role="button"
        />
      </Trigger>
    );
  }

  render() {
    let children = [];
    let indexCounter = 0;

    this.props.columns.forEach((column) => {
      if (column.children) {
        children = children.concat(column.children.map((child) => {
          indexCounter += 1;
          return { ...child, index: indexCounter - 1 };
        }));
      } else {
        indexCounter += 1;
      }
    });

    return (
      <thead
        className={classNames({ invisible: !this.props.visible })}
        ref={(el) => { this.thead = el; }}
      >
        <tr
          style={{
            height: this.props.visible ? this.props.height : null,
          }}
        >
          {this.props.columns.map((column, index) => {
            let direction;

            if (this.props.sort && (column.sortKey === this.props.sort.key)) {
              direction = this.props.sort.direction === Table.ASC ? Table.ASC : Table.DESC;
            } else {
              direction = null;
            }

            let columnClassName;

            if (this.props.getColumnClassName) {
              columnClassName = this.props.getColumnClassName(column, index);
            }

            return (
              <th
                key={column.key}
                data-key={column.key}
                className={classNames(
                  { [`text-${column.align}`]: !!column.align },
                  { [columnClassName]: columnClassName != null },
                )}
                style={{
                  whiteSpace: this.props.noWrap || column.noWrap ? 'nowrap' : null,
                  width: column.width || null,
                }}
                rowSpan={(() => {
                  if (children.length > 0) {
                    return column.children ? 1 : 2;
                  }
                  return null;
                })()}
                colSpan={(() => {
                  if (children.length > 0) {
                    return column.children ? column.children.length : 1;
                  }
                  return null;
                })()}
                onClick={() => {
                  if (this.state.filterActiveIndex == null
                    && column.sortKey
                  ) {
                    this.props.onColumnClick(column);
                  }
                }}
              >
                <div
                  style={{
                    width: column.children
                      ? null
                      : this.props.columnsWidth[index] || column.width || null,
                    position: 'relative',
                  }}
                  ref={`${index}`}
                >
                  {column.renderColumn
                    ? column.renderColumn(column)
                    : (
                      <span>
                        <span className="bold">{column.title}</span>
                        {column.sortKey != null && (
                          <span
                            className="ml-1"
                            aria-hidden
                            onClick={() => {
                              const sort = direction == null
                                ? { key: column.key }
                                : { ...this.props.sort };

                              let newDirection;

                              if (direction == null) {
                                newDirection = Table.DESC;
                              } else {
                                newDirection = direction === Table.ASC ? Table.DESC : Table.ASC;
                              }

                              this.props.onSortChange({
                                ...sort,
                                direction: newDirection,
                              });
                            }}
                            role="button"
                          >
                            <i
                              className={classNames(
                                'icon icon-half-arrow-up align-middle',
                                { 'text-primary': direction === Table.ASC },
                              )}
                            />
                            <i
                              className={classNames(
                                'icon icon-half-arrow-down align-middle',
                                { 'text-primary': direction === Table.DESC },
                              )}
                              style={{ marginLeft: 2, marginRight: '-0.5em' }}
                            />
                          </span>
                        )}

                        {column.filterable && this.renderFilter(column, index)}
                      </span>
                    )
                  }
                </div>
              </th>
            );
          })}
        </tr>

        {children.length > 0 && (
          <tr>
            {children.map(column => (
              <th
                key={column.key}
                data-key={column.key}
                className={classNames(
                  { sortable: !!column.sortKey },
                  { [`text-${column.align}`]: !!column.align },
                )}
                style={{
                  whiteSpace: this.props.noWrap || column.noWrap ? 'nowrap' : null,
                }}
              >
                <div
                  style={{
                    width: this.props.columnsWidth[column.index] || column.width || null,
                  }}
                >
                  {column.renderColumn
                    ? column.renderColumn(column)
                    : column.title
                  }
                </div>
              </th>
            ))}
          </tr>
        )}
      </thead>
    );
  }
}

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;

export default TableHeader;
