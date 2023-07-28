import { Typography } from "@mui/material";
import React, { useLayoutEffect } from "react";

function HomePage() {

    useLayoutEffect(() => {
        document.body.style.backgroundColor = 'black'
    }, [])
    return (
        <React.Fragment>
           <Typography sx={{color: 'white'}}>Home Page</Typography>
        </React.Fragment>
    )
}

export default HomePage