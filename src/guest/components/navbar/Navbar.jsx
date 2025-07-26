import React from 'react';
import style from './Navbar.module.css';
import { Link } from 'react-router-dom';
// import { Avatar } from '@mui/material';
// import img1 from '../../../assets/1.jpg';

const Navbar = () => {
  return (
    <div className={style.main}>
      <div className={style.Links}>
        <Link to={'/guest/user'} className={style.Link}>
          Register
        </Link>
      </div>
      <div className={style.Links}>
        <Link to={'/guest/login'} className={style.Link}>
          Login
        </Link>
      </div>
      {/* <div className={style.Images}>
        <Avatar alt="Profile" src={img1} />
      </div> */}
    </div>
  );
};

export default Navbar;