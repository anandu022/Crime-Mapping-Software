import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import supabase from "../../../utilities/supabase";
import { useNavigate } from "react-router-dom";
import ShowDetails from "../showdetails/ShowDetails";

// Define the style for the Google Map container.
const containerStyle = {
  width: "100%",
  height: "500px",
};

// Define a default center for the map in case geolocation fails.
const defaultCenter = {
  lat: 0, // Fallback latitude value
  lng: 0, // Fallback longitude value
};

// React component to display a Google Map with crime locations.
const ShowMap = () => {
  // State to store the center of the map. Initialized with defaultCenter.
  const [center, setCenter] = useState(defaultCenter);
  // State to store an array of crime location objects.
  const [crimeLocations, setCrimeLocations] = useState([]);
  // Hook to navigate to different routes.
  const navigate = useNavigate();

  // useEffect hook to get the user's current location when the component mounts.
  useEffect(() => {
    // Check if geolocation is available in the browser.
    if (navigator.geolocation) {
      // Get the user's current position.
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Log the latitude and longitude to the console.
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);

          // Update the center state with the user's coordinates.
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Log a warning if geolocation permission is denied.
          console.warn("Geolocation permission denied. Using default location.");
        }
      );
    }
  }, []); // Empty dependency array means this effect runs only once on mount.

  // useEffect hook to fetch crime locations from Supabase.
  useEffect(() => {
    // Async function to fetch crime locations.
    const fetchCrimeLocations = async () => {
      // Fetch crime data from the 'tbl_crime' table where crime_status is 1.
      const { data, error } = await supabase.from("tbl_crime").select("id, crime_lan, crime_log").eq("crime_status", 1);
      if (error) {
        // Log an error if fetching fails.
        console.error("Error fetching crime locations:", error);
      } else {
        // Filter out crime locations with missing latitude or longitude and transform the data.
        const locations = data
          .filter((crime) => crime.crime_lan && crime.crime_log)
          .map((crime) => ({
            id: crime.id, // Store crime ID
            lat: parseFloat(crime.crime_lan), // Parse latitude to float
            lng: parseFloat(crime.crime_log), // Parse longitude to float
          }));

        // Update the crimeLocations state with the fetched and transformed data.
        setCrimeLocations(locations);
      }
    };

    // Call the fetchCrimeLocations function.
    fetchCrimeLocations();
  }, []); // Empty dependency array means this effect runs only once on mount.

  // Function to handle marker click, navigating to the crime details page.
  const handleMarkerClick = (id) => {
    navigate(`/user/viewcrime-details/${id}`); // Navigate to the crime details page with the crime ID.
  };

  return (
    <div>
      {/* Load the Google Maps API with the provided API key. */}
      <LoadScript googleMapsApiKey="your-google-key">
        {/* Render the Google Map component. */}
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {/* Render markers for each crime location. */}
          {crimeLocations.map((crime, index) => (
            <Marker key={index} position={crime} onClick={() => handleMarkerClick(crime.id)} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default ShowMap;