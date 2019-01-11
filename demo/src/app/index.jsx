import React from 'react';
import ReactDOM from 'react-dom';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';

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
import Carousel from './Carousel';
import ContextMenu from './ContextMenu';
// import AutoComplete from './AutoComplete';

const links = [{
  url: 'table',
  title: 'Table',
  icon: icons.faTable,
}, {
  url: 'grid',
  title: 'Grid',
  icon: icons.faTh,
}, {
  url: 'datePicker',
  title: 'DatePicker',
  icon: icons.faCalendarAlt,
}, {
  url: 'dateRangePicker',
  title: 'DateRangePicker',
  icon: icons.faCalendar,
}, {
  url: 'trigger',
  title: 'Trigger',
  icon: icons.faAnchor,
}, {
  url: 'tooltip',
  title: 'Tooltip',
  icon: icons.faCommentAlt,
}, {
  url: 'portal',
  title: 'Portal',
  icon: icons.faDoorOpen,
}, {
  url: 'select',
  title: 'Select',
  icon: icons.faListUl,
}, {
  url: 'dialog',
  title: 'Dialog',
  icon: icons.faWindowRestore,
}, {
  url: 'form',
  title: 'Form',
  icon: icons.faListAlt,
}, {
  url: 'slider',
  title: 'Slider',
  icon: icons.faSlidersH,
}, {
  url: 'switch',
  title: 'Switch',
  icon: icons.faToggleOn,
}, {
  url: 'sortable',
  title: 'Sortable',
  icon: icons.faHandPaper,
}, {
  url: 'carousel',
  title: 'Carousel',
  icon: icons.faImages,
}, {
  url: 'animate',
  title: 'Animate',
  icon: icons.faFilm,
}, {
  url: 'contextMenu',
  title: 'ContextMenu',
}, {
  url: 'autoComplete',
  title: 'AutoComplete',
}];

const Port = () => (
  <div className="container-fluid">
    <h1 className="text-center">ddy-ui Showcase</h1>
    <div className="row">
      {links.map(({ url, title, icon }) => (
        <div key={url} className="col-lg-3 col-md-4 col-sm-6">
          <NavLink to={url} className="jumbotron showcase-nav">
            <div className="lead text-center">
              <div>
                {title}
              </div>

              <div className="mt-2 h3">
                {icon && (<FontAwesomeIcon icon={icon} />)}
              </div>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
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
        <Route exact path="/carousel" component={Carousel} />
         <Route exact path="/contextMenu" component={ContextMenu} />
        {/* <Route exact path="/autoComplete" component={AutoComplete} /> */}
        <Route exact path="/" component={Port} />
      </Switch>
    </Router>
  </div>,
  document.getElementById('main'),
);
