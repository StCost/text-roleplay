import React from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Tabs,
} from 'antd';

import actions from '../reducers/actions';

const Login = () => {
  return (
    <Card>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Логин" key="1">
            <Form onFinish={(values) => actions.login(values)}>
              <Form.Item
                label="E-Mail"
                name="email"
                rules={[{ required: true, message: 'Введите e-mail!' }]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Пароль"
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
                label="E-Mail"
                name="email"
                rules={[{ required: true, message: 'Введите e-mail!' }]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Введите пароль!' }]}
              >
                <Input.Password/>
              </Form.Item>
              <Form.Item
                label="Подтвердите Пароль"
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
                  Зарегистрироваться
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Восстановить" key="3">
            <Form
              onFinish={(values) => actions.resetPassword(values)}
            >
              <Form.Item
                label="E-Mail"
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
                  Отправить восстановление пароля на E-mail
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
    </Card>
  );
};

export default Login;
