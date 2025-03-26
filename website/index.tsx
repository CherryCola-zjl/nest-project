import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    // 调用 findAll 接口
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => {
        console.log('人员数据:', data); // 打印结果
      })
      .catch(error => console.error('获取人员数据失败:', error));
  }, []);

  return (
    <div>
      <h1>欢迎来到项目首页</h1>
      <p>这是使用 React 构建的项目首页</p>
      <h2>人员列表</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<App />);
