import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import supabase from "../../../utilities/supabase";
import { useParams } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = { lat: 0, lng: 0 }; // Default fallback location

const ShowMap = () => {
  const [crimeLocation, setCrimeLocation] = useState(null);
  const { id } = useParams();

  // Fetch crime location by ID
  useEffect(() => {
    const fetchCrimeLocation = async () => {
      const { data, error } = await supabase
        .from("tbl_crime")
        .select("crime_lan, crime_log")
        .eq("id", id)
        .single(); // Get a single record

      if (error) {
        console.error("Error fetching crime location:", error);
      } else if (data) {
        setCrimeLocation({
          lat: parseFloat(data.crime_lan),
          lng: parseFloat(data.crime_log),
        });
      }
    };

    fetchCrimeLocation();
  }, [id]);

  return (
    <LoadScript googleMapsApiKey="your-google-key">
      <GoogleMap mapContainerStyle={containerStyle} center={crimeLocation || defaultCenter} zoom={crimeLocation ? 15 : 5}>
        {/* Render crime location marker */}
        {crimeLocation && <Marker position={crimeLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default ShowMap;