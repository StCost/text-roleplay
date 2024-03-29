import React, { Component } from 'react';
import { Menu as AntdMenu } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';

import '../styles/menu.scss';
import menu, { IMenuItem, characterMenu, userMenu } from '../configs/menu';
import {IState, IUser, IUsers} from '../reducers/interfaces';

interface TitleEventEntity {
  key: string;
  domEvent: Event;
}

interface IMenuProps extends RouteComponentProps {
  isLoggedIn: boolean;
  unreadMessage: boolean;
  currentUser: IUser | null;
  users: IUsers;
}

interface IMenuState {
  openedKeys: string[],
  showDisabledMenus: boolean;
}

class Menu extends Component<IMenuProps, IMenuState> {
  state = {
    openedKeys: ['char', 'user'],
    showDisabledMenus: false,
    ...JSON.parse(localStorage.getItem('menu-opened') || '{}'),
  };

  componentDidUpdate = (prevProps: IMenuProps, prevState: IMenuState) => {
    if (prevState !== this.state) {
      localStorage.setItem('menu-opened', JSON.stringify(this.state));
    }

    const { showDisabledMenus } = this.state;
    const { currentUser } = this.props;
    const enableDisabledFeatures = localStorage.getItem('enableDisabledFeatures') === 'true' || (currentUser?.enableDisabledFeatures) || false;
    if (enableDisabledFeatures !== showDisabledMenus)
      this.setState({ showDisabledMenus: enableDisabledFeatures });
  };

  getMenuItem = (value: IMenuItem) => {
    const { showDisabledMenus } = this.state;

    return (!value.disabled || showDisabledMenus) && (
      <AntdMenu.Item
        className={(showDisabledMenus && value.path === '/chat' && this.props.unreadMessage) ? 'unread' : ''}
        key={value.path.split('/').pop()}
        disabled={value.path === this.props.location.pathname}
        onClick={() => window.innerWidth < 767 && this.setState({ openedKeys: [] })}
      >
        <Link to={value.path}>
          {value.icon}
          {typeof value.label === 'function' ? value.label() : value.label}
        </Link>
      </AntdMenu.Item>
    );
  };

  onTitleClick = (event: TitleEventEntity) => {
    const { openedKeys } = this.state;
    const index = openedKeys.indexOf(event.key) > -1;
    if (index) {
      this.setState({ openedKeys: openedKeys.filter((key: string) => key !== event.key) })
    } else {
      this.setState({ openedKeys: [...openedKeys, event.key] })
    }
  };

  getMenu = () => {
    const { location } = this.props;
    const { openedKeys } = this.state;
    const isMobile = window.innerWidth < 767;
    const mode = isMobile
      ? 'horizontal'
      : 'inline';

    const userSubMenu = (
      <AntdMenu.SubMenu
        title="Пользователь"
        key="user"
        icon={<RobotOutlined/>}
        onTitleClick={this.onTitleClick}
      >
        {userMenu.map(this.getMenuItem)}
      </AntdMenu.SubMenu>
    );

    const characterSubMenu = (
      <AntdMenu.SubMenu
        title="Персонаж"
        key="char"
        icon={<UserOutlined/>}
        onTitleClick={this.onTitleClick}
      >
        {characterMenu.map(this.getMenuItem)}
      </AntdMenu.SubMenu>
    );

    const preMenu = isMobile ? this.getMenuItem(menu[1]) : false;
    const restMenu = (isMobile ? [menu[0], menu[2]] : menu).map(this.getMenuItem);

    return (
      <div className="menu">
        <AntdMenu
          mode={mode}
          selectedKeys={[location.pathname.split('/').pop() || '']}
          openKeys={openedKeys}
        >
          {preMenu}
          {characterSubMenu}
          {userSubMenu}
          {restMenu}
        </AntdMenu>
      </div>
    );
  };

  render = () => {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return <React.Fragment/>;
    }

    return this.getMenu();
  };
}

const mapStateToProps = (state: IState) => ({
  isLoggedIn: state.isLoggedIn,
  unreadMessage: state.unreadMessage,
  currentUser: state.currentUser,
  users: state.users,
});


export default connect(mapStateToProps)(withRouter(Menu));
