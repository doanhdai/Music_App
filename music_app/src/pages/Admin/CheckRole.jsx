import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Define role constants to improve readability and maintain consistency
const ROLES = {
  ADMIN: 'AUTH0001',
  ARTIST: 'AUTH0002',
  USER: 'AUTH0003'
};

const CheckRole = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem('account') || 'null');
    const currentPath = location.pathname;

    // Helper function to clear login state
    const clearLoginState = () => {
      localStorage.removeItem('account');
      localStorage.removeItem('isLoggedIn');
      navigate('/');
    };
    if (currentPath === '/admin') {
      if (!account || account.ma_quyen === ROLES.ARTIST || account.ma_quyen === ROLES.USER) {
        clearLoginState();
      }
    } 
    else if (currentPath === '/') {
      if (account&&account.ma_quyen !== ROLES.ARTIST&&account.ma_quyen !== ROLES.USER) {
        navigate('/admin');
      }
    }
  }, [navigate, location]);

  return null;
};

export default CheckRole;