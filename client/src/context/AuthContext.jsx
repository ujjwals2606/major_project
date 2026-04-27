import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {

    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user || state.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ✅ FIXED AUTH CHECK (NO LOGOUT ON REFRESH)
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await fetch('/api/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();

            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { user: userData, token },
            });
          } else {
            // ❗ KEEP USER LOGGED IN
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { user: null, token },
            });
          }
        } catch (error) {
          console.error('Auth check failed:', error);

          // ❗ STILL KEEP USER LOGGED IN
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: null, token },
          });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: data, token: data.token },
        });

        toast.success('Login successful!');
        return { success: true };
      } else {
        toast.error(data.message || 'Login failed');
        return { success: false };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error');
      return { success: false };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // ✅ REGISTER
  const register = async (name, email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: data, token: data.token },
        });

        toast.success('Registration successful!');
        return { success: true };
      } else {
        toast.error(data.message || 'Registration failed');
        return { success: false };
      }
    } catch (error) {
      console.error('Register error:', error);
      toast.error('Network error');
      return { success: false };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  // ✅ UPDATE USER
  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ HOOK
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};