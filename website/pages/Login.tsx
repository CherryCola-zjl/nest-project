import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { post } from '../utils/request';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { log } from 'console';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
`;

const LoginFormWrapper = styled.div`
  width: 450px;
  margin: auto;
  padding: 40px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Logo = styled.h1`
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(90deg, #1a2a6c, #b21f1f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 24px;
  }

  .login-form-button {
    width: 100%;
    height: 45px;
    border-radius: 8px;
    font-size: 16px;
    background: linear-gradient(90deg, #1a2a6c, #b21f1f);
    border: none;
  }

  .ant-input-affix-wrapper {
    padding: 12px;
    border-radius: 8px;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #888;
  font-size: 14px;
`;

interface LoginValues {
  username: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const encryptPassword = (password: string) => {
    const secretKey = 'your-secret-key'; // 需要与后端保持一致的密钥
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  };

  const onFinish = async (values: LoginValues) => {
    try {
      setLoading(true);
      const encryptedPassword = encryptPassword(values.password);

      const response = await post<{ token: string; user: any }>('/auth/login', {
        username: values.username,
        password: encryptedPassword,
      });

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      message.success('登录成功');
      navigate('/dashboard');
    } catch (error) {
      console.error('登录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginFormWrapper>
        <LogoWrapper>
          <Logo>NestProject</Logo>
          <p>欢迎回来，请登录您的账号</p>
        </LogoWrapper>

        <StyledForm name="login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input prefix={<UserOutlined />} placeholder="用户名" size="large" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" size="large" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <a href="#" style={{ float: 'right' }}>
              忘记密码?
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            还没有账号? <a href="/register">立即注册</a>
          </div>
        </StyledForm>

        <Footer>© {new Date().getFullYear()} NestProject. All Rights Reserved.</Footer>
      </LoginFormWrapper>
    </LoginContainer>
  );
};

export default Login;
