import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import supabase from '../../../utilities/supabase';

const LandOff = () => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const { data, error } = await supabase
            .from("tbl_officials")
            .select()
            .eq("id", sessionStorage.getItem("uid"))
            .single();
        if (error) {
            console.error("Error fetching data:", error);
        } else {
            console.log(data);
            setName(data);
        }
        setLoading(false);
    };

  useEffect(() => {
    fetchData();
  }, []);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            textAlign: "center"
          }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(45deg, #800080, #DA70D6)", // Dark to light purple
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome, {name.officials_name}!
            </Typography>
          </div>
    )
}

export default LandOff