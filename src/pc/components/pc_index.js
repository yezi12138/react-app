import React from 'react';
import '../sass/pc_index.scss';
import PCHeader from './pc_header';
import PCIndexRegister from './pc_index_register';
import PCIndexHot from './pc_index_hot';
import PCIndexNewBook from './pc_index_newbook';
import PCIndexMovies from './pc_index_movies';
export default class PCIndex extends React.Component {
  render() {
    return (
      <div>
        <PCHeader />
        <PCIndexRegister />
        <PCIndexHot />
        <PCIndexNewBook />
        <PCIndexMovies />
      </div>
    )
  }
}