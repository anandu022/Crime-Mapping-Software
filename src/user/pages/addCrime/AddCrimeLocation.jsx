
import styles from './AddCrimeLocation.module.css' ;
import { Box, Button, Card } from '@mui/material'
import React, { useState } from 'react'
import supabase from '../../../utilities/supabase';
import { useNavigate } from 'react-router-dom';
import CrimeButton from '../../components/crimeButton/CrimeButton';

const AddCrimeLocation = () => {
    // const [location, setLocation] = useState(null);
    const navigate = useNavigate()

    // const handleAddLocation = async () => {
        // if (!navigator.geolocation) {
        //     alert("Geolocation is not supported by this browser.");
        //     return;
        // }

        // navigator.geolocation.getCurrentPosition(async (position) => {
        //     const newLocation = {
        //         lat: position.coords.latitude,
        //         lng: position.coords.longitude,
        //     };
        //     setLocation(newLocation);
        //     console.log(newLocation);

        //     const crimeData = {

        //         crime_lan: newLocation.lat.toString(),
        //         crime_log: newLocation.lng.toString(),
        //     }
        //     try {
        //         const { error } = await supabase
        //             .from("tbl_crime")
        //             .insert([crimeData]);

        //         if (error) {
        //             console.error("Supabase Insert Error:", error.message);
        //         } else {
        //             console.log("Location added to database successfully.");
        //             navigate("/")
        //         }
        //     } catch (err) {
        //         console.error("Unexpected error:", err);
        //     }
        // });

    //     navigate("/user/crimedetails")
    // };

    return (
        <div >
            <h1 align='center'>Report a Crime</h1>
            <div className = {styles.cont1}>
                <CrimeButton /> 
            </div>
        </div>
    )
}

export default AddCrimeLocation
