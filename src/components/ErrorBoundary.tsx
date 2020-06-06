import React from 'react';
import { Empty, Button } from 'antd';
import { connect } from 'react-redux';

import actions from '../reducers/actions';
import { IState } from '../reducers/interfaces';

class ErrorBoundary extends React.Component<{ children: JSX.Element | JSX.Element[], error?: Error }, { hasError: boolean }> {
  componentDidCatch = (error: Error) => {
    actions.setError({ error });
    return {};
  };

  getErrorMessage = (error: Error) => {
    return (
      <div className="error-boundary">
        <span>Произошла ошибка, уронившая приложение. Обычно, это не критично, просто перезагрузите страницу</span>
        <span>Если ошибка повторяется - сообщите администратору, приложив описание своих действий, которые привели к ошибке. Так же покажите скриншот ошибки в консоли</span>
        <Button onClick={() => window.location.reload()}>Перезагрузить</Button>
        <br/><br/><br/>
        <div className="error-boundary-message">
          <p>{error.name}</p>
          <br/>
          <p>{error.message}</p>
          <br/>
          <p>{JSON.stringify(error.stack, undefined, 2)}</p>
        </div>
      </div>
    )
  };

  render = () => {
    const { error } = this.props;
    if (error) {
      return (
        <Empty description={this.getErrorMessage(error)}/>
      );
    }

    return this.props.children;
  }
}

export default connect((state: IState) => ({ error: state.error }))(ErrorBoundary);
