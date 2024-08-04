import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroupList from './GroupList';
import GroupEdit from './GroupEdit';

// the app runs the React interface, setting up routes for navigation.
// the default route is the home page
// establishes routes for the group list and group edit pages
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/groups' exact={true} element={<GroupList/>}/>
        <Route path='/groups/:id' element={<GroupEdit/>}/>
      </Routes>
    </Router>
  )
}

export default App;