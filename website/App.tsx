import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

const App: React.FC = () => {
  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      if (route.children) {
        return (
          <Route key={`route-${index}`} path={route.path} element={route.element}>
            {renderRoutes(route.children)}
          </Route>
        );
      }

      return (
        <Route
          key={`route-${index}`}
          path={route.path}
          index={route.index}
          element={route.element}
        />
      );
    });
  };

  return (
    <ErrorBoundary>
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>{renderRoutes(routes)}</Routes>
          </Suspense>
        </BrowserRouter>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default App;
