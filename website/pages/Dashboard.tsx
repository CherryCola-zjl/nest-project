import React, { useState, useEffect } from 'react';
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Button,
  Card,
  Statistic,
  Row,
  Col,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  RiseOutlined,
  FallOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { get } from '../utils/request';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

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

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 获取用户信息
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUserData(JSON.parse(userStr));
    }

    // 获取用户列表
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const data = await get<any[]>('/users');
      setUsers(data);
    } catch (error) {
      console.error('获取用户列表失败:', error);
    }
  };

  const handleLogout = () => {
    // 清除本地存储中的 token 和用户信息
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // 跳转到登录页
    navigate('/login');

    message.success('已成功退出登录');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        个人资料
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      key: 'status',
      render: () => <Tag color="green">正常</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => <Button type="link">查看详情</Button>,
    },
  ];

  return (
    <StyledLayout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <Logo>{collapsed ? 'NP' : 'NestProject'}</Logo>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            仪表盘
          </Menu.Item>
          <Menu.Item key="users" icon={<TeamOutlined />}>
            用户管理
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            系统设置
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <StyledHeader>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <UserInfo>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <div style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <UserName>{userData?.username || '用户'}</UserName>
              </div>
            </Dropdown>
          </UserInfo>
        </StyledHeader>
        <StyledContent>
          <Title level={4}>仪表盘</Title>

          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card>
                <Statistic title="用户总数" value={users.length} prefix={<TeamOutlined />} />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="今日活跃"
                  value={42}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<RiseOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="本周新增"
                  value={8}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<RiseOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="流失用户"
                  value={3}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<FallOutlined />}
                />
              </Card>
            </Col>
          </Row>

          <Card title="用户列表" extra={<Button type="primary">添加用户</Button>}>
            <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 10 }} />
          </Card>
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default Dashboard;
