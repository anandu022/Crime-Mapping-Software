import React, { useState } from 'react';
import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './User.module.css';
import supabase from '../../../utilities/supabase';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const User = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Password pattern: At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phonePattern = /^\d{10}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    if (!name) {
      toast.error("Username is required");
      return false;
    }
    if (!email || !emailPattern.test(email)) {
      toast.error("Valid email is required");
      return false;
    }
    if (!phone || !phonePattern.test(phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return false;
    }
    if (!password || !passwordPattern.test(password)) {
      toast.error(
        "Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      );
      return false;
    }
    if (!address) {
      toast.error("Address is required");
      return false;
    }
    if (!photo) {
      toast.error("Photo is required");
      return false;
    }
    if (!proof) {
      toast.error("Proof is required");
      return false;
    }
    return true;
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setAddress('');
    setPhoto(null);
    setProof(null);
  };

  const handleFileChange = (event, setFile) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async (file, folder) => {
    if (!file) return null;

    const filePath = `${folder}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('CrimeMap')
      .upload(filePath, file);

    if (error) {
      console.error("File upload error:", error);
      toast.error("Failed to upload file");
      return null;
    }

    return data.path ? `https://symbkjfonsxphhlaifvm.supabase.co/storage/v1/object/public/CrimeMap/${data.path}` : null;
  };

  const handleSubmit = async () => {
    if (!validateForm() || loading) return; // Prevent submission if loading

    setLoading(true); // Set loading to true

    try {
      const photoURL = await uploadFile(photo, 'User_Photos');
      if (!photoURL) {
        setLoading(false);
        return;
      }

      const proofURL = await uploadFile(proof, 'User_Proofs');
      if (!proofURL) {
        setLoading(false);
        return;
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (authError) {
        console.error("Authentication error:", authError);
        toast.error("Authentication failed: " + authError.message);
        setLoading(false);
        return;
      }

      const userId = data.user?.id;

      if (!userId) {
        console.error("User ID not found after sign-up");
        toast.error("Registration failed: User ID not found");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from('tbl_user').insert([
        {
          auth_id: userId,
          user_name: name,
          user_email: email,
          user_password: password,
          user_address: address,
          user_proof: proofURL,
          user_photo: photoURL,
          user_status: 0,
          user_phone: phone,
        },
      ]);

      if (error) {
        console.error("Error inserting user into database:", error);
        toast.error("Database error: " + error.message);
      } else {
        toast.success("User registered successfully! Please complete email verification");
        clearForm(); // Clear form on success
      }
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Registration failed: " + err.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className={styles.container}>
      <h1 align="center">REGISTER</h1>

      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        className={styles.inp1}
        value={name}
        onChange={(e) => setName(e.target.value)}
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

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        className={styles.inp1}
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

      <TextField
        label="Mobile"
        variant="outlined"
        fullWidth
        className={styles.inp1}
        value={phone}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 10) setPhone(value);
        }}
        inputProps={{ maxLength: 10 }}
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

      <TextField
        label="Password"
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        className={styles.inp1}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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

      <TextField
        label="Address"
        multiline
        maxRows={5}
        fullWidth
        className={styles.inp1}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
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

      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        fullWidth
        className={styles.inp1}
        sx={{ backgroundColor: '#6a1b9a' }}
        disabled={loading} // Disable while loading
      >
        Upload Proof
        <VisuallyHiddenInput type="file" accept="image/*" onChange={(e) => handleFileChange(e, setProof)} />
      </Button>

      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        fullWidth
        className={styles.inp1}
        sx={{ backgroundColor: '#6a1b9a' }}
        disabled={loading} // Disable while loading
      >
        Upload Photo
        <VisuallyHiddenInput type="file" accept="image/*" onChange={(e) => handleFileChange(e, setPhoto)} />
      </Button>

      <Button
        variant="contained"
        fullWidth
        className={styles.inp1}
        onClick={handleSubmit}
        sx={{ backgroundColor: '#6a1b9a' }}
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Submitting...' : 'Sign Up'} {/* Show loading text */}
      </Button>

      <p style={{ fontStyle: 'italic', color: 'gray', textAlign: 'center' }}>
        * All fields are required
      </p>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default User;