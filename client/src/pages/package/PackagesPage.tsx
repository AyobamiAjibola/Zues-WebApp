import { Typography } from "@mui/material"
import React, { useLayoutEffect } from "react"

function PackagesPage() {
    
    useLayoutEffect(() => {
        document.body.style.backgroundColor = 'black'
    }, [])
    return (
        <React.Fragment>
           <Typography sx={{color: 'white'}}>Packages Page</Typography>
        </React.Fragment>
    )
}

export default PackagesPage