// UserContext.tsx
import React, {createContext, useState} from 'react';
import type {UserWithNoPassword} from 'hybrid-types/DBTypes';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useLocation, useNavigate} from 'react-router';
import type {AuthContextType, Credentials} from '../types/LocalTypes';
import type {LoginResponse} from 'hybrid-types/MessageTypes';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials: Credentials) => {
    try {
      const result: LoginResponse = await postLogin(credentials);
      localStorage.setItem('token', result.token);
      setUser(result.user);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        const response = await getUserByToken(token);
        setUser(response.user);
        navigate(location.pathname || '/');
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
