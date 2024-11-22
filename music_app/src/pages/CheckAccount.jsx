import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckAccount = ({ ma_quyen }) => {
  const navigate = useNavigate(); // Thay vì useHistory, dùng useNavigate

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem('account'));
    if (!account || account.ma_tk !== ma_quyen) {
      localStorage.removeItem('account');
      localStorage.removeItem('isLoggedIn');
      navigate('/');
    }
  }, [navigate]);
  return null;
};

export default CheckAccount;
