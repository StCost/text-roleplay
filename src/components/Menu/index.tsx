import React from 'react';
import { Menu as AntdMenu } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import routes, { IRoute } from '../../configs/routes';
import { mapLoggedToProps } from '../../helpers/utils';

interface IMenuProps extends RouteComponentProps {
  isLoggedIn: boolean;
}

function Menu(props: IMenuProps) {
  if (!props.isLoggedIn) {
    return <React.Fragment/>;
  }

  return (
    <AntdMenu
      style={{ width: 256 }}
      mode="inline"
      selectedKeys={[props.location.pathname]}
    >
      {routes.map((value: IRoute) => (
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

export default connect(mapLoggedToProps)(withRouter(Menu));
