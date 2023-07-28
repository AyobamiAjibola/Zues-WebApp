import { Typography } from "@mui/material"
import React, { useLayoutEffect } from "react"

function OverviewPage() {
    
    useLayoutEffect(() => {
        document.body.style.backgroundColor = 'black'
    }, [])
    return (
        <React.Fragment>
           <Typography sx={{color: 'white'}}>Overview Page</Typography>
        </React.Fragment>
    )
}

export default OverviewPage