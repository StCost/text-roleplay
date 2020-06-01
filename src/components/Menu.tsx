import React, { Component } from 'react';
import { Menu as AntdMenu } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';

import '../styles/menu.scss';
import menu, { IMenuItem, characterMenu, userMenu } from '../configs/menu';
import { IState } from '../reducers/interfaces';

interface TitleEventEntity {
  key: string;
  domEvent: Event;
}

interface IMenuProps extends RouteComponentProps {
  isLoggedIn: boolean;
  unreadMessage: boolean;
}

interface IMenuState {
  openedKeys: string[],
}

class Menu extends Component<IMenuProps, IMenuState> {
  state = {
    openedKeys: ['char', 'user'],
    ...JSON.parse(localStorage.getItem('menu-opened') || '{}'),
  };

  componentDidUpdate = (prevProps: IMenuProps, prevState: IMenuState) => {
    if (prevState !== this.state) {
      localStorage.setItem('menu-opened', JSON.stringify(this.state));
    }
  };

  getMenuItem = (value: IMenuItem, index: number = 0) => (
    <AntdMenu.Item
      className={(value.path === '/chat' && this.props.unreadMessage) ? 'unread' : ''}
      key={value.path.split('/').pop()}
      disabled={value.path === this.props.location.pathname}
    >
      <Link to={value.path}>
        {value.icon}
        {value.label}
      </Link>
    </AntdMenu.Item>
  );

  onTitleClick = (event: TitleEventEntity) => {
    const { openedKeys } = this.state;
    const index = openedKeys.indexOf(event.key) > -1;
    if (index) {
      this.setState({ openedKeys: openedKeys.filter((key: string) => key !== event.key) })
    } else {
      this.setState({ openedKeys: [...openedKeys, event.key] })
    }
  };

  render = () => {
    const { isLoggedIn, location } = this.props;
    const { openedKeys } = this.state;

    if (!isLoggedIn) {
      return <React.Fragment/>;
    }

    const mode = window.innerWidth < 767
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

    const restMenu = menu.map(this.getMenuItem);

    return (
      <div className="menu">
        <AntdMenu
          mode={mode}
          selectedKeys={[location.pathname.split('/').pop() || '']}
          openKeys={openedKeys}
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
