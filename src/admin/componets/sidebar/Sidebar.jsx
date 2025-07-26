import "./sidebar.scss";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
// Updated MUI icons
import DashboardIcon from "@mui/icons-material/Dashboard"; // for Dashboard
import HomeIcon from "@mui/icons-material/Home"; // for Home Page
import ListIcon from "@mui/icons-material/List"; // for Crime List
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline"; // for User List
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // for Add Officials
import GroupIcon from "@mui/icons-material/Group"; // for Officials List
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // for View Profile
import LockIcon from "@mui/icons-material/Lock"; // for Update Password
import LogoutIcon from "@mui/icons-material/Logout"; // for Log Out

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="./../home" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DashboardIcon className="icon" style={{ marginRight: "10px" }} />
            <span className="logo">Dashboard</span>
          </div>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">OPTIONS</p>
          <Link to="./../viewcrime" style={{ textDecoration: "none" }}>
            <li>
              <ListIcon className="icon" />
              <span>Crime List</span>
            </li>
          </Link>
          <Link to="./../users" style={{ textDecoration: "none" }}>
            <li>
              <PeopleOutlineIcon className="icon" />
              <span>User List</span>
            </li>
          </Link>
          <Link to="./../newoff" style={{ textDecoration: "none" }}>
            <li>
              <PersonAddIcon className="icon" />
              <span>Add Officials</span>
            </li>
          </Link>
          <Link to="./../listofficials" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Officials List</span>
            </li>
          </Link>
          <p className="title">PROFILE</p>
          <Link to="./../viewprofile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className="icon" />
              <span>View Profile</span>
            </li>
          </Link>
          <Link to="./../changepass" style={{ textDecoration: "none" }}>
            <li>
              <LockIcon className="icon" />
              <span>Update Password</span>
            </li>
          </Link>
          <Link to="./../../" style={{ textDecoration: "none" }}>
            <li>
              <LogoutIcon className="icon" />
              <span>Log Out</span>
            </li>
          </Link>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;