import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/menu.scss';
import menu, { IMenuItem } from '../configs/menu';
import { IState } from '../reducers/interfaces';

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
    <div className="menu">
      <AntdMenu
        mode={mode}
        selectedKeys={[props.location.pathname.split('/').pop() || '']}
      >
        {menu.map((value: IMenuItem) => (
          <AntdMenu.Item
            key={value.path.split('/').pop()}
            disabled={value.path === props.location.pathname}
          >
            <Link to={value.path}>
              {value.icon}
              {value.label}
            </Link>
          </AntdMenu.Item>
        ))}
      </AntdMenu>
    </div>
  );
}

export default connect((state: IState) => ({ isLoggedIn: state.isLoggedIn }))(withRouter(Menu));
