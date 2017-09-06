import React from 'react';
import axios from 'axios';
import { Spin } from 'antd';
export default class PCIndexNewBook extends React.Component {
  constructor() {
    super();
    this.state = {
      bookData: {}
    }
  }
  componentWillMount() {
    setTimeout(() => {
      axios.get('/bookdata').then((res) => {
      this.setState({
        bookData: res.data.data[1]
      })
    })
    }, 3000);
  }
  render() {
    return (
      <section className="section newbook-section">
        { this.state.bookData.subjects ?
          <div className="section-content">
            <div className="section-left">
              <span className="index-section">{ this.state.bookData.title ? this.state.bookData.title : '' }</span>
            </div>
            <div className="section-right">
              <div className="section-right-title">热门专栏</div>
              <ul className="section-group">
                { this.state.bookData.subjects.map((item, index) => {
                    if (index < 10) {
                      return (
                        <li className="section-item" key={ `newbook-${index}` }>
                          <img src={ item.images.medium } alt="img"></img>
                          <div className="section-item-name">
                            { item.title }
                          </div>
                          <div className="section-item-author">
                            { item.author }
                          </div>
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