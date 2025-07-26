import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../../utilities/supabase";
import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  CheckCircle as VerifiedIcon,
  Cancel as UnverifiedIcon,
  HourglassEmpty as PendingIcon,
  Description as ProofIcon,
  Photo as PhotoIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";

const UserDetails = () => {
  const { userId } = useParams(); // userId is tbl_user.id
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase
          .from("tbl_user")
          .select("*")
          .eq("id", userId) // Match tbl_user.id
          .single();

        if (error) throw error;
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography align="center" color="error">Error: {error}</Typography>;
  if (!user) return <Typography align="center">No user found</Typography>;

  // Determine status icon
  const statusIcon =
    user.user_status === "1" ? (
      <VerifiedIcon color="success" />
    ) : user.user_status === "0" ? (
      <UnverifiedIcon color="error" />
    ) : (
      <PendingIcon color="warning" />
    );

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          User Details
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={<strong>Name:</strong>} secondary={user.user_name} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={<strong>Email:</strong>} secondary={user.user_email} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary={<strong>Phone:</strong>} secondary={user.user_phone} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={<strong>Address:</strong>} secondary={user.user_address} />
          </ListItem>
          <ListItem>
            <ListItemIcon>{statusIcon}</ListItemIcon>
            <ListItemText
              primary={<strong>Status:</strong>}
              secondary={
                user.user_status === "1"
                  ? "Verified"
                  : user.user_status === "0"
                  ? "Unverified"
                  : "Pending"
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhotoIcon />
            </ListItemIcon>
            <ListItemText
              primary={<strong>Photo:</strong>}
              secondary={
                <a href={user.user_photo} target="_blank" rel="noopener noreferrer">
                  View Photo
                </a>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CalendarIcon />
            </ListItemIcon>
            <ListItemText
              primary={<strong>Created At:</strong>}
              secondary={new Date(user.created_at).toLocaleString()}
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default UserDetails;