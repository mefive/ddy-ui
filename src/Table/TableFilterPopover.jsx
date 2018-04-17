import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../Input';

const propTypes = {
  column: PropTypes.shape({
    key: PropTypes.any,
  }).isRequired,
  filterItems: PropTypes.arrayOf(PropTypes.any).isRequired,
  filter: PropTypes.shape({
    values: PropTypes.any,
    items: PropTypes.array,
  }),
  onFilterChange: PropTypes.func.isRequired,
  isInFilters: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

const defaultProps = {
  filter: null,
};

class TableFilterPopover extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
    };

    this.onConfirm = this.onConfirm.bind(this);
  }

  onConfirm() {
    let { filter } = this.props;

    if (filter == null) {
      filter = {
        key: `${this.props.column.key}`,
        values: this.getFilteredValues(this.props.filterItems),
        items: this.props.filterItems,
      };
    } else {
      filter.values = this.getFilteredValues(filter.values);
    }

    this.props.onConfirm(filter);
  }

  getFilteredValues(values) {
    return values.filter((f) => {
      if (this.state.query == null) {
        return true;
      }

      if ('空白'.indexOf(this.state.query) !== -1 && f == null) {
        return true;
      }

      return `${f}`.indexOf(this.state.query) !== -1;
    });
  }

  render() {
    const filteredItems = this.getFilteredValues(this.props.filterItems);

    return (
      <div>
        <div className="p-1">
          <Input
            value={this.state.query}
            onChange={query => this.setState({ query })}
            maxLength={100}
            onKeyPress={(e) => {
              if (e.charCode === 13) {
                if (filteredItems.length > 0) {
                  this.onConfirm();
                }
              }
            }}
          />
        </div>

        <div
          style={{
            maxHeight: 200,
            minWidth: 200,
            maxWidth: 300,
            overflowY: 'auto',
          }}
        >
          {(() => filteredItems
            .map((item, itemIndex) => (
              // eslint-disable-next-line
              <label
                key={`${itemIndex + 1}`}
                className="filter-item d-block"
              >
                <div className="p-1 ellipsis">
                  <Input
                    value={this.props.filter == null
                      || this.props.filter.values.indexOf(item) !== -1}
                    type="checkbox"
                    className="mr-0"
                    onChange={(checked) => {
                      if (this.props.filterItems.length === 1) {
                        return;
                      }

                      const valuesSet = this.props.filter == null
                        ? new Set(this.props.filterItems)
                        : new Set(this.props.filter.values);

                      if (checked) {
                        valuesSet.add(item);
                      } else {
                        valuesSet.delete(item);
                      }

                      const values = Array.from(valuesSet);

                      this.props.onFilterChange({
                        key: `${this.props.column.key}`,
                        values,
                        items: (this.props.isLast && this.props.filter != null)
                          ? this.props.filter.items
                          : this.props.filterItems,
                      });
                    }}
                  />
                  <span>{item == null ? '空白' : item}</span>
                </div>
              </label>
            )))()}
        </div>

        <div className="p-1">
          {this.props.filterItems.length > 1 && (
          <div className="text-sm">
            <div>
              <Input
                type="checkbox"
                className="mr-0"
                value={this.props.filter
                  ? this.props.filter.values.length === this.props.filter.items.length : true}
                onChange={(all) => {
                  this.props.onFilterChange({
                    key: `${this.props.column.key}`,
                    values: all ? this.props.filterItems : [],
                    items: (this.props.isLast && this.props.filter != null)
                      ? this.props.filter.items
                      : this.props.filterItems,
                  });
                }}
              />
              <span className="text-primary mr-0">
                全部
              </span>
            </div>
          </div>
          )}

          <div className="mt-1">
            <div
              className={classNames(
                'btn btn-sm btn-primary',
                { disabled: filteredItems.length === 0 },
              )}
              aria-hidden
              onClick={() => {
                if (filteredItems.length === 0) {
                  return;
                }

                this.onConfirm();
              }}
            >
              确定
            </div>

            {this.props.isInFilters && (
            <div
              className="btn btn-sm btn-outline-primary ml-1"
              aria-hidden
              onClick={() => {
                this.props.onClear();
              }}
            >
              清空
            </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

TableFilterPopover.propTypes = propTypes;
TableFilterPopover.defaultProps = defaultProps;

export default TableFilterPopover;
