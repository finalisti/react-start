import {useEffect} from 'react';
import {useNavigate} from 'react-router';

const Logout = () => {
  const navigate = useNavigate();
  localStorage.removeItem('token');
  useEffect(() => {
    navigate('/');
  }, []);

  return (
    <>
      <p>Logout</p>
    </>
  );
};

export default Logout;
