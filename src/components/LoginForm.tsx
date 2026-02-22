import useForm from '../hooks/formHooks';
import type {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {Button} from './ui/button';

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
      <h2 className="text-center text-2xl font-semibold">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-card text-card-foreground mx-auto mt-4 flex w-full max-w-md flex-col gap-4 rounded-md p-6 shadow"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="loginusername">
            Username
          </label>
          <input
            className="border-input bg-background text-foreground focus:border-ring focus:ring-ring rounded-md border px-3 py-2 transition outline-none focus:ring-2"
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="loginpassword">
            Password
          </label>
          <input
            className="border-input bg-background text-foreground focus:border-ring focus:ring-ring rounded-md border px-3 py-2 transition outline-none focus:ring-2"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <Button className="mt-2 w-full font-semibold" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
