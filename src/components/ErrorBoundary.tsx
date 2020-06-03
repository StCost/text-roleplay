import React from 'react';
import { Empty, Button } from 'antd';

import actions from '../reducers/actions';
import { connect } from "react-redux";
import { IState } from "../reducers/interfaces";

class ErrorBoundary extends React.Component<{ children: JSX.Element | JSX.Element[], error?: Error }, { hasError: boolean }> {
  componentDidCatch = (error: Error) => {
    actions.setError({ error });
    return {};
  };

  getErrorMessage = () => {
    return (
      <div className="error-boundary">
        <span>Произошла ошибка, уронившая приложение. Обычно, это не критично, просто перезагрузите страницу</span>
        <span>Если ошибка повторяется - сообщите администратору, приложив описание своих действий, которые привели к ошибке. Так же покажите скриншот ошибки в консоли</span>
        <Button onClick={() => window.location.reload()}>Перезагрузить</Button>
      </div>
    )
  };

  render = () => {
    if (this.props.error) {
      return (
        <Empty description={this.getErrorMessage()}/>
      );
    }

    return this.props.children;
  }
}

export default connect((state: IState) => ({ error: state.error }))(ErrorBoundary);
