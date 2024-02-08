import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaClipboardList,
  FaHome,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header h-20">
      <div className="flex-1 flex mx-8 ">
        <img
          className="object-cover p-4 mx-auto"
          href="/"
          src="https://see.fontimg.com/api/renderfont4/owdl4/eyJyIjoiZnMiLCJoIjo1MywidyI6MTI1MCwiZnMiOjQyLCJmZ2MiOiIjRjFGMUYxIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/U2hvcnRVUkw/danger-night-personal-use.png"
          alt="logo"
        />
        <ul>
          <li className="">
            <Link to="/">
              <FaHome /> Home
            </Link>
          </li>
        </ul>
        <ul>
          {user ? (
            <>
              <li>
                <Link to="/dashboard">
                  <FaClipboardList /> Dashboard
                </Link>
              </li>
              <li>
                <button className="btn" onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
