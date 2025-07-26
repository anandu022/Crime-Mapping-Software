
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import supabase from '../../../utilities/supabase';
import { Card } from '@mui/material';

const Crimetable = () => {

    const columns = [

        { field: 'Subject', headerName: 'Subject', width: 130 },
        { field: 'Details', headerName: 'Details', width: 130 },
        { field: 'Status', headerName: 'Status', width: 70 },
    ];

    const [crimeData, setCrimeData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    
    const fetchCrime = async () => {
        const { data, error } = await supabase
            .from("tbl_crime")
            .select()
            .order("created_at", { ascending: false }) // Sort by created_at in descending order
            .limit(7); // Limit to 7 records
    
        if (error) {
            console.error("Error fetching crime data:", error);
        } else {
            console.log(data);
            setCrimeData(data);
        }
        setLoading(false);
    };

    const rows = crimeData.map((crime, index) => ({
        id: index + 1, // Adding a unique ID
        Subject: crime.crime_subject,
        Details: crime.crime_details,
        Status: crime.crime_status,
    }));

    useEffect(() => {
        fetchCrime();
    }, []);



    return (
        <div>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Subject</TableCell>
                            <TableCell align="left">Details</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {crimeData.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.crime_subject}</TableCell>
                                <TableCell align="left">{row.crime_details}</TableCell>
                                <TableCell align="right">
                                    {row.crime_status === '1'
                                        ? "Accepted"
                                        : row.crime_status === '2'
                                            ? "Rejected"
                                            : "Pending"}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Crimetable