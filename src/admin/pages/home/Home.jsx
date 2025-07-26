import React from "react";
import Sidebar from "../../componets/sidebar/Sidebar";
import Navbar from "../../componets/navbar/Navbar";
import "./home.scss";
import Widget from "../../componets/widget/Widget";
import Featured from "../../componets/featured/Featured";
import Chart from "../../componets/chart/Chart";
import Table from "../../componets/table/Table";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ViewCrime from "../viewCrime/ViewCrime";
import Crimetable from "../../componets/crimetable/Crimetable";


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Home = () => {
  return (
   <div>

        {/* <Navbar /> */}
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          
        </div>
        
        <div className="listContainer">
          <div className="listTitle">Recent Crimes</div>
          <Crimetable/>
        </div>

        {/* <ViewCrime/> */}
        

        <div className="details" class="cardd">
              <Typography gutterBottom sx={{ color: 'text.secondary'}} className="cardtitle">
                About
              </Typography>
              <Typography sx={{ color: 'text.primary'}} className = "text2">
              Crime Radar is a real-time crime mapping platform designed to enhance public safety by providing up-to-date crime reports. Our interactive map highlights crime hotspots, allowing users to stay informed and take necessary precautions. Verified users can report crimes instantly, where the officials can view the crime in real time and act accordingly.
              </Typography>
              <Typography sx={{ color: 'text.primary'}} className = "text2">
              Our main aim is to create a safe and secure environment for peaceful life. Stay aware, stay safe, and help make your community a better place.
              </Typography>
        </div>
   </div>
     
  );
};

export default Home;
