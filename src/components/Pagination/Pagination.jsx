import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style/index.scss';

const propTypes = {
  total: PropTypes.number,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

const defaultProps = {

};

class Pagination extends React.Component {
  getItem(page) {
    return (
      <span
        className={classNames(
          'page-item',
          { current: page === this.props.page },
        )}
        aria-hidden
        key={page}
        onClick={() => {
          if (page !== this.props.page) {
            this.props.onChange(page);
          }
        }}
      >
        {page}
      </span>
    );
  }

  render() {
    let {
      total, rowsPerPage, page, totalPages,
    } = this.props;

    if (totalPages != null) {
      if (totalPages === 1) {
        return null;
      }
    } else if (rowsPerPage != null && total < rowsPerPage) {
      return null;
    }

    const isFirstPage = page === 1;

    if (totalPages == null) {
      totalPages = Math.ceil(total / rowsPerPage);
    }

    const isLastPage = (page === totalPages);

    return (
      <div
        className={classNames(
          'pagination',
          { [this.props.className]: !!this.props.className },
        )}
      >
        <div
          className={classNames(
            'btn',
            'btn-outline-primary',
            { disabled: isFirstPage },
          )}
          aria-hidden
          onClick={() => {
            if (!isFirstPage) {
              this.props.onChange(page - 1);
            }
          }}
        >
          <i className="icon icon-angle-left" />
          上一页
        </div>

        <span className="page">
          {(() => {
            const pageItems = [];

            if (totalPages < 10) {
              for (let i = 1; i <= totalPages; i++) {
                pageItems.push(this.getItem(i));
              }

              return pageItems;
            }

            if (page < 4) {
              for (let i = 1; i <= 5; i += 1) {
                pageItems.push(this.getItem(i));
              }

              pageItems.push(<span className="ellipsis" key="ellipsis"> ... </span>);
              pageItems.push(this.getItem(totalPages));

              return pageItems;
            }

            if (page > totalPages - 4) {
              pageItems.push(this.getItem(1));
              pageItems.push(<span className="ellipsis" key="ellipsis"> ... </span>);

              for (let i = totalPages - 4; i <= totalPages; i += 1) {
                pageItems.push(this.getItem(i));
              }

              return pageItems;
            }

            pageItems.push(this.getItem(1));
            pageItems.push(<span className="ellipsis" key="ellipsis1"> ... </span>);

            for (let i = page - 2; i <= page + 2; i += 1) {
              pageItems.push(this.getItem(i));
            }

            pageItems.push(<span className="ellipsis" key="ellipsis2"> ... </span>);
            pageItems.push(this.getItem(totalPages));

            return pageItems;
          })()}
        </span>

        <div
          className={classNames(
            'btn',
            'btn-outline-primary',
            { disabled: isLastPage },
          )}
          aria-hidden
          onClick={() => {
            if (!isLastPage) {
              this.props.onChange(page + 1);
            }
          }}
        >
          下一页
          <i className="icon icon-angle-right" />
        </div>
      </div>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
