import React from 'react';
import { SyncOutlined, CheckCircleTwoTone } from '@ant-design/icons';

const Loader = (props: { loading: boolean }) => {
  const { loading } = props;

  return (
    <div className="loader">
      {loading
        ? (
          <SyncOutlined spin style={{color: "#eb2f96"}} />
        ) : (
          <CheckCircleTwoTone twoToneColor="#52c41a"/>
        )
      }
    </div>
  )
};

export default Loader;
