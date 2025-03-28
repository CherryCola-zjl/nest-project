import React, { useState, useEffect } from 'react';
import { Card, Statistic, Row, Col, Table, Tag, Typography, Button } from 'antd';
import { TeamOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import { get } from '../utils/request';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await get<any[]>('/users');
      setUsers(data);
    } catch (error) {
      console.error('获取用户列表失败:', error);
    }
  };

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
    <>
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
    </>
  );
};

export default Dashboard;
