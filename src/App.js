import React from 'react'
import { BrowserRouter as Router , Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Business from './components/Business'
import Startups from './components/Startups';
import Sports from './components/Sports';
import Technology from './components/Technology';
import Navbar from './components/Navbar';
import PostState from './context/posts/PostState';
import ReadTemplate from './ReadTemplate';
import MyAlert  from './components/MyAlert';
import OurDailyDose from './components/OurDailyDose';
import PostDesign from './design/PostDesign';
import Login from './components/Login';
import Signup from './components/Signup';
import ProfilePage from './components/ProfilePage';
import Footer from './components/Footer';
import ChartPage from './components/ChartPage';

// eslint-disable-next-line
// import PostsContext from './context/posts/postsContext';
const App = (props) => {

  return (
    <>
    <PostState>
    <Router>
    <Navbar />
      <Switch>
      <Route exact path="/" component={() => (<Redirect to='/home' />)} />
        <Route path={"/home"} component={Home}/>
        <Route path={"/login"} component={Login}/>
        <Route path={"/signup"} component={Signup}/>
        <Route path={"/profile-page/:username"} component={ProfilePage}/>
        <Route exact path={"/business"} component={Business}/>
        <Route exact path={"/startups"} component={Startups}/>
        <Route exact path={"/technology"} component={Technology}/>
        <Route exact path={"/sports"} component={Sports}/>
        <Route exact path={"/our-daily-dose"} component={OurDailyDose}/>
        <Route exact path={"/read/:id"} component={ReadTemplate}/>
        <Route exact path={"/read/:id"} component={PostDesign}/>
        <Route exact path={"/chart-post"} component={ChartPage}/>
      </Switch>
      <Footer/>
    </Router>
    </PostState>

    </>   
  )
}

export default App