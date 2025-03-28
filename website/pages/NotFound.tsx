import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname.includes('/app')) {
      navigate('/app/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Button type="primary" onClick={handleBack}>
          返回
        </Button>
      }
    />
  );
};

export default NotFound;
