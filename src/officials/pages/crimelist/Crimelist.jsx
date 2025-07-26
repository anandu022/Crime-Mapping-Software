import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Stack, Typography
} from "@mui/material";
import supabase from "../../../utilities/supabase";
import { Link } from "react-router-dom";

const CrimeList = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch crime data and associated user data
  const fetchCrime = async () => {
    setLoading(true);

    // Fetch all crimes
    const { data: crimes, error: crimeError } = await supabase
      .from("tbl_crime")
      .select("*");

    if (crimeError) {
      console.error("Error fetching crime data:", crimeError);
      setLoading(false);
      return;
    }

    // Get unique user IDs from crimes
    const userIds = [...new Set(crimes.map(crime => crime.crime_user_id).filter(id => id))];

    // Fetch users based on id (not auth_id)
    const { data: users, error: userError } = await supabase
      .from("tbl_user")
      .select("id, user_name, user_email")
      .in("id", userIds);

    if (userError) {
      console.error("Error fetching user data:", userError);
    } else {
      // Combine crime and user data
      const enrichedCrimes = crimes.map(crime => {
        const user = users.find(u => u.id === crime.crime_user_id) || null;
        return { ...crime, user };
      });
      setCrimeData(enrichedCrimes);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCrime();
  }, []);

  // Update crime status
  const updateCrimeStatus = async (id, status) => {
    const { error } = await supabase
      .from("tbl_crime")
      .update({ crime_status: status })
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
    } else {
      alert(status === "1" ? "Crime Accepted" : "Crime Rejected");
      fetchCrime();
    }
  };

  // Filter and sort crimes
  const filteredCrimes = crimeData
    .filter((crime) => {
      if (filterStatus === "accepted") return crime.crime_status === "1";
      if (filterStatus === "rejected") return crime.crime_status === "2";
      if (filterStatus === "pending") return crime.crime_status !== "1" && crime.crime_status !== "2";
      return true;
    })
    .sort((a, b) => {
      if (filterStatus === "pending") {
        return a.id - b.id;
      }
      return 0;
    });

  // Common row styling
  const rowStyle = {
    height: "60px",
    "& > *": {
      padding: "0 16px",
      verticalAlign: "middle",
    },
  };

  return (
    <div className="full">
      <h1 align="center">RECENT CRIMES</h1>

      {/* Sorting Buttons */}
      <Stack direction="row" gap={2} justifyContent="center" mb={2}>
        <Button variant={filterStatus === "all" ? "contained" : "outlined"} onClick={() => setFilterStatus("all")}>
          All Crimes
        </Button>
        <Button variant={filterStatus === "accepted" ? "contained" : "outlined"} onClick={() => setFilterStatus("accepted")}>
          Accepted
        </Button>
        <Button variant={filterStatus === "rejected" ? "contained" : "outlined"} onClick={() => setFilterStatus("rejected")}>
          Rejected
        </Button>
        <Button variant={filterStatus === "pending" ? "contained" : "outlined"} onClick={() => setFilterStatus("pending")}>
          Pending
        </Button>
      </Stack>

      {/* Loading and No Data Message */}
      {loading ? (
        <Typography align="center">Loading...</Typography>
      ) : filteredCrimes.length === 0 ? (
        <Typography align="center">No crime data available.</Typography>
      ) : (
        <>
          <Typography align="center" mb={2}>
            Showing {filteredCrimes.length} {filterStatus !== "all" ? filterStatus : ""} crimes
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="crime table">
              <TableHead>
                <TableRow sx={rowStyle}>
                  <TableCell>ID</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell align="left">Date & Time</TableCell>
                  <TableCell>Reported By</TableCell>
                  {filterStatus !== "all" && <TableCell>Verification</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCrimes.map((crime) => (
                  <TableRow key={crime.id} sx={rowStyle}>
                    <TableCell>{crime.id}</TableCell>
                    <TableCell>{crime.crime_subject}</TableCell>
                    <TableCell>{crime.crime_details || "No details"}</TableCell>
                    <TableCell>
                      {crime.crime_status === "1"
                        ? "Accepted"
                        : crime.crime_status === "2"
                          ? "Rejected"
                          : "Pending"}
                    </TableCell>
                    <TableCell>
                      <Link to={`/officials/showmap/${crime.id}`}>View In Map</Link>
                    </TableCell>
                    <TableCell align="left">
                      {new Date(crime.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Link to={`/officials/user-details/${crime.crime_user_id}`}>
                        {crime.user?.user_name || "Unknown User"}
                      </Link>
                    </TableCell>
                    {filterStatus !== "all" && (
                      <TableCell>
                        <Stack direction="row" gap={2}>
                          {(filterStatus === "rejected" || filterStatus === "pending") && (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => updateCrimeStatus(crime.id, "1")}
                            >
                              Accept
                            </Button>
                          )}
                          {(filterStatus === "accepted" || filterStatus === "pending") && (
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => updateCrimeStatus(crime.id, "2")}
                            >
                              Reject
                            </Button>
                          )}
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default CrimeList;