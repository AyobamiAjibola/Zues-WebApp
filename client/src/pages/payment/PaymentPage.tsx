import { Typography } from "@mui/material"
import React, { useLayoutEffect } from "react"

function PaymentPage() {
    
    useLayoutEffect(() => {
        document.body.style.backgroundColor = 'black'
    }, [])
    return (
        <React.Fragment>
           <Typography sx={{color: 'white'}}>Payment Page</Typography>
        </React.Fragment>
    )
}

export default PaymentPage