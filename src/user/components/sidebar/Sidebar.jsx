import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Sidebar.module.css';
import HomeIcon from '@mui/icons-material/Home';
import { Home } from '@mui/icons-material';
import CollapseButton from '../collapseButton/CollapseButton';
import supabase from '../../../utilities/supabase';
import { Avatar, Button, Card, Popover, Typography } from '@mui/material';

const Sidebar = () => {

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCrime = async () => {
    const { data, error } = await supabase
      .from("tbl_user")
      .select()
      .eq("id", sessionStorage.getItem("uid"))
      .single();
    if (error) {
      console.error("Error fetching crime data:", error);
    } else {
      console.log(data);

      setUserData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCrime();
  }, []);

  const handleClick = () => {
    navigate('/user/profile')
  }

  return (
    <div className={style.sidebar}>
      {/* <div className={style.collapsebuttonbox}>
        <CollapseButton/>
      </div> */}

      {/* <div className={style.link}>
        <Link to={'/user/home'} className={style.Link1}>
          <HomeIcon className={style.icon}/>
          Home
        </Link>
      </div> */}

      <div className={style.collapsebuttonbox}>
        <Typography>Welcome!</Typography>
        <Avatar alt="Profile" src={userData.user_photo} onClick={handleClick} className={style.avatar} />
      </div>
      <div className={style.link}>
        <Link to={'/user/addcrime'} className={style.Link1}>
          Add Crime
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'/user/showmap'} className={style.Link1}>
          View Map
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'/user/listcrime'} className={style.Link1}>
          Recent Crimes
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'/user/profile'} className={style.Link1}>
          View Profile
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'/user/editprofile'} className={style.Link1}>
          Edit Profile
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'/user/changepassword'} className={style.Link1}>
          Change Password
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'/user/notification'} className={style.Link1}>
          Notifications
        </Link>
      </div>
      <div className={style.link}>
        <Link to={'./../../guest'} className={style.Link1}>
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;