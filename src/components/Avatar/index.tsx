import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import { AvatarProps } from 'antd/es/avatar';
import { colorFromString } from "../../helpers/utils";

interface IAvatarProps extends AvatarProps {
  avatar: string;
  nickname: string;
}

const Avatar = (props: IAvatarProps) => {
  const { avatar, nickname, style, ...rest } = props;

  return (
    <AntdAvatar
      src={avatar}
      style={{ ...style, backgroundColor: avatar ? 'transparent' : colorFromString(nickname) }}
      {...rest}
    >
      {nickname}
    </AntdAvatar>
  )
};

export default Avatar;
