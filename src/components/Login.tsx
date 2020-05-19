import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Button,
} from 'antd';

import actions from '../actions/index';

const Login = () => {
  return (
    <Form
      onFinish={(values) => actions.login(values)}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Введите e-mail!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Введите пароль!' }]}
      >
        <Input.Password/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect()(Login);
