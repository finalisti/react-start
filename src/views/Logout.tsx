import {useUserContext} from '../hooks/ContextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();
  handleLogout();

  return (
    <>
      <p>Logout</p>
    </>
  );
};

export default Logout;
