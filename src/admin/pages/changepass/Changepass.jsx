import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Icons
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import supabase from '../../../utilities/supabase';
import styles from "./Changepass.module.css"

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

const Changepass = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const [newPass, setNewPass] = useState("");
    const [oldPass, setOldPass] = useState("");

    const handleChangePassword = async () => {
        // const { error } = await supabase
        //   .from('tbl_user')
        //   .update({ user_password: newPass })
        //   .eq('id', sessionStorage.getItem("uid"))
        //   .eq('user_password', oldPass)

        // if (error) {
        //   console.error("Supabase Update Error:", error.message);
        // } else {
        //   console.log("Password updated successfully.");
        //   alert("Password updated successfully");
        // }

        const { email } = (await supabase.auth.getUser()).data.user; // Get logged-in user's email

        // Step 1: Re-authenticate user by signing in with old password
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: email,
            password: oldPass,  // Check if old password is correct
        });

        if (signInError) {
            console.error("Incorrect old password:", signInError.message);
            alert("Incorrect old password. Please try again.");
            return;
        }

        // Step 2: If old password is correct, update to new password
        const { error: updateError } = await supabase.auth.updateUser({
            password: newPass,
        });

        if (updateError) {
            console.error("Password update failed:", updateError.message);
            alert("Failed to update password. Please try again.");
        } else {
            console.log("Password updated successfully.");
            alert("Password updated successfully. Please log in again.");

            const { error } = await supabase
                .from('tbl_admin')
                .update({ admin_password: newPass })
                .eq('id', sessionStorage.getItem("uid"))
                .eq('admin_password', oldPass)

                if (error) {
                    console.error("Admin password update failed:", error.message);
                    alert("Failed to update admin password: " + error.message);
                } else {
                    console.log("Admin password updated successfully.");
                }
            await supabase.auth.signOut(); // Log out user after password change
            window.location.href = "/guest"; // Redirect to login page
        }

    }

    return (
        <div className={styles.container}>
            <h1 align='center'>CHANGE PASSWORD</h1>
            <div className={styles.inp1}>
                <TextField
                    id="oldpassword"
                    label="Old Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
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
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setOldPass(e.target.value)}
                />
            </div>
            <div className={styles.inp1}>
                <TextField
                    id="newpassword"
                    label="New Password"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
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
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setNewPass(e.target.value)}
                />
            </div>
            <div className={styles.inp1}>
                <Button variant="contained" fullWidth sx={{ backgroundColor: '#6a1b9a' }}
                    onClick={handleChangePassword}>
                    Update
                </Button>
            </div>
        </div>
    )
}

export default Changepass