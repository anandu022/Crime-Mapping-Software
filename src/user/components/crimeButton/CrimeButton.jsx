import { Button } from '@mui/material'
import React from 'react'
import styles from './CrimeButton.module.css'
import { useNavigate } from 'react-router-dom'

const CrimeButton = () => {

  const navigate = useNavigate()

    const handleAddLocation = async () => {
    navigate("/user/crimedetails")
  };

  return (
    <div>
        <Button variant='contained' sx={{backgroundColor:'#6a1b9a', borderRadius:'50%'}}className={styles.but1}  onClick={handleAddLocation}>
            ADD CRIME
        </Button>
    </div>
  )
}

export default CrimeButton