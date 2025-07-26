import React, { useEffect, useState } from 'react';
import style from './ViewProfile.module.css';
import EditIcon from '@mui/icons-material/Edit';
import supabase from '../../../utilities/supabase';
import img1 from '../../../assets/1.jpg';
import { Avatar, Typography } from '@mui/material';

const ViewProfile = () => {

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
        <div>
            <h1 align="center">PROFILE</h1>
            <div className={style.container}>
                <div className={style.column1}>
                    <Avatar
                        alt="Profile"
                        src={userData.officials_photo}
                        sx={{ width: 100, height: 100 }}
                        className={style.avatar}
                    />

                </div>

                <div className={style.column2}>
                    <h2 align='center'>DETAILS</h2>

                    <div>
                        <Typography className={style.boxitem}>
                        {userData.officials_name}
                        </Typography>
                        <Typography className={style.boxitem}>
                        {userData.officials_email}
                        </Typography>
                        <Typography className={style.boxitem}>
                        {userData.officials_phone}
                        </Typography>
                        <Typography className={style.boxitem}>
                        {userData.officials_address}
                        </Typography>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ViewProfile