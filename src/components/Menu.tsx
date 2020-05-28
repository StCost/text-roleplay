import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/menu.scss';
import menu, { IMenuItem } from '../configs/menu';
import { IState } from '../reducers/interfaces';

interface IMenuProps extends RouteComponentProps {
  isLoggedIn: boolean;
  unreadMessage: boolean;
}

const Menu = (props: IMenuProps) => {
  const { isLoggedIn, unreadMessage } = props;

  if (!isLoggedIn) {
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
        {menu.map((value: IMenuItem, index: number) => (
          <AntdMenu.Item
            className={(index === 0 && unreadMessage) ? 'unread' : ''}
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
};

const mapStateToProps = (state: IState) => ({
  isLoggedIn: state.isLoggedIn,
  unreadMessage: state.unreadMessage,
});


export default connect(mapStateToProps)(withRouter(Menu));
