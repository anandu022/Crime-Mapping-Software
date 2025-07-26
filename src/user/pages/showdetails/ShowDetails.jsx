import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../../utilities/supabase";
import {
  AccessTime as AccessTimeIcon,
  Place as PlaceIcon,
  Subject as SubjectIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";

const ShowDetails = () => {
  const { id } = useParams();
  const [crimeData, setCrimeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch crime details by ID
  const fetchCrime = async () => {
    const { data, error } = await supabase
      .from("tbl_crime")
      .select()
      .eq("id", id) // Filter by ID
      .single(); // Get a single row

    if (error) {
      console.error("Error fetching crime details:", error);
    } else {
      setCrimeData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCrime();
  }, [id]); // Runs when `id` changes

  if (loading)
    return (
      <p style={{ fontSize: "18px", color: "#6a1b9a", textAlign: "center" }}>
        Loading...
      </p>
    );
  if (!crimeData)
    return (
      <p
        style={{
          fontSize: "18px",
          color: "#d32f2f",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        No crime data found.
      </p>
    );

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#6a1b9a",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        Crime Details
      </h2>
      {/* Crime Time */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <AccessTimeIcon style={{ color: "#6a1b9a", marginRight: "8px" }} />
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: "#6a1b9a" }}>Time:</strong>{" "}
          {new Date(crimeData.created_at).toLocaleString()}
        </p>
      </div>

      {/* Crime Location */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <PlaceIcon style={{ color: "#6a1b9a", marginRight: "8px" }} />
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: "#6a1b9a" }}>Location:</strong>{" "}
          {crimeData.crime_lan}, {crimeData.crime_log}
        </p>
      </div>

      {/* Crime Subject */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <SubjectIcon style={{ color: "#6a1b9a", marginRight: "8px" }} />
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: "#6a1b9a" }}>Subject:</strong>{" "}
          {crimeData.crime_subject}
        </p>
      </div>

      {/* Crime Details */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <DescriptionIcon style={{ color: "#6a1b9a", marginRight: "8px" }} />
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            margin: 0,
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: "#6a1b9a" }}>Details:</strong>{" "}
          {crimeData.crime_details || "No details available"}
        </p>
      </div>
    </div>
  );
};

export default ShowDetails;
