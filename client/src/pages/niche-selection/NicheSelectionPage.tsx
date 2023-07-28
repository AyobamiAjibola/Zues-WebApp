import { Typography } from "@mui/material"
import React, { useLayoutEffect } from "react"

function NicheSelectionPage() {
    
    useLayoutEffect(() => {
        document.body.style.backgroundColor = 'black'
    }, [])
    return (
        <React.Fragment>
           <Typography sx={{color: 'white'}}>Niche Selection Page</Typography>
        </React.Fragment>
    )
}

export default NicheSelectionPage