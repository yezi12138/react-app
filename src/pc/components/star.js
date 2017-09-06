import React from 'react';
export default class Star extends React.Component {
  constructor (props) {
    super(props);
    this.itemClasses = this.itemClasses.bind(this)
    this.state = {
      itemClasses: []
    }
  }
  componentDidMount () {
    let result = this.itemClasses()
    this.setState({
      itemClasses: result
    })
  }
  itemClasses () {
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';
    let score = this.props.score / 10;
    let result = [];
    let hasDecimal = score % 1 !== 0;
    let integer = Math.floor(score);
    for (let i = 0; i < integer; i++) {
      result.push(CLS_ON)
    };
    if (hasDecimal) {
      result.push(CLS_HALF)
    };
    while (result.length < LENGTH) {
      result.push(CLS_OFF)
    };
    return result;
  }
  render() {
    return (
      <div className={`star star-${this.props.size}`}>
        { this.state.itemClasses ? this.state.itemClasses.map((itemClass, index) => {
          return (
            <span key={`star-${index}`} className={`star-item ${itemClass}`}></span>
          )
        }): '' }
      </div>
      )
    }
  }