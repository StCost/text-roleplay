import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import { AvatarProps } from 'antd/es/avatar';

import { colorFromString, isURL } from '../helpers/utils';

interface IAvatarProps extends AvatarProps {
  avatar: string;
  nickname: string;
}

const Avatar = (props: IAvatarProps) => {
  const { avatar, nickname, style, ...rest } = props;

  const _avatar = isURL(avatar) ? avatar : '';
  isURL(avatar); // For some reason validation returns always false without this line????????????????????
  return (
    <AntdAvatar
      src={_avatar}
      style={{ ...style, backgroundColor: _avatar ? 'transparent' : colorFromString(nickname) }}
      {...rest}
    >
      {nickname && nickname}
    </AntdAvatar>
  )
};

export default Avatar;
