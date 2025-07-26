import React, { useEffect, useState } from 'react'
import supabase from '../../../utilities/supabase';
import { Card, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Officiallist = () => {

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCrime = async () => {
        const { data, error } = await supabase
            .from("tbl_officials")
            .select()
        if (error) {
            console.error("Error fetching crime data:", error);
        } else {
            console.log(data);

            setUserData(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCrime();
    }, []);

    return (
        <div>

            {/* <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <InputLabel id="demo-simple-select-label">Select Type : </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select" */}
            <Card sx={{ mt: 10, mx: 10, mb: 10, p: 5 }}>

                <h1 align="center">Registered Officials</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Phone</TableCell>
                                <TableCell align="left">Address</TableCell>
                                <TableCell align="left">Photo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">Loading...</TableCell>
                                </TableRow>
                            ) : userData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">No crimes found</TableCell>
                                </TableRow>
                            ) : (
                                userData.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell align='left'>{user.officials_name}</TableCell>
                                        <TableCell align='left'>{user.officials_email}</TableCell>
                                        <TableCell align='left'>{user.officials_phone}</TableCell>
                                        <TableCell align='left'>{user.officials_address}</TableCell>
                                        <TableCell align='left'>{<img src={user.officials_photo} width={100} alt="User Proof" onError={(e) => e.target.src = "fallback-image-url"} />}</TableCell>

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

export default Officiallist