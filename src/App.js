import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ArticleList, Article } from './components';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () =>
  <BrowserRouter>
    <Container>
      <Switch>
        <Route exact path='/' component={ArticleList} />
        <Route exact path='/article/:slug' component={Article} />
      </Switch>
    </Container>
  </BrowserRouter>
;

export default App;
