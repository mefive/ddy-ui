import React from 'react';
import './style.scss';
import PaginationTable from './PaginationTable';
import NestedColumnsTable from './NestedColumnsTable';

export default () => (
  <div className="pb-3">
    <h3>Table</h3>

    <PaginationTable />

    <div className="mt-3">
      <NestedColumnsTable />
    </div>
  </div>
);
