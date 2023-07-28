import { Typography } from "@mui/material"
import React, { useLayoutEffect } from "react"

function VolumePage() {
    
    useLayoutEffect(() => {
        document.body.style.backgroundColor = 'black'
    }, [])
    return (
        <React.Fragment>
           <Typography sx={{color: 'white'}}>Volume Page</Typography>
        </React.Fragment>
    )
}

export default VolumePage