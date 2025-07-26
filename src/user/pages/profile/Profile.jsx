import React, { useEffect, useRef, useState } from 'react';
import img1 from '../../../assets/1.jpg';
import { Avatar, Typography } from '@mui/material';
import style from './Profile.module.css';
import EditIcon from '@mui/icons-material/Edit';
import supabase from '../../../utilities/supabase';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Profile = () => {

  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

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

  const handleIconClick = () => {
    // fileInputRef.current.click();
    navigate("/user/changephoto")
  };

  return (
    <div>
      <h1 align="center">PROFILE</h1>
      <div className={style.container}>
        <div className={style.column1}>
          <Avatar
            alt="Profile"
            src={userData.user_photo}
            sx={{ width: 100, height: 100 }}
            className={style.avatar}
          />
          {/* <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(event) => console.log(event.target.files)}
            accept="image/*" // Restrict to image files
          /> */}
          <EditIcon className={style.edit} onClick={handleIconClick} />
        </div>

        <div className={style.column2}>
          <h2 align='center'>DETAILS</h2>

            <div>
              <Typography className={style.boxitem}>
                {userData.user_name}
              </Typography>
              <Typography className={style.boxitem}>
                {userData.user_email}
              </Typography>
              <Typography className={style.boxitem}>
              {userData.user_phone}
              </Typography>
              <Typography className={style.boxitem}>
              {userData.user_address}
              </Typography>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;