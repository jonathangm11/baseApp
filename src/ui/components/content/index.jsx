import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CustomersList from "./customers/customersList";
import CustomerView from "./customers/customerView";
import OrdersList from "./orders/ordersList";
import OrderView from "./orders/orderView";
import OrdersDashboard from "./orders/ordersDashboard";
import TasksList from "./tasks/tasksList";
import TaskView from "./tasks/taskView";
import TasksDashboard from "./tasks/tasksDashboard";
import NotFound from "../notFound"


export default () => (
  <Switch>

    <Route exact path="/" component={OrdersDashboard}></Route>

    <Route path="/customers">
      <Switch>
        <Route exact path="/customers" component={CustomersList} />
        <Route exact path="/customers/:id" component={CustomerView} />                     
      </Switch>
    </Route>

    <Route path="/orders">
      <Switch>
        <Route exact path="/orders" component={OrdersList} />
        <Route exact path="/orders/:id" component={OrderView} />
        <Route exact path="/orders/dashboard" component={OrdersDashboard} />
      </Switch>
    </Route>

    <Route path="/tasks">
      <Switch>
        <Route exact path="/tasks" component={TasksList} />
        <Route exact path="/tasks/:id" component={TaskView} />        
        <Route path="/tasks/dashboard" component={TasksDashboard} />
      </Switch>
    </Route>

    <Route>
      <div className="text-center">
        <NotFound />
      </div>
    </Route>
  </Switch>
);

