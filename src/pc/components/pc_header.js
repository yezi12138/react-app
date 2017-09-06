import React from 'react';
import logo from '../../../static/images/logo.png';
import PCLogin from './pc_login';
import { Link, IndexLink } from 'react-router';
import { Icon, Input } from 'antd';
const Search = Input.Search;
export default class PCHeader extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <header>
        <div className="nav clearfix">
          <div className="nav-logo">
            <img src={ logo }></img>
          </div>
          <div className="nav-input">
            <Search size="large" placeholder="input search text" style={ { width: 240 } } onSearch={ value => console.log(value) }>
            </Search>
          </div>
          <ul className="nav-list">
            <li className="nav-item home" key="home">
              <IndexLink to="/" activeClassName="active">Home</IndexLink>
            </li>
            <li className="nav-item movies" key="movies">
              <Link to="/movies">电影</Link>
            </li>
            <li className="nav-item books" key="books">
              <Link to="/books">读书</Link>
            </li>
            <li className="nav-item music" key="music">
              <Link to="#">音乐</Link>
            </li>
            <li className="nav-item news" key="news">
              <Link to="#">新闻</Link>
            </li>
            <li className="nav-item zixun" key="zixun">
              <Link to="#">资讯</Link>
            </li>
          </ul>
          <PCLogin />
        </div>
      </header>
    )
  }
}