import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Card, Typography } from '@mui/material';
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

const ViewCrime = () => {

    const [crimeData, setCrimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [typeData, setTypeData] = useState([]);


    // const fetchCrime = async () => { //devlog : stop trying
    //   const { data: data1, error: error1 } = await supabase.from("tbl_crime").select();
    //   if (error1) {
    //     console.error("Error fetching crime data:", error1);
    //   } else {
    //     console.log(data1);
    //     setCrimeData(data1);
    //   }
    //   setLoading1(false);

    //   const { data: data2, error: error2 } = await supabase.from("tbl_type").select();
    //   if (error2) {
    //     console.error("Error fetching crime type data : ", error2);
    //   }else{
    //     console.log(data2);
    //     setTypeData(data2);
    //   }
    //   setLoading2(false);
    // };

    const fetchCrime = async () => {  //devlog : i have no idea how this works
        const { data: crimes, error: error1 } = await supabase.from("tbl_crime").select().order("created_at", { ascending: false });
        const { data: types, error: error2 } = await supabase.from("tbl_type").select();

        if (error1) {
            console.error("Error fetching crime data:", error1);
        }
        if (error2) {
            console.error("Error fetching crime type data:", error2);
        }

        if (crimes && types) {
            // Map crimes with type names
            const mergedData = crimes.map((crime) => ({
                ...crime,
                type_name: types.find((type) => type.id === crime.crime_type_id)?.type_name || "Unknown Type",
            }));

            setCrimeData(mergedData);
            setTypeData(types);
            console.log(mergedData);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchCrime();
    }, []);

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const fetchByType = async (id) => {
        let query = supabase.from("tbl_crime").select().order("created_at", { ascending: false });

        if (id !== "") {
            query = query.eq("crime_type_id", id); // Apply filter only if a specific type is selected
        }

        const { data: crimes, error: error1 } = await query;

        const { data: types, error: error2 } = await supabase.from("tbl_type").select();

        if (error1) {
            console.error("Error fetching crime data:", error1);
        }
        if (error2) {
            console.error("Error fetching crime type data:", error2);
        }

        if (crimes && types) {
            // Map crimes with type names
            const mergedData = crimes.map((crime) => ({
                ...crime,
                type_name: types.find((type) => type.id === crime.crime_type_id)?.type_name || "Unknown Type",
            }));

            setCrimeData(mergedData);
            setTypeData(types);
            console.log(mergedData);
        }

        setLoading(false);
    };

    return (
        <div>
            
            {/* <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <InputLabel id="demo-simple-select-label">Select Type : </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select" */}
            <Card sx={{ mt: 10, mx: 10, mb: 10, p: 5 }}>
            <h1 align="center">RECENT CRIMES</h1>
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
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Date & Time</TableCell> {/* New Column */}

                                {/* <TableCell align="left">Location</TableCell> */}
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
                                            {crime.crime_status === '1' ? "Accepted" : crime.crime_status === '0' ? "Rejected" : "Pending"}
                                        </TableCell>
                                        <TableCell align="left">
                                            {new Date(crime.created_at).toLocaleString()} {/* Format Date & Time */}
                                        </TableCell>
                                        {/* <TableCell align='left'>
                                        <Link to={`/user/showmaptable/${crime.id}`} style={{ textDecoration: "none", color: "#0000EE" }}>
                                            View In Map
                                        </Link>
                                    </TableCell> */}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    )
}

export default ViewCrime


// import React from 'react'

// const ViewCrime = () => {
//   return (
//     <div>ViewCrime</div>
//   )
// }

// export default ViewCrime