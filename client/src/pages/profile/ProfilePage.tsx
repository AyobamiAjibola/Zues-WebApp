import { Typography } from "@mui/material"
import React, { useLayoutEffect } from "react"

function ProfilePage() {
    
    useLayoutEffect(() => {
        document.body.style.backgroundColor = 'black'
    }, [])
    return (
        <React.Fragment>
           <Typography sx={{color: 'white'}}>User Profile</Typography>
        </React.Fragment>
    )
}

export default ProfilePage