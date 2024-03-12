import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Home</h1>
          </Link>
          <p className="m-0">.</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <h6>
              <Link className="btn btn-lg btn-info m-2 flex-row align-end top-right" to="/myprofile">
                {Auth.getProfile().authenticatedPerson.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </h6>
          ) : (
            <h6>
              <Link className="btn btn-lg btn-info m-2" to="/signup">
                Login
              </Link>
              {/* <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link> */}
            </h6>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
