import { useState, useLayoutEffect } from "react";

export default function ContextVariables() {
        const [forgotPass, setForgotPass] = useState(false);

        const [contextVal, setContextVal] = useState(
            [
            {forgotPass, setForgotPass}
            ]);

        useLayoutEffect(() => {
            setContextVal([
                {forgotPass, setForgotPass}
            ])
            }, [forgotPass]);
    
    return contextVal
};