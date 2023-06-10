// AuthContext.tsx

import { notification } from 'antd';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi, signupApi } from '../apiEndpoints/apiEndpoints';

export type UserInfoType = {
  email_id: string
  id: string,
  location: string,
  profile_pic: string
  token: string
}

export type AuthContextType = {
  userInfo: UserInfoType;
  login: (values: PayloadType) => void;
  logout: () => void;
  signup: (values: PayloadType) => void;
  loading: boolean
}


export type PayloadType = {
  email_id: string
  password: string
  confirm_password?: string
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const defaultUserInfo = {
  email_id: '',
  id: "",
  location: '',
  profile_pic: '',
  token: ""
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [userInfo, setUserInfo] = useState<UserInfoType>(defaultUserInfo);
  const [loading, setLoading] = useState(false)
  const navigateTo = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("nested-task-app") || "{}")
    if (!!userData.token) {
      setUserInfo(userData)
      navigateTo("/tasks")
    }
  }, [navigateTo])


  const login = async (payload: PayloadType) => {
    try {
      setLoading(true)
      const { data: { result, status, message } } = await axios.post(loginApi, payload)
      if (status === "Success") {
        setUserInfo(result)
        localStorage.setItem("nested-task-app", JSON.stringify(result))
        navigateTo("/tasks")
      } else {
        notification.error({
          message: message
        })
        setUserInfo(defaultUserInfo)
        setLoading(false)
        localStorage.removeItem("nested-task-app")
      }
    } catch (error) {
      setUserInfo(defaultUserInfo)
      localStorage.removeItem("nested-task-app")
      setLoading(false)
      notification.error({
        message: "Something Went Wrong Please Try Again!"
      })
    } finally {
      setLoading(false)
    }
  };

  const logout = () => {
    setUserInfo(defaultUserInfo)
    localStorage.removeItem("nested-task-app")
    localStorage.removeItem("nested-task-app-tasks")
    navigateTo("/login")
  };

  const signup = async (payload: PayloadType) => {
    try {
      setLoading(true)
      const { data: { result, status, message } } = await axios.post(signupApi, payload)
      if (status === "Success") {
        setUserInfo(result)
        localStorage.setItem("nested-task-app", JSON.stringify(result))
        navigateTo("/tasks")

      } else {
        notification.error({
          message: message
        })
        setUserInfo(defaultUserInfo)
        setLoading(false)
        localStorage.removeItem("nested-task-app")
      }
    } catch (error) {
      setUserInfo(defaultUserInfo)
      localStorage.removeItem("nested-task-app")
      setLoading(false)
      notification.error({
        message: "Something Went Wrong Please Try Again!"
      })
    } finally {
      setLoading(false)
    }

  }
  return (
    <AuthContext.Provider value={{ userInfo, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
