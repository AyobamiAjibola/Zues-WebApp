import { Typography } from "@mui/material"
import React, { useLayoutEffect } from "react"

function AboutPage() {
    
    useLayoutEffect(() => {
        document.body.style.backgroundColor = 'black'
    }, [])
    return (
        <React.Fragment>
           <Typography sx={{color: 'white'}}>About Us Page</Typography>
        </React.Fragment>
    )
}

export default AboutPage