import React from 'react';
import axios from 'axios';
import { Spin } from 'antd';
export default class PCIndexHot extends React.Component {
  constructor() {
    super();
    this.state = {
      hotData: {}
    }
  }
  componentWillMount() {
    setTimeout(() => {
      axios.get('/bookdata').then((res) => {
        console.log(res.data.data)
      this.setState({
        hotData: res.data.data[0]
      })
    })
    }, 1000);
  }
  render() {
    return (
      <section className="hot-section">
        { this.state.hotData.subjects ?
          <div className="index-hot">
            <div className="index-section">
              { this.state.hotData.title ? this.state.hotData.title : '' }
            </div>
            <div className="index-hot-content">
              <div className="left-content">
                <ul>
                  { this.state.hotData.subjects.map((item, index) => {
                      if (index < 3) {
                        return (
                          <li className="article-item" key={ `hot-${index}` }>
                            <img src={ item.userPic } alt="avatar" className="avatar" />
                            <div className="hot-article">
                              <div className="article-title">
                                { item.title }
                              </div>
                              <div className="preview-wrap">
                                <p>
                                  { item.review }
                                </p>
                              </div>
                              <div className="come-from">20分钟前 来自
                                { this.state.hotData.title }
                              </div>
                            </div>
                          </li>
                        )
                      }
                    }) }
                </ul>
              </div>
              <div className="right-content cleardix">
                <ul>
                  { this.state.hotData.subjects.map((item, index) => {
                      if (index > 3) {
                        return (
                          <li key={ `topic-${index}` }>
                            { item.title }
                          </li>
                        )
                      }
                    }) }
                </ul>
              </div>
            </div>
          </div> : <Spin size='large'></Spin> }
      </section>
    )
  }
}