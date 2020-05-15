import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Button,
} from 'antd';

import actions from '../../actions';

const Login = () => {
  return (
    <Form
      onFinish={(values) => actions.login(values)}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect()(Login);
