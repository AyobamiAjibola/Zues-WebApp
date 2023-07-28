import { Typography } from "@mui/material"
import React, { useLayoutEffect } from "react"

function FastSellingItemPage() {
    
    useLayoutEffect(() => {
        document.body.style.backgroundColor = 'black'
    }, [])
    return (
        <React.Fragment>
           <Typography sx={{color: 'white'}}>Fast Selling Item Page</Typography>
        </React.Fragment>
    )
}

export default FastSellingItemPage