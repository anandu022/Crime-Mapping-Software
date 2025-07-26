import { Button } from '@mui/material';
import React, { useState } from 'react'

const CollapseButton = () => {

    const [ isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidrbar= () => {
    setIsCollapsed(!isCollapsed);
    console.log(isCollapsed);
  }
  return (
    <div>
        <Button variant='contained' label='collapse' onClick ={toggleSidrbar} className='butt1'
            sx={{borderRadius:50, backgroundColor:'#6a1b9a'}}>{isCollapsed ? '>' : '<'}
        </Button>
    </div>
  )
}

export default CollapseButton