import React from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

// create a simple home page with a link to the group list
const Home = () => {
  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <Button color="link"><Link to="/groups">Manage Tour</Link></Button>
      </Container>
    </div>
  );
}

export default Home;