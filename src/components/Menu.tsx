import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/menu.scss';
import menu from '../configs/menu.json';
import { IState } from '../reducers/interfaces';

interface IMenuProps extends RouteComponentProps {
  isLoggedIn: boolean;
}

interface IMenuConfig {
  label: string;
  path: string;
  link?: boolean;
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
        {menu.map((value: IMenuConfig) => (
          <AntdMenu.Item
            key={value.path.split('/').pop()}
            disabled={value.path === props.location.pathname}
          >
            {
              value.link
                ? (

                  <a
                    href={value.path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Помощь
                  </a>
                ) : (
                  <Link to={value.path}>
                    {value.label}
                  </Link>
                )
            }
          </AntdMenu.Item>
        ))}
      </AntdMenu>
    </div>
  );
}

export default connect((state: IState) => ({ isLoggedIn: state.isLoggedIn }))(withRouter(Menu));
