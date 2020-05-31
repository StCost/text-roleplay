import React, { Component } from 'react';
import { Menu as AntdMenu } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';

import '../styles/menu.scss';
import menu, { IMenuItem, characterMenu, userMenu } from '../configs/menu';
import { IState } from '../reducers/interfaces';

interface IMenuProps extends RouteComponentProps {
  isLoggedIn: boolean;
  unreadMessage: boolean;
}

class Menu extends Component<IMenuProps> {
  getMenuItem = (value: IMenuItem, index: number = 0) => (
    <AntdMenu.Item
      className={(index === 0 && this.props.unreadMessage) ? 'unread' : ''}
      key={value.path.split('/').pop()}
      disabled={value.path === this.props.location.pathname}
    >
      <Link to={value.path}>
        {value.icon}
        {value.label}
      </Link>
    </AntdMenu.Item>
  );

  render = () => {
    const { isLoggedIn, location } = this.props;

    if (!isLoggedIn) {
      return <React.Fragment/>;
    }

    const mode = window.innerWidth < 767
      ? 'horizontal'
      : 'inline';

    const userSubMenu = (
      <AntdMenu.SubMenu
        title="Пользователь"
        icon={<RobotOutlined/>}
      >
        {userMenu.map(this.getMenuItem)}
      </AntdMenu.SubMenu>
    );

    const characterSubMenu = (
      <AntdMenu.SubMenu
        title="Персонаж"
        icon={<UserOutlined/>}
      >
        {characterMenu.map(this.getMenuItem)}
      </AntdMenu.SubMenu>
    );

    const restMenu = menu.map(this.getMenuItem);

    return (
      <div className="menu">
        <AntdMenu
          mode={mode}
          selectedKeys={[location.pathname.split('/').pop() || '']}
        >
          {characterSubMenu}
          {userSubMenu}
          {restMenu}
        </AntdMenu>
      </div>
    );
  };
}

const mapStateToProps = (state: IState) => ({
  isLoggedIn: state.isLoggedIn,
  unreadMessage: state.unreadMessage,
});


export default connect(mapStateToProps)(withRouter(Menu));
