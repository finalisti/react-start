import {Outlet, Link} from 'react-router';

const Layout = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/upload">Upload</Link>
        </li>
      </ul>
    </nav>
    <main>
      <Outlet />
    </main>
  </div>
);
export default Layout;
