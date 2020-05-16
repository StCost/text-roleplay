import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import './menu.scss';
import menu from '../../configs/menu.json';
import { IState } from '../../reducers';

interface IMenuProps extends RouteComponentProps {
  isLoggedIn: boolean;
}

function Menu(props: IMenuProps) {
  if (!props.isLoggedIn) {
    return <React.Fragment/>;
  }

  const mode = window.innerWidth < 767
    ? 'horizontal'
    : 'inline';

  return (
    <AntdMenu
      mode={mode}
      selectedKeys={[props.location.pathname.split('/').pop() || '']}
    >
      {menu.map((value) => (
        <AntdMenu.Item
          key={value.path.split('/').pop()}
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

export default connect((state: IState) => ({ isLoggedIn: state.isLoggedIn }))(withRouter(Menu));
