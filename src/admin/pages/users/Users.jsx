import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Stack, Typography,
  Card
} from "@mui/material";
import supabase from "../../../utilities/supabase";

const User = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users and categorize them
  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("tbl_user").select();
    if (error) {
      console.error("Error fetching user data:", error);
    } else {
      // Categorize users based on status
      const unverified = data.filter(user => user.user_status === "0" || user.user_status === undefined);
      const accepted = data.filter(user => user.user_status === "1");
      const rejected = data.filter(user => user.user_status === "2");
      
      setUnverifiedUsers(unverified);
      setAcceptedUsers(accepted);
      setRejectedUsers(rejected);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle status updates
  const handleAccept = async (id) => {
    const { error } = await supabase.from("tbl_user").update({ user_status: 1 }).eq("id", id);
    if (error) {
      console.error("Supabase Update Error:", error.message);
    } else {
      console.log("User accepted");
      fetchUsers();
    }
  };

  const handleReject = async (id) => {
    const { error } = await supabase.from("tbl_user").update({ user_status: 2 }).eq("id", id);
    if (error) {
      console.error("Supabase Update Error:", error.message);
    } else {
      console.log("User rejected");
      fetchUsers();
    }
  };

  // Reusable Table component
  const UserTable = ({ title, users, showAccept = true, showReject = true }) => (
    <div style={{ marginBottom: "40px" }}>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Proof</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">Loading...</TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No users found</TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.user_name}</TableCell>
                  <TableCell>{user.user_email}</TableCell>
                  <TableCell>{user.user_phone}</TableCell>
                  <TableCell>{user.user_address}</TableCell>
                  <TableCell>
                    <img src={user.user_proof} width={100} alt="User Proof" onError={(e) => e.target.src = "fallback-image-url"} />
                  </TableCell>
                  <TableCell>
                    <img src={user.user_photo} width={100} alt="User Photo" onError={(e) => e.target.src = "fallback-image-url"} />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" gap={2}>
                      {showAccept && (
                        <Button 
                          variant="contained" 
                          color="success" 
                          onClick={() => handleAccept(user.id)}
                        >
                          Accept
                        </Button>
                      )}
                      {showReject && (
                        <Button 
                          variant="contained" 
                          color="error" 
                          onClick={() => handleReject(user.id)}
                        >
                          Reject
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  return (
    <Card sx={{m:10,p:5}}>
      <h1 align="center">Users Database</h1>
      
      <UserTable 
        title="Unverified Users" 
        users={unverifiedUsers} 
      />

      <UserTable 
        title="Accepted Users" 
        users={acceptedUsers} 
        showAccept={false}
      />

      <UserTable 
        title="Rejected Users" 
        users={rejectedUsers} 
        showReject={false}
      />
    </Card>
  );
};

export default User;