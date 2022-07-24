import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AddPost from './components/AddPost';
import AddReportPost from './components/AddReportPost';
import DeletePost from './components/DeletePost';
import EditDeleteListHolder from './components/EditDeleteListHolder';
import EditPost from './components/EditPost';
import PanelHome from './components/PanelHome';
import PostFields from './components/PostFields';
import SingleUser from './components/SingleUser';
import StartupChart from './components/StartupChart';
import Users from './components/Users';
import StateController from './context/StateController';
import SendEmail from './components/SendEmail';
import React from 'react'

function App(props) {

  return (
<>

    <StateController>
    
      <Router>
        <Switch>
        <Route exact path="/home" component={PanelHome} />
        <Route exact path="/add-post" component={AddPost} />
        <Route exact path="/:pathname/:category" component={PostFields} />
        <Route exact path="/add-report-post" component={PostFields} />
        <Route exact path="/:pathname/:category/:title/:id" component={PostFields} />
        <Route exact path="/:pathname/:category/fetched" component={EditDeleteListHolder} />
        <Route exact path="/edit-post" component={EditDeleteListHolder} />
        <Route exact path="/delete-post" component={EditDeleteListHolder} />
        <Route exact path="/user/:name/:id" component={SingleUser} />
        <Route exact path="/add-report-post" component={AddReportPost} />
        <Route exact path="/all-users" component={Users} />
        <Route exact path="/startup-chart" component={StartupChart} />
        <Route exact path="/send-email" component={SendEmail} />
        <Route exact path="/" component={() => (<Redirect to='/home' />)} />
        </Switch>
      </Router>
    </StateController>
</>

  );
}

export default App;
