import React, { useEffect, useState } from 'react';
import style from './Navbar.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, Popover, Typography } from '@mui/material';
import img1 from '../../../assets/1.jpg';
import supabase from '../../../utilities/supabase';

const Navbar = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navigate = useNavigate();
  const handlelogout = () => {
    navigate("/");
  }

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCrime = async () => {
    const { data, error } = await supabase
      .from("tbl_officials")
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

  return (
    <div className={style.main}>
      <div className={style.inside}>
        <div className={style.Links}>
          <Link to={'/officials/landoff'} className={style.Link}>
            Home
          </Link>
        </div>
        <div className={style.Links}>
          <Link to={'/officials/crimelist'} className={style.Link}>
            Crime Listing
          </Link>
        </div>
      </div>
      <div className={style.inside}>
        <div className={style.Images}>
          <Avatar alt="Profile" src={userData.officials_photo} onClick={handleClick} className={style.avatar} />

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}

            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Card sx={{ width: 200, height: 190, pt: 2 }}>
              <div className={style.box}>
                <div className={style.box1}>
                  <Link to={'/officials/profile'}>
                    <Typography className={style.boxitem}>
                      My Profile
                    </Typography>
                  </Link>
                  <Link to={'/officials/editprof'}>
                    <Typography className={style.boxitem}>
                      Edit Profile
                    </Typography>
                  </Link>
                  <Link to={'/officials/newpass'}>
                    <Typography className={style.boxitem}>
                      Change Password
                    </Typography>
                  </Link>
                </div>
                <div className={style.box1}>
                  <Button variant="contained" onClick={handlelogout}>
                    Log Out
                  </Button>
                </div>
              </div>
            </Card>

          </Popover>

        </div>
      </div>
    </div>
  );
};

export default Navbar;