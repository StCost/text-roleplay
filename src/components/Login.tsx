import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Card,
  Tabs,
  Spin,
} from 'antd';

import actions from '../reducers/actions';
import { IState } from '../reducers/interfaces';

interface ILoginProps {
  loading: boolean;
}

const Login = (props: ILoginProps) => {
  const { loading } = props;

  return (
    <Card>
      <Spin spinning={loading}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Логин" key="1">
            <Form onFinish={(values) => actions.login(values)}>
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
          </Tabs.TabPane>
          <Tabs.TabPane tab="Регистрация" key="2">
            <Form
              onFinish={actions.register}
            >
              <Form.Item
                label="Никнейм"
                name="nickname"
                rules={[{ required: true, message: 'Введите никнейм!' }]}
              >
                <Input/>
              </Form.Item>
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
              <Form.Item
                label="Confirm Password"
                name="passwordConfirm"
                rules={[{ required: true, message: 'Подтвердите парол!' }]}
              >
                <Input.Password/>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Зарегистрировать
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Восстановить" key="3">
            <Form
              onFinish={(values) => actions.resetPassword(values)}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Введите e-mail!' }]}
              >
                <Input/>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Отправить E-mail
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Spin>
    </Card>
  );
};

const mapStateToProps = (state: IState) => {
  const { loading } = state;

  return { loading };
};

export default connect(mapStateToProps)(Login);
