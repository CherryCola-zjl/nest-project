import React from 'react';
import { Spin } from 'antd';

const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Spin size="large" tip="加载中..." />
    </div>
  );
};

export default Loading;
