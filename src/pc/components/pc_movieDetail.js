import React from 'react';
import axios from 'axios';
export default class PCMovieDetail extends React.Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    let id = this.props.params.id
    axios.get(`/api/v2/movie/subject/${id}`).then((res) => {
      console.log(res.data)
    })
  }
  render() {
    return (
      <div>
      this is movies id = {this.props.params.id}
      </div>
    )
  }
}