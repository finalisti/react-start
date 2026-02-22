import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import type {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = () => {
  const {postRegister, getUsernameAvailable, getEmailAvailable} = useUser();
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
  const [emailAvailable, setEmailAvailable] = useState<boolean>(true);
  const [registerError, setRegisterError] = useState<string>('');

  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };
  const doRegister = async () => {
    try {
      // eslint-disable-next-line react-hooks/immutability
      const userResponse = await getUsernameAvailable(inputs.username);
      // check also useEffects below!
      setUsernameAvailable(userResponse.available);
      const emailResponse = await getEmailAvailable(inputs.email);
      setEmailAvailable(emailResponse.available);
      if (userResponse.available && emailResponse.available) {
        const result = await postRegister(inputs as RegisterCredentials);
        console.log('post registration result', result);
      }
    } catch (error) {
      console.log((error as Error).message);
      setRegisterError((error as Error).message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  // option: check username & email availibilities based on state updates using useEffects
  useEffect(() => {
    const checkUsername = async () => {
      if (inputs.username.length > 2) {
        try {
          const userResponse = await getUsernameAvailable(inputs.username);
          setUsernameAvailable(userResponse.available);
        } catch (error) {
          console.log((error as Error).message);
        }
      }
    };
    checkUsername();
  }, [inputs.username, getUsernameAvailable]);

  useEffect(() => {
    const checkEmail = async () => {
      if (inputs.email.length > 4) {
        try {
          const response = await getEmailAvailable(inputs.email);
          setEmailAvailable(response.available);
        } catch (error) {
          console.log((error as Error).message);
        }
      }
    };
    checkEmail();
  }, [inputs.email, getEmailAvailable]);

  return (
    <>
      <h2 className="text-center text-2xl font-semibold">Register</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-4 flex w-full max-w-md flex-col gap-4 rounded-md bg-stone-600 p-6 text-stone-50 shadow"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="loginusername">
            Username
          </label>
          <input
            className="rounded-md border border-stone-400 bg-stone-700/60 px-3 py-2 text-stone-50 transition outline-none focus:border-stone-200 focus:ring-2 focus:ring-stone-300/40"
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
          {!usernameAvailable && (
            <p className="text-sm text-red-500">Username is already taken</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md border border-stone-400 bg-stone-700/60 px-3 py-2 text-stone-50 transition outline-none focus:border-stone-200 focus:ring-2 focus:ring-stone-300/40"
            name="email"
            type="text"
            id="email"
            onChange={handleInputChange}
            autoComplete="email"
          />
          {!emailAvailable && (
            <p className="text-sm text-red-500">Email address not available</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md border border-stone-400 bg-stone-700/60 px-3 py-2 text-stone-50 transition outline-none focus:border-stone-200 focus:ring-2 focus:ring-stone-300/40"
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
          />
          {registerError && (
            <p className="text-sm text-red-500">{registerError}</p>
          )}
        </div>
        <button
          className="mt-2 w-full rounded-md bg-stone-500 px-4 py-2 font-semibold transition hover:bg-stone-700"
          type="submit"
          // TODO: disable when form is not valid
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
