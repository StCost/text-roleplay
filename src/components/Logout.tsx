import React from 'react';
import { Button, Avatar, Card } from 'antd';

import actions from '../actions/index';

const byeLink = 'https://cdn.lowgif.com/full/fc3d7d9abd06a92e-hi-bear-gifs-get-the-best-gif-on-giphy.gif';

const Logout = () => {
  return (
    <Card>
      <Avatar
        src={byeLink}
        size={256}
        style={{ margin: '0 auto', display: 'block' }}
      />
      <br/>
      <br/>
      <Button
        type="primary"
        size="large"
        onClick={() => actions.logout({ })}
        style={{ width: '100%' }}
      >
        Выйти
      </Button>
    </Card>
  )
};

export default Logout;
