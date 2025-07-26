import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import styles from './Login.module.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../utilities/supabase'; // Import the Supabase client

const Login = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [email, setEmail] = useState(""); // State to store the email input
  const [password, setPassword] = useState(""); // State to store the password input

  // Function to toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Function to handle login process
  const handleLogin = async () => {
    try {
      // Attempt to sign in with email and password using Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      // If there's an error during login, log it and display an alert
      if (error) {
        console.error("Login error:", error);
        alert("Login failed! Please check your credentials.");
        return; // Exit the function
      }

      // Log successful login and user data
      console.log("User logged in:", data.user);

      // Fetch user details from 'tbl_user' based on 'auth_id' (user's Supabase ID)
      const { data: userData, error: userError } = await supabase
        .from('tbl_user')
        .select('id')
        .eq('auth_id', data.user.id)
        .eq('user_status', 1) // Filters to only active users
        .single(); // Expects a single result

      // Fetch official details from 'tbl_officials' based on 'auth_id'
      const { data: officialsData, error: officialsError } = await supabase
        .from('tbl_officials')
        .select('id')
        .eq('auth_id', data.user.id)
        .single(); // Expects a single result

      // Fetch admin details from 'tbl_admin' based on 'auth_id'
      const { data: adminData, error: adminError } = await supabase
        .from('tbl_admin')
        .select('id')
        .eq('auth_id', data.user.id)
        .single(); // Expects a single result

      // Check if user data was fetched successfully and navigate accordingly
      if (userData) {
        sessionStorage.setItem('uid', userData.id); // Store user ID in session storage
        navigate("/User"); // Navigate to user dashboard
      }
      // Check if official data was fetched successfully and navigate accordingly
      else if (officialsData) {
        sessionStorage.setItem('uid', officialsData.id);
        navigate("/officials");
      }
      // Check if admin data was fetched successfully and navigate accordingly
      else if (adminData) {
        sessionStorage.setItem('uid', adminData.id);
        navigate("/Admin");
      }

      // If all fetch queries returned an error, then there are invalid credentials.
      if (userError && officialsError && adminError) {
        console.error("User fetch error:", userError);
        console.error("Admin fetch error:", adminError);
        console.error("Officials fetch error:", officialsError);
        alert("Invalid Credentials!");
        return;
      }

    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // Render the login form
  return (
    <div className={styles.container}>
      <h1 align="center">LOGIN</h1>
      <div className={styles.inp1}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: '#7e57c2' },
              '&.Mui-focused fieldset': { borderColor: '#4a148c' },
            },
            '& .MuiInputLabel-root': {
              color: 'gray',
              '&.Mui-focused': { color: '#4a148c' },
            },
          }}
        />
      </div>
      <div className={styles.inp1}>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: '#7e57c2' },
              '&.Mui-focused fieldset': { borderColor: '#4a148c' },
            },
            '& .MuiInputLabel-root': {
              color: 'gray',
              '&.Mui-focused': { color: '#4a148c' },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={styles.inp1}>
        <Button variant="contained" fullWidth sx={{ backgroundColor: '#6a1b9a' }} onClick={handleLogin}>
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Login;