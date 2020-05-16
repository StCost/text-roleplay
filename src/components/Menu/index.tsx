import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import menu, { IRoute } from '../../configs/routes';
import { IState, IUser } from '../../reducers';

interface IMenuProps extends RouteComponentProps {
  isLoggedIn: boolean;
  user: IUser | null,
}

function Menu(props: IMenuProps) {
  if (!props.isLoggedIn) {
    return <React.Fragment/>;
  }

  return (
    <AntdMenu
      style={{ width: '124px' }}
      mode="inline"
      selectedKeys={[props.location.pathname]}
    >
      {menu.map((value: IRoute) => (
        <AntdMenu.Item
          key={value.path}
          disabled={value.path === props.location.pathname}
        >
          <Link to={value.path}>
            {value.label}
          </Link>
        </AntdMenu.Item>
      ))}
    </AntdMenu>
  );
}

export default connect((state: IState) => ({
  isLoggedIn: state.isLoggedIn,
  user: state.user,
}))(withRouter(Menu));
