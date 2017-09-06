import React from 'react';
import axios from 'axios';
import { Dropdown, Menu, Modal, Form, Button, Input, Icon, Checkbox, message } from 'antd';
const FormItem = Form.Item;
class PCLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: false,
      username: null,
      avatar: null,
      visible: false
    };
    this.showModal = this.showModal.bind(this);
    this.login = this.login.bind(this);
    this.getFormData = this.getFormData.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.logOut = this.logOut.bind(this)
  }
  ;
  showModal() {
    this.setState({
      visible: true,
    });
  }
  login(e) {
    e.preventDefault();
    let self = this;
    this.props.form.validateFields((err, values) => {
      axios.post('/identify/login', {
        username: values.username,
        password: values.password
      }).then((res) => {
        if (res.data === 'fail') {
          message.info('登录失败')
        } else {
          console.log(res.data)
          self.setState({
            username: res.data.username,
            avatar: res.data.avatar,
            isLogined: true,
            visible: false
          })
        }
      })
    });
  }
  logOut () {
    this.setState({
            username: null,
            avatar: null,
            isLogined: false
          });
    message.info('退出成功');
  }
  getFormData() {
    this.props.form.validateFields((err, values) => {
    });
  }
  handleCancel() {
    this.setState({
      visible: false
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank">个人中心</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" onClick={this.logOut}>退出</a>
      </Menu.Item>
    </Menu>
    );
    return (
      <div>
        { this.state.isLogined ?
          <div className="user">
            <Dropdown overlay={ menu }>
              <img src={ this.state.avatar } alt="avatar"></img>
            </Dropdown>
            <span className="username">{ this.state.username }</span>
          </div>
          :
          <div className="login-register">
            <span className="login" onClick={ this.showModal }>登录</span>/<span className="register">注册</span>
          </div> }
        <Modal title="登录" visible={ this.state.visible } okText={ '登录' } onOk={ this.login } onCancel={ this.handleCancel }>
          <Form onSubmit={ this.handleSubmit } className="login-form">
            <FormItem>
              { getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    message: 'Please input your username!'
                  }],
                })(
                  <Input prefix={ <Icon type="user" style={ { fontSize: 14 } } /> } placeholder="Username" />
                ) }
            </FormItem>
            <FormItem>
              { getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: 'Please input your Password!'
                  }],
                })(
                  <Input prefix={ <Icon type="lock" style={ { fontSize: 14 } } /> } type="password" placeholder="Password" />
                ) }
            </FormItem>
            <FormItem>
              { getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox style={ { fontSize: 14 } }>记住我</Checkbox>
                ) }
              <a className="login-form-forgot" style={ { fontSize: 14, float: 'right' } }>Forgot password</a>
            </FormItem>
            <FormItem>
              <a style={ { fontSize: 14, float: 'right', color: 'red' } }>现在注册</a>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default PCLogin = Form.create()(PCLogin);