import React from 'react';
import './style.scss';
import PaginationTable from './PaginationTable';
import NestedColumnsTable from './NestedColumnsTable';
import HeaderFixedTable from './HeaderFIxedTable';
import ColumnsFixedTable from './ColumnsFixedTable';

export default () => (
  <div className="pb-3">
    <h3>Table</h3>
    <ColumnsFixedTable />
  </div>
);
