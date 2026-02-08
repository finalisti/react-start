import {useNavigate} from 'react-router';
import {useAuthentication} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import type {Credentials} from '../types/LocalTypes';
import type {LoginResponse} from 'hybrid-types/MessageTypes';

const LoginForm = () => {
  const navigate = useNavigate();
  const {postLogin} = useAuthentication();
  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    //console.log(inputs);
    // login functionalities here
    // eslint-disable-next-line react-hooks/immutability
    const result: LoginResponse = await postLogin(inputs as Credentials);
    console.log('doLogin result', result);
    localStorage.setItem('token', result.token);
    navigate('/');
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
