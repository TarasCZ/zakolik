import React from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import {Routes} from './routes';
import TopNavbar from './components/TopNavbar/TopNavbar';

const App = () => {
    return (
        <Container>
            <TopNavbar/>
            <Routes/>
        </Container>
    )
};

export default App;
