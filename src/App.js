import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ProduitList, Produit } from './components';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () =>
  <BrowserRouter>
    <Container>
      <Switch>
        <Route exact path='/' component={ProduitList} />
        <Route exact path='/produit/:slug' component={Produit} />
      </Switch>
    </Container>
  </BrowserRouter>
;

export default App;
