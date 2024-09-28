import { jwtDecode } from 'jwt-decode'; // Use named import
import { createContext, useState, ReactNode, useEffect, FC } from 'react';
import Cookies from 'js-cookie';

export interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
  setAuth: (user: string, token: string) => void;
  roles: string[];
  loading: boolean;
  token: string;
  userId: string;
}

export interface AuthToken {
  nameid: string;
  given_name: string;
  role?: string[];
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [roles, setRoles] = useState<string[]>(['Guest']);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const storedAuth = Cookies.get('isAuthenticated');
    const storedRoles = Cookies.get('roles');
    const storedToken = Cookies.get('accessToken');
    const storedUserId = Cookies.get('nameid');

    if (storedAuth && storedRoles) {
      setIsAuthenticated(storedAuth === 'true');
      setRoles(JSON.parse(storedRoles));
      setToken(storedToken || '');
      setUserId(storedUserId || '');
    }
    setLoading(false);
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    setRoles(['Guest']);
    setToken('');
    Cookies.remove('nameid');
    Cookies.set('isAuthenticated', 'false');
    Cookies.remove('user');
    Cookies.remove('roles');
    Cookies.remove('accessToken');
  };

  const setAuth = (user: string, token: string) => {
    setIsAuthenticated(true);
    const decodedToken: AuthToken = jwtDecode(token); // Now it should work
    const role = decodedToken.role ?? ['Guest'];
    setRoles(role);
    setToken(token);
    setUserId(decodedToken.nameid);

    // Store in cookies with 7 days expiration
    Cookies.set('isAuthenticated', 'true', { expires: 7 });
    Cookies.set('user', user, { expires: 7 });
    Cookies.set('roles', JSON.stringify(role), { expires: 7 });
    Cookies.set('accessToken', token, { expires: 7 });
    Cookies.set('nameid', decodedToken.nameid, { expires: 7 });
  };

  const value: AuthContextType = { isAuthenticated, logout, setAuth, roles, loading, token, userId };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
