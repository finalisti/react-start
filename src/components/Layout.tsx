import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect} from 'react';

const Layout = () => {
  const {handleAutoLogin, user} = useUserContext();
  useEffect(() => {
    handleAutoLogin();
  }, [handleAutoLogin]);
  return (
    <div>
      <header className="bg-stone-600">
        <div className="mx-auto mb-4 flex w-full max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
          <nav>
            <ul className="m-0 flex items-center justify-end gap-1 p-0">
              <li>
                <Link className="block rounded px-3 py-2 text-center font-bold transition-all duration-500 ease-in-out hover:bg-stone-700" to="/">Home</Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link className="block rounded px-3 py-2 text-center font-bold transition-all duration-500 ease-in-out hover:bg-stone-700" to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link className="block rounded px-3 py-2 text-center font-bold transition-all duration-500 ease-in-out hover:bg-stone-700" to="/upload">Upload</Link>
                  </li>
                  <li>
                    <Link className="block rounded px-3 py-2 text-center font-bold transition-all duration-500 ease-in-out hover:bg-stone-700" to="/logout">Logout</Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link className="block rounded px-3 py-2 text-center font-bold transition-all duration-500 ease-in-out hover:bg-stone-700" to="/login">Login</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
