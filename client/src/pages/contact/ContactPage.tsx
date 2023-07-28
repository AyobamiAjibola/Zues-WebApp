import { Typography } from "@mui/material"
import React, { useLayoutEffect } from "react"

function ContactPage() {
    
    useLayoutEffect(() => {
        document.body.style.backgroundColor = 'black'
    }, [])
    return (
        <React.Fragment>
           <Typography sx={{color: 'white'}}>Contact Us Page</Typography>
        </React.Fragment>
    )
}

export default ContactPage