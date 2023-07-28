import { Typography } from "@mui/material"
import React, { useLayoutEffect } from "react"

function FeaturesPage() {
    
    useLayoutEffect(() => {
        document.body.style.backgroundColor = 'black'
    }, [])
    return (
        <React.Fragment>
           <Typography sx={{color: 'white'}}>Features Page</Typography>
        </React.Fragment>
    )
}

export default FeaturesPage