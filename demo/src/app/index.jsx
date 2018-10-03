import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';

import './style/index.scss';

// pages
import Table from './Table';
import DatePicker from './DatePicker';
import DateRangePicker from './DateRangePicker';
import Trigger from './Trigger';
import Tooltip from './Tooltip';
import Portal from './Portal';
import Select from './Select';
import Dialog from './Dialog';
import Form from './Form';
import Grid from './Grid';
import Slider from './Slider';
import SwitchShowCase from './Switch';
import Sortable from './Sortable';
import Animate from './Animate';
// import ContextMenu from './ContextMenu';
// import AutoComplete from './AutoComplete';

const links = [{
  url: 'table',
  title: 'Table',
}, {
  url: 'grid',
  title: 'Grid',
}, {
  url: 'datePicker',
  title: 'DatePicker',
}, {
  url: 'dateRangePicker',
  title: 'DateRangePicker',
}, {
  url: 'trigger',
  title: 'Trigger',
}, {
  url: 'tooltip',
  title: 'Tooltip',
}, {
  url: 'portal',
  title: 'Portal',
}, {
  url: 'select',
  title: 'Select',
}, {
  url: 'dialog',
  title: 'Dialog',
}, {
  url: 'form',
  title: 'Form',
}, {
  url: 'slider',
  title: 'Slider',
}, {
  url: 'switch',
  title: 'Switch',
}, {
  url: 'sortable',
  title: 'Sortable',
}, {
  url: 'carousel',
  title: 'Carousel',
}, {
  url: 'animate',
  title: 'Animate',
}, {
  url: 'contextMenu',
  title: 'ContextMenu',
}, {
  url: 'autoComplete',
  title: 'AutoComplete',
}];

const Port = () => (
  <div className="container-fluid">
    <ul className="nav flex-column">
      {links.map(({ url, title }) => (
        <li key={url} className="nav-link">
          <NavLink to={url}>
            {title}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

ReactDOM.render(
  <div className="container pt-3">
    <Router>
      <Switch>
        <Route exact path="/table" component={Table} />
        <Route exact path="/datePicker" component={DatePicker} />
        <Route exact path="/dateRangePicker" component={DateRangePicker} />
        <Route exact path="/trigger" component={Trigger} />
        <Route exact path="/tooltip" component={Tooltip} />
        <Route exact path="/portal" component={Portal} />
        <Route exact path="/select" component={Select} />
        <Route exact path="/dialog" component={Dialog} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/grid" component={Grid} />
        <Route exact path="/slider" component={Slider} />
        <Route exact path="/switch" component={SwitchShowCase} />
        <Route exact path="/sortable" component={Sortable} />
        <Route exact path="/animate" component={Animate} />
        {/*<Route exact path="/contextMenu" component={ContextMenu} />*/}
        {/*<Route exact path="/autoComplete" component={AutoComplete} />*/}
        <Route exact path="/" component={Port} />
      </Switch>
    </Router>
  </div>,
  document.getElementById('main'),
);
