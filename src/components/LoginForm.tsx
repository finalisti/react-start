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
      <h2 className="text-center text-2xl font-semibold">Login</h2>
      <form className="mx-auto mt-4 flex w-full max-w-md flex-col gap-4 rounded-md bg-stone-600 p-6 text-stone-50 shadow" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="loginusername">Username</label>
          <input
            className="rounded-md border border-stone-400 bg-stone-700/60 px-3 py-2 text-stone-50 transition outline-none focus:border-stone-200 focus:ring-2 focus:ring-stone-300/40"
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="loginpassword">Password</label>
          <input
            className="rounded-md border border-stone-400 bg-stone-700/60 px-3 py-2 text-stone-50 transition outline-none focus:border-stone-200 focus:ring-2 focus:ring-stone-300/40"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button className="mt-2 w-full rounded-md bg-stone-500 px-4 py-2 font-semibold transition hover:bg-stone-700" type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
