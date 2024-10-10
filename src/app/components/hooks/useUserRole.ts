import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  id: string;
  role: string;
}

const useUserRole = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  console.log("authen3")
  useEffect(() => {
    const token = Cookies.get('token'); // Assuming your JWT token is stored as 'token'
    console.log("authen1")
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserRole(decoded.role);   // Set user role from token
        setIsAuthenticated(true);    // User is authenticated
        console.log("authen2")
      } catch (error) {
        console.error('Invalid token:', error);
        setIsAuthenticated(false);   // Invalid token
      }
    } else {
      setIsAuthenticated(false);      // No token, user not logged in
    }
  }, []);
  console.log(userRole,isAuthenticated)
  return { userRole, isAuthenticated };
};

export default useUserRole;
