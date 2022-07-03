import React, { Fragment } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Home } from './pages/home';
import { Store } from './pages/store';
import { About } from './pages/about';
import { Navbar } from './components/navbar';

function App() {
  return (
    <Fragment>
      <Navbar/>
        <Container>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/store" element={<Store/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </Container>
    </Fragment>
  );
}

export default App;
