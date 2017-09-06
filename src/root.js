import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import PCIndex from './pc/components/pc_index';
import PCMovies from './pc/components/pc_movies';
import PCBooks from './pc/components/pc_books';
import PCMovieDetail from './pc/components/pc_movieDetail';
export default class Root extends React.Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={PCIndex} />
        <Route path="/books" component={PCBooks} />
        <Route path="/movies" component={PCMovies} />
        <Route path="/subject/:id" component={PCMovieDetail} />
      </Router>
    )
  }
}