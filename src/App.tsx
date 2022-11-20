import { Layout } from 'antd';
import React, { useEffect } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { useAction } from './hooks/useAction';
import { IUser } from './models/user';

const App: React.FC = () => {
  const {setUser, setIsAuth} = useAction();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUser({username: localStorage.getItem('username' || '')} as IUser);
      setIsAuth(true);
    }
  }, [])

  return (
    <Layout >
      <Navbar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>

    </Layout>
  );
}

export default App;
