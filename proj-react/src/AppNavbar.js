import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {

    // create a new state variable called isOpen, and set its initial value to false
  const [isOpen, setIsOpen] = useState(false);

  // making a basic navbar with a link to the home page and socials
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
      <NavbarToggler onClick={() => { setIsOpen(!isOpen) }}/>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="justify-content-end" style={{width: "100%"}} navbar>
          <NavItem>
            <NavLink href="https://github.com/ColinGreenleaf">GitHub</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default AppNavbar;