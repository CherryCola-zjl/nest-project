import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Button, Typography } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const Logo = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.1);
  margin: 16px;
  border-radius: 4px;
`;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const StyledContent = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
  border-radius: 4px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-left: 8px;
  margin-right: 8px;
`;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleMenuClick = (info: { key: string }) => {
    navigate(`/app/${info.key}`);
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
    {
      key: 'divider',
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: '用户管理',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  return (
    <StyledLayout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <Logo>{collapsed ? 'NP' : 'NestProject'}</Logo>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <StyledHeader>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <UserInfo>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <UserName>用户</UserName>
              </div>
            </Dropdown>
          </UserInfo>
        </StyledHeader>
        <StyledContent>
          <Outlet />
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default MainLayout;
