import {Nav, Navbar} from 'react-bootstrap';
import './TopNavbar.css';
import logo from '../../person-with-laptop.svg';
import React from 'react';
import {AuthService} from '../../auth/Auth.service';
import {Link} from 'react-router-dom';

// const auth = new AuthService();

const TopNavbar = () => {
    return (
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <img
                src={logo}
                width='30'
                height='30'
                className='d-inline-block align-top'
            />
            <Navbar.Brand>Zakolik</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
            <Navbar.Collapse>
                <Nav className='mr-auto'>
                    <Link to='/home'>Home</Link>
                </Nav>
                <Nav>
                    <Link to='/login'>Login</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TopNavbar;
