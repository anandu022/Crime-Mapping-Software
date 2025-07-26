import { Button, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import styles from './ChangePhoto.module.css'
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

const ChangePhoto = () => {
    const [photo, setPhoto] = useState(null);
    const handleFileChange = (event, setFile) => {
        setFile(event.target.files[0]);
    };
    const uploadFile = async (file, folder) => {
        if (!file) return null; // Return null if no file is selected

        const filePath = `${folder}/${Date.now()}_${file.name}`; // Unique filename
        const { data, error } = await supabase.storage
            .from('CrimeMap') // Change to your actual Supabase storage bucket
            .upload(filePath, file);

        if (error) {
            console.error("File upload error:", error);
            return null;
        }

        return data.path ? `https://symbkjfonsxphhlaifvm.supabase.co/storage/v1/object/public/CrimeMap/${data.path}` : null;
    };
    const handleSubmit = async () => {
        // Upload files first
        const photoURL = await uploadFile(photo, 'User_Photos');
        const { error } = await supabase
          .from('tbl_user')
          .update({
            user_photo: photoURL,
          })
          .eq('id', sessionStorage.getItem('uid'));
      
        if (error) {
          console.error('Supabase Update Error:', error.message);
        } else {
          console.log('Details updated successfully.');
          alert('Details updated successfully');
          window.location.reload(); // 👈 Reload the page after success
        }
      };
      

    return (
        <div className={styles.container}>
  <Typography
  style={{
    color: '#6a1b9a', // Deep purple
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    marginBottom: '20px', // Add space below Typography
  }}
>
  Update Photo
</Typography>

  <Button
  component="label"
  variant="contained"
  startIcon={<CloudUploadIcon />}
  className={`${styles.inp1} ${styles.uploadbutton}`}
>
  Upload Photo
  <VisuallyHiddenInput
    type="file"
    accept="image/*"
    onChange={(e) => handleFileChange(e, setPhoto)}
  />
</Button>

<Button
  variant="contained"
  className={`${styles.inp1} ${styles.submitbutton}`}
  onClick={handleSubmit}
  style={{ marginTop: '10px' }} // Inline style for space between buttons
>
  Update
</Button>

</div>

    )
}

export default ChangePhoto