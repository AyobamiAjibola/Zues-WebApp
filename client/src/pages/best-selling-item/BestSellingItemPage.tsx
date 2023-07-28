import { Typography } from "@mui/material"
import React, { useLayoutEffect } from "react"

function BestSellingItemPage() {
    
    useLayoutEffect(() => {
        document.body.style.backgroundColor = 'black'
    }, [])
    return (
        <React.Fragment>
           <Typography sx={{color: 'white'}}>Best Selling Item Page</Typography>
        </React.Fragment>
    )
}

export default BestSellingItemPage