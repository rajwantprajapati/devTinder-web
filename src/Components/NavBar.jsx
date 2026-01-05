import { useSelector } from "react-redux";
import {
  selectUserFirstName,
  selectUserPhotoUrl,
} from "../Redux/users/usersSelectors";

const defaultPhotoUrl =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

const NavBar = () => {
  const userFirstName = useSelector(selectUserFirstName);
  const userPhotoUrl = useSelector(selectUserPhotoUrl);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👨‍💻 DevTinder</a>
      </div>
      <div className="flex gap-2 items-center">
        <div className="form-control">Welcome {userFirstName}</div>
        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={userPhotoUrl || defaultPhotoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
