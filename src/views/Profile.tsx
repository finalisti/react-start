import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import type {UserWithNoPassword} from 'hybrid-types/DBTypes';

const Profile = () => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {getUserByToken} = useUser();

  useEffect(() => {
    const getUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userResponse = await getUserByToken(token);
        console.log('user profile', userResponse);
        setUser(userResponse.user);
      }
    };
    getUserInfo();
  }, []);

  return (
    <>
      {user && (
        <>
          <h2>{user.username}</h2>
          <p>Email: ({user.email})</p>
          <p>User level: {user.level_name}</p>
          <p>Registered: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
        </>
      )}
    </>
  );
};

export default Profile;
