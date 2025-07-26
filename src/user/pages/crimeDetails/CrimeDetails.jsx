import React, { useEffect, useState } from 'react';
import supabase from '../../../utilities/supabase';
import style from './CrimeDetails.module.css';
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrimeDetails = () => {
  const [details, setDetails] = useState('');
  const [subject, setSubject] = useState('');
  const [typedata, setTypeData] = useState('');
  const [type, setType] = useState([]);
  const [loading, setLoading] = useState(false); // For submit button loading state
  const [fetchLoading, setFetchLoading] = useState(true); // For fetching types

  const validateForm = () => {
    if (!subject) {
      toast.error('Summary is required');
      return false;
    }
    if (!typedata) {
      toast.error('Type is required');
      return false;
    }
    if (!details) {
      toast.error('Description is required');
      return false;
    }
    return true;
  };

  const clearForm = () => {
    setSubject('');
    setTypeData('');
    setDetails('');
  };

  const handleAddLocation = async () => {
    if (!validateForm() || loading) return; // Prevent submission if invalid or loading

    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true); // Start loading

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const crimeData = {
          crime_lan: newLocation.lat.toString(),
          crime_log: newLocation.lng.toString(),
          crime_details: details,
          crime_subject: subject,
          crime_user_id: sessionStorage.getItem('uid'),
          crime_type_id: typedata,
        };

        try {
          const { error } = await supabase.from('tbl_crime').insert([crimeData]);

          if (error) {
            console.error('Supabase Insert Error:', error.message);
            toast.error('Failed to add crime: ' + error.message);
          } else {
            toast.success('Crime added to database successfully!');
            clearForm(); // Clear form on success
          }
        } catch (err) {
          console.error('Unexpected error:', err);
          toast.error('Unexpected error: ' + err.message);
        } finally {
          setLoading(false); // Reset loading state
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast.error('Failed to get location: ' + error.message);
        setLoading(false);
      }
    );
  };

  const fetchType = async () => {
    const { data, error } = await supabase.from('tbl_type').select();
    if (error) {
      console.error('Error fetching crime data:', error);
      toast.error('Failed to fetch crime types');
    } else {
      console.log(data);
      setType(data);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    fetchType();
  }, []);

  return (
    <div className={style.main}>
      <h1 align="center">CRIME DETAILS</h1>
      <div className={style.detailsbox}>
        <div className={style.inp1}>
          <TextField
            id="outlined-basic"
            label="Summary"
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
          />
        </div>
        <div className={style.inp1}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typedata}
              label="Type"
              onChange={(e) => setTypeData(e.target.value)}
              disabled={fetchLoading} // Disable while fetching types
              sx={{
                width: 225,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#7e57c2',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4a148c',
                },
                '& .MuiInputLabel-root': {
                  color: 'gray',
                  '&.Mui-focused': { color: '#4a148c' },
                },
              }}
            >
              {type.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.type_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={style.inp1}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
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
          />
        </div>
        <p style={{ fontStyle: 'italic', color: 'gray', textAlign: 'center' }}>
          * All fields are required
        </p>
        <div className={style.inp1}>
          <Button
            variant="contained"
            onClick={handleAddLocation}
            disabled={loading} // Disable while loading
            sx={{ backgroundColor: '#6a1b9a' }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default CrimeDetails;