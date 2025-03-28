import React from 'react';
import { Button, Typography, Space, Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const Header = styled.header`
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1a2a6c;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: #1a2a6c;
  }
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureSection = styled.section`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Footer = styled.footer`
  background: #1a2a6c;
  color: white;
  padding: 40px 20px;
  text-align: center;
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <HomeContainer>
      <Header>
        <Logo>NestProject</Logo>
        <Nav>
          <NavLink href="#features">功能</NavLink>
          <NavLink href="#about">关于</NavLink>
          <NavLink href="#contact">联系我们</NavLink>
          <Button type="primary" onClick={() => navigate('/login')}>登录</Button>
        </Nav>
      </Header>
      
      <HeroSection>
        <Space direction="vertical" size="large">
          <Title>欢迎使用 NestProject</Title>
          <Paragraph style={{ fontSize: 18 }}>
            一个基于 NestJS 和 React 构建的现代化应用程序
          </Paragraph>
          <Space>
            <Button type="primary" size="large" onClick={() => navigate('/login')}>
              开始使用
            </Button>
            <Button size="large">了解更多</Button>
          </Space>
        </Space>
      </HeroSection>
      
      <FeatureSection id="features">
        <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
          主要功能
        </Title>
        
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Card title="用户管理" hoverable>
              <Paragraph>
                完整的用户管理系统，包括注册、登录、权限控制等功能。
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="数据分析" hoverable>
              <Paragraph>
                强大的数据分析工具，帮助您了解用户行为和系统性能。
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="安全保障" hoverable>
              <Paragraph>
                采用最新的安全技术，保障您的数据安全和隐私。
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </FeatureSection>
      
      <Footer>
        <Paragraph style={{ color: 'white' }}>
          © {new Date().getFullYear()} NestProject. All Rights Reserved.
        </Paragraph>
      </Footer>
    </HomeContainer>
  );
};

export default Home;