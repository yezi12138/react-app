import React from 'react';
import axios from 'axios';
import Star from './star';
import { Button, Spin } from 'antd';
import { hashHistory } from 'react-router';
export default class PCIndexMovies extends React.Component {
  constructor() {
    super();
    this.state = {
      moviesData: {}
    }
  }
  componentWillMount() {
    axios.get('/api/v2/movie/in_theaters').then((res) => {
      console.log(res.data)
      this.setState({
        moviesData: res.data
      })
    })
  }
  routeTo (id) {
    let path = `/subject/${id}`
    hashHistory.push(path)
  }
  render() {
    return (
      <section className="section movies-section">
        { this.state.moviesData.subjects ?
          <div className="section-content">
            <div className="section-left">
              <span className="index-section">正在热映</span>
            </div>
            <div className="section-right">
              <div className="section-right-title">...... (更多)</div>
              <ul className="section-group">
                { this.state.moviesData.subjects.map((item, index) => {
                    if (index < 10) {
                      return (
                        <li className="section-item" key={ `movies-${index}` } onClick={this.routeTo.bind(this, item.id)}>
                          <img src={ item.images.medium } alt="img"></img>
                          <div className="section-item-name">
                            { item.title }
                          </div>
                          <Star size='24' score={ item.rating.stars }></Star>
                          <Button type="primary">立即购票</Button>
                        </li>
                      )
                    }
                  }) }
              </ul>
            </div>
          </div> : <Spin size='large'></Spin> }
      </section>
    )
  }
}