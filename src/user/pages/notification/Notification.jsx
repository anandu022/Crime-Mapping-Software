import React, { useEffect, useState } from "react";
import supabase from "../../../utilities/supabase"; // Imports the Supabase client
import { ToastContainer, toast } from 'react-toastify'; // Imports ToastContainer and toast for notifications (commented out)

const Notification = () => {

    // Style for the dismiss button
    const buttonStyle = {
        padding: "6px 12px",
        fontSize: "14px",
        backgroundColor: "#7016c4", // Blue color
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)", // Uniform shadow
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        alignSelf: "flex-end", // Aligns button at the bottom
    };

    // State variables
    const [crimeData, setCrimeData] = useState([]); // Stores the crime data to display as notifications
    const [loading, setLoading] = useState(true); // Tracks whether data is being loaded
    const [userLocation, setUserLocation] = useState(null); // Stores the user's location
    const notify = () => toast("New Notification!"); // Function to display a toast notification (commented out)

    // Haversine formula to calculate distance in km
    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers (km). This is a constant.
        const degToRad = (deg) => deg * (Math.PI / 180); // Function to convert degrees to radians. Radians are needed for trigonometric calculations.
        const dLat = degToRad(lat2 - lat1); // Difference in latitude between the two points, converted to radians.
        const dLon = degToRad(lon2 - lon1); // Difference in longitude between the two points, converted to radians.
      
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) + // Calculates the square of half the sine of the latitude difference.
          Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * // Calculates the cosine of both latitudes (converted to radians).
          Math.sin(dLon / 2) * Math.sin(dLon / 2); // Calculates the square of half the sine of the longitude difference.
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Calculates the angular distance in radians using the arcsine function.
        return R * c; // Returns the distance in kilometers by multiplying the angular distance by the Earth's radius.
      };

    // Function to fetch crime data and filter based on user location and seen notifications
    const fetchCrime = async () => {
        setLoading(true); // Set loading to true while fetching data
        const userId = sessionStorage.getItem('uid'); // Get user ID from session storage

        // Fetch previously seen notifications from 'tbl_notification'
        const { data: notifications, error: notifError } = await supabase
            .from("tbl_notification")
            .select("notification_crime_id")
            .eq("notification_user_id", userId);

        if (notifError) {
            console.error("Error fetching notifications:", notifError);
            setLoading(false); // Set loading to false if there's an error
            return; // Exit the function
        }

        const seenCrimeIds = notifications.map(n => n.notification_crime_id); //!

        // Fetch crime data from 'tbl_crime' where 'crime_status' is 1 (active crimes)
        const { data, error } = await supabase.from("tbl_crime").select().eq("crime_status", 1);
        if (error) {
            console.error("Error fetching crime data:", error);
            setLoading(false); // Set loading to false if there's an error
            return; // Exit the function
        }

        // If user location is available, filter crime data
        if (userLocation) {
            const filteredCrimes = data
                .filter(crime => !seenCrimeIds.includes(crime.id)) // Exclude crimes that have been seen    !
                .map(crime => {
                    const distance = getDistanceFromLatLonInKm(
                        userLocation.lat,
                        userLocation.lon,
                        parseFloat(crime.crime_lan),
                        parseFloat(crime.crime_log)
                    );
                    return { ...crime, distance }; // Add distance to each crime object
                })
                .filter(crime => crime.distance <= 200) // Filter crimes within 10km
                .sort((a, b) => a.distance - b.distance); // Sort crimes by distance    !

            setCrimeData(filteredCrimes); // Update crime data state with filtered crimes
        }

        setLoading(false); // Set loading to false after fetching data
    };

    // Get user's location on component mount
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (error) => console.error("Error getting location:", error),
            { enableHighAccuracy: true }
        );
    }, []);

    // Fetch crime data when user location is set
    useEffect(() => {
        if (userLocation) {
            fetchCrime();
        }
    }, [userLocation]);

    // Function to remove a notification and add it to seen notifications
    const removeNotification = async (id) => {
        const notiData = {
            notification_crime_id: id,
            notification_user_id: sessionStorage.getItem('uid')
        }
        try {
            const { error } = await supabase
                .from("tbl_notification")
                .insert([notiData]); // Insert notification data into 'tbl_notification'

            if (error) {
                console.error("Supabase Insert Error:", error.message);
            } else {
                console.log("Location added to database successfully.");
                fetchCrime() // Refetch crime data to update the notifications
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    // Render the component
    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h2>Notifications 🔔</h2>
            {loading ? (
                <p>Loading...</p> // Display loading message while data is being fetched
            ) : crimeData.length === 0 ? (
                <p>No new notifications</p> // Display message if no new notifications are found
            ) : (
                crimeData.map((notif) => (
                    <div key={notif.id} style={{ padding: "0px 10px 10px 10px", border: "1px solid #ccc", marginBottom: "10px", borderRadius: "10px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)" }}>
                        <p><strong>{notif.crime_subject || "Unknown Subject"}</strong></p>
                        <p>{notif.crime_details}</p>
                        <p style={{ fontSize: "12px", color: "gray" }}>
                            Distance: {notif.distance.toFixed(2)} km
                        </p>
                        <button onClick={() => removeNotification(notif.id)} style={buttonStyle}>Dismiss</button>
                    </div>
                ))
            )}
            {/* <button onClick={notify}>Notify!</button>
            <ToastContainer /> */}
        </div>
    );
};

export default Notification;