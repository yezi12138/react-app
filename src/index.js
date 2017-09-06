import React from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.css';
import Root from './root';
if (module.hot) {
  module.hot.accept();
}


ReactDom.render(
  <Root />,
  document.getElementById('app')
)