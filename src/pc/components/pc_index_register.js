import React from 'react';
import { Form, Button, Input, Spin } from 'antd';
const FormItem = Form.Item;
class PCIndexRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidatesTring = this.getValidatesTring.bind(this);
  }
  componentDidMount() {
    let code = this.getValidatesTring()
    this.setState({
      code
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
    })
  }
  getValidatesTring() {
    this.options = {
      canvasId: "validateId",
      width: 100,
      height: 40
    }
    let code = ''
    let self = this
    /**生成一个随机数**/
    let randomNum = function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    /**生成一个随机色**/
    let randomColor = function(min, max) {
      var r = randomNum(min, max);
      var g = randomNum(min, max);
      var b = randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let randomString = function() {
      let newArr = []
      for (let i = 0; i < 4; i++) {
        let item = arr[Math.floor(Math.random() * 52)]
        newArr.push(item)
      }
      return newArr
    }
    let canvas = document.getElementById('validateId')
    this._init = function() {
      self.refresh();
      canvas.onclick = () => {
        self.refresh();
      }
    }
    this.refresh = () => {
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d')
      } else {
        return
      }
      ctx.clearRect(0, 0, 100,  40)
      let newArr = randomString()
      console.log('newArr', newArr)
      ctx.textBaseline = "middle"
      ctx.fillStyle = randomColor(180, 240)
      ctx.fillRect(0, 0, this.options.width, this.options.height)
      for (var i = 0; i < 4; i++) {
        let txt = newArr[i]
        code += txt
        // 随机生成字体大小
        ctx.font = randomNum(this.options.height / 2, this.options.height) + 'px SimHei';
        ctx.fillStyle = randomColor(50, 160)
        ctx.shadowOffsetX = randomNum(-3, 3);//阴影的横向位移量
        ctx.shadowOffsetY = randomNum(-3, 3);//阴影的纵向位移量
        ctx.shadowBlur = randomNum(-3, 3);//阴影的模糊范围（值越大越模糊）
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";//阴影的颜色
        var x =  (10 * i) + 5;
        var y = Math.floor((Math.random() * 2) + 1);
        var deg = randomNum(-30, 30);
        ctx.save();
        ctx.translate(x, -y)
        ctx.rotate(deg * Math.PI / 180);//旋转context.rotate(angle)
        ctx.fillText(txt, x, this.options.height / 2);//context.fillText(text,x,y)
        ctx.restore();
      }   
    }
    this._init()
    return code
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <section className="section register-section">
        <div className="section-content  clearfix">
          <div className="register">
            <Form onSubmit={ this.handleSubmit } className="login-form">
              <FormItem>
                { getFieldDecorator('username', {
                    rules: [{
                      required: true,
                      message: 'Please input your username!'
                    }],
                  })(
                    <Input placeholder="Username" />
                  ) }
              </FormItem>
              <FormItem>
                { getFieldDecorator('password', {
                    rules: [{
                      required: true,
                      message: 'Please input your Password!'
                    }],
                  })(
                    <Input type="password" placeholder="Password" />
                  ) }
              </FormItem>
              <FormItem>
                { getFieldDecorator('validate', {
                    rules: [{
                      required: true,
                      message: 'Please ensure your input!'
                    }],
                  })(
                    <div>
                      <Input style={{ width: 150 }} placeholder="请输入验证码"></Input><canvas id='validateId' width="100" height="40"></canvas>
                    </div>
                  ) }
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">Register</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </section>
    )
  }
}

export default PCIndexRegister = Form.create()(PCIndexRegister);