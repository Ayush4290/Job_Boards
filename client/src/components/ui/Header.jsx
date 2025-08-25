import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Job Board
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {user ? (
            <>
              {user.role === 'employer' && (
                <>
                  <Link to="/post-job" className="hover:underline">
                    Post Job
                  </Link>
                  <Link to="/my-jobs" className="hover:underline">
                    My Jobs
                  </Link>
                </>
              )}
              {user.role === 'job_seeker' && (
                <Link to="/applications" className="hover:underline">
                  My Applications
                </Link>
              )}
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;