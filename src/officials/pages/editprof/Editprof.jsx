import React, { useState } from 'react'
import { Button, TextField, IconButton, InputAdornment } from '@mui/material'; // MUI components
import { styled } from '@mui/material/styles';
import styles from './Editprof.module.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import supabase from '../../../utilities/supabase';

const Editprof = () => {
    const [newName, setNewName] = useState("");
  const [newMail, setNewMail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddr, setNewAddr] = useState("");

  const handleDetails = async () => {
    const { error } = await supabase
      .from('tbl_officials')
      .update({
        officials_name: newName,
        officials_phone: newPhone,
        officials_address: newAddr
      })
      .eq('id', sessionStorage.getItem("uid"))

      if (error) {
          console.error("Supabase Update Error:", error.message);
        } else {
          console.log("Details updated successfully.");
          alert("Details updated successfully");
        }
  }
  return (
    <div className={styles.container}>
          <h1 align="center">EDIT PROFILE</h1>
          <div className={styles.inp1}>
            <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'gray' }, // Default border color
                  '&:hover fieldset': { borderColor: '#7e57c2' }, // Border color on hover
                  '&.Mui-focused fieldset': { borderColor: '#4a148c' }, // Border color when focused
                },
                '& .MuiInputLabel-root': {
                  color: 'gray', // Default label color
                  '&.Mui-focused': { color: '#4a148c' }, // Label color when focused
                },
              }} 
              onChange={(e) => setNewName(e.target.value)}/>
          </div>
          <div className={styles.inp1}>
            <TextField id="outlined-basic" label="Mobile" variant="outlined" fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'gray' }, // Default border color
                  '&:hover fieldset': { borderColor: '#7e57c2' }, // Border color on hover
                  '&.Mui-focused fieldset': { borderColor: '#4a148c' }, // Border color when focused
                },
                '& .MuiInputLabel-root': {
                  color: 'gray', // Default label color
                  '&.Mui-focused': { color: '#4a148c' }, // Label color when focused
                },
              }} onChange={(e) => setNewPhone(e.target.value)}/>
          </div>
          <div className={styles.inp1}>
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              multiline
              maxRows={5}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'gray' }, // Default border color
                  '&:hover fieldset': { borderColor: '#7e57c2' }, // Border color on hover
                  '&.Mui-focused fieldset': { borderColor: '#4a148c' }, // Border color when focused
                },
                '& .MuiInputLabel-root': {
                  color: 'gray', // Default label color
                  '&.Mui-focused': { color: '#4a148c' }, // Label color when focused
                },
              }}
              onChange={(e) => setNewAddr(e.target.value)}
            />
          </div>
    
          <div className={styles.inp1}>
            <Button variant="contained" sx={{ backgroundColor: '#6a1b9a' }} fullWidth onClick={handleDetails}>
              Update
            </Button>
          </div>
    
        </div>
  )
}

export default Editprof