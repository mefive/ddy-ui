import React from 'react';
import Single from './Single';
import Multiple from './Multiple';
import Search from './Search';

export default () => (
  <div className="pb-3">
    <h3>Select</h3>
    <Single />

    <div className="mt-2" />

    <Multiple />

    <div className="mt-2" />

    <Search />
  </div>
);

