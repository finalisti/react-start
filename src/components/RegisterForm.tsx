import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import type {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = () => {
  const {postRegister} = useUser();

  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };
  const doRegister = async () => {
    // eslint-disable-next-line react-hooks/immutability
    const result = await postRegister(inputs as RegisterCredentials);
    console.log('post registration result', result);
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <>
      <h2>Register</h2>
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
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            id="email"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
