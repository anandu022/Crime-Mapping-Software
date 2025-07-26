import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import supabase from '../../../utilities/supabase'
import { Link } from 'react-router-dom';
import styles from './PreviousCrimes.module.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';


const PreviousCrimes = () => {

  // State variables:
  const [crimeData, setCrimeData] = useState([]); // Array to store crime data fetched from Supabase
  const [loading, setLoading] = useState(true); // Boolean to indicate loading state
  const [typeData, setTypeData] = useState([]); // Array to store crime type data fetched from Supabase

  // Function to fetch crime and type data from Supabase:
  const fetchCrime = async () => {
    // Fetch crime data where crime_status is 1 (indicating active crimes)
    const { data: crimes, error: error1 } = await supabase.from('tbl_crime').select().eq('crime_status', 1).order("created_at", { ascending: false });
    // Fetch all crime type data
    const { data: types, error: error2 } = await supabase.from('tbl_type').select();

    // Handle errors during data fetching
    if (error1) {
      console.error('Error fetching crime data:', error1);
    }
    if (error2) {
      console.error('Error fetching crime type data:', error2);
    }

    // If both crime and type data are successfully fetched:
    if (crimes && types) {
      // Merge crime data with corresponding type names
      const mergedData = crimes.map((crime) => ({
        ...crime,
        type_name: types.find((type) => type.id === crime.crime_type_id)?.type_name || 'Unknown Type',
      }));

      // Update state with fetched and merged data
      setCrimeData(mergedData);
      setTypeData(types);
      console.log(mergedData); // Log the merged data for debugging
    }

    // Set loading state to false after data fetching is complete
    setLoading(false);
  };

  // useEffect hook to fetch crime data on component mount:
  useEffect(() => {
    fetchCrime();
  }, []);

  // State variable to store the selected crime type:
  const [age, setAge] = React.useState('');

  // Function to handle changes in the crime type selection:
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // Function to fetch crime data filtered by crime type:
  const fetchByType = async (id) => {
    // Build a Supabase query to select crime data where crime_status is 1
    let query = supabase.from('tbl_crime').select().eq('crime_status', 1).order("created_at", { ascending: false });

    // If a specific crime type is selected (id is not empty), filter the query by crime_type_id
    if (id !== '') {
      query = query.eq('crime_type_id', id);
    }

    // Execute the Supabase query
    const { data: crimes, error: error1 } = await query;

    // Fetch all crime type data
    const { data: types, error: error2 } = await supabase.from('tbl_type').select();

    // Handle errors during data fetching
    if (error1) {
      console.error('Error fetching crime data:', error1);
    }
    if (error2) {
      console.error('Error fetching crime type data:', error2);
    }

    // If both crime and type data are successfully fetched:
    if (crimes && types) {
      // Merge crime data with corresponding type names
      const mergedData = crimes.map((crime) => ({
        ...crime,
        type_name: types.find((type) => type.id === crime.crime_type_id)?.type_name || 'Unknown Type',
      }));

      // Update state with fetched and merged data
      setCrimeData(mergedData);
      setTypeData(types);
      console.log(mergedData); // Log the merged data for debugging
    }

    // Set loading state to false after data fetching is complete
    setLoading(false);
  };

  return (
    <div>


      <h1 align="center">RECENT CRIMES</h1>
      {/* <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <InputLabel id="demo-simple-select-label">Select Type : </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select" */}
      <div className="sort" style={{ display: "flex", alignItems: "center", gap: "20px", width: "100%" }}>
        <Typography>Sort</Typography>
        <FormControl variant="standard" sx={{ flex: 1, marginBottom: "20px" }}>
          <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={typeData}
            onChange={(e) => fetchByType(e.target.value)}
            sx={{ width: "100%" }} // Ensure the select field takes full width
          >
            <MenuItem value={''}>All</MenuItem>
            {typeData.map((type) => (
              <MenuItem key={type.id} value={type.id}>{type.type_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Subject</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Date and Time</TableCell>

              <TableCell align="left">Location</TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {crimeData.map((crime) => (
              <TableRow key={crime.id}>
                <TableCell align='left'>{crime.crime_subject}</TableCell>
                <TableCell align='left'>{crime.type_name}</TableCell>
                <TableCell align='left'>{crime.crime_details || "No details"}</TableCell>

                <TableCell align='left'>
                  <Link to={`/user/showmaptable/${crime.id}`} style={{ textDecoration: "none", color: "#0000EE" }}>View In Map</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Loading...</TableCell>
              </TableRow>
            ) : crimeData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No crimes found</TableCell>
              </TableRow>
            ) : (
              crimeData.map((crime) => (
                <TableRow key={crime.id}>
                  <TableCell align='left'>{crime.crime_subject}</TableCell>
                  <TableCell align='left'>{crime.type_name}</TableCell>
                  <TableCell align='left'>{crime.crime_details || "No details"}</TableCell>
                  <TableCell align="left">
                                        {new Date(crime.created_at).toLocaleString()}
                                      </TableCell>
                  <TableCell align='left'>
                    <Link to={`/user/showmaptable/${crime.id}`} style={{ textDecoration: "none", color: "#0000EE" }}>
                      View In Map
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default PreviousCrimes