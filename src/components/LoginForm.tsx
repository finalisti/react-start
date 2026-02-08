import useForm from '../hooks/formHooks';
import type {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/ContextHooks';

const LoginForm = () => {
  const initValues: Credentials = {
    username: '',
    password: '',
  };
  const {handleLogin} = useUserContext();

  const doLogin = async () => {
    try {
      // eslint-disable-next-line react-hooks/immutability
      handleLogin(inputs as Credentials);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginusername">Username</label>
          <input
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
