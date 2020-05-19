import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Card,
  Alert,
} from 'antd';

import actions from '../actions/index';
import { IState } from "../reducers/interfaces";

interface ILoginProps {
  loading: boolean;
  error: Error | false;
}

const Login = (props: ILoginProps) => {
  const { error, loading } = props;

  return (
    <Card loading={loading}>
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
          <Button
            type="primary"
            htmlType="submit"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
      {error && (
        <Alert
          type="error"
          message={error.message}
        />
      )}
    </Card>
  );
};

const mapStateToProps = (state: IState) => {
  const { loading, error } = state;

  return { loading, error };
};

export default connect(mapStateToProps)(Login);
