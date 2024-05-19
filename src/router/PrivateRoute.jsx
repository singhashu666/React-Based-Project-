import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';

function PrivateRoute({Component}) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        const userToken = localStorage.getItem('role');
        if (userToken) {
            setIsLoggedIn(true);
            if (userToken.toLowerCase() === 'admin') {
                setIsLoggedIn(false);
                navigate('/admin');
            } else if (userToken.toLowerCase() === 'user') {
                navigate("/user")
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
            navigate('/');
        }
    };

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]); 

    // 
    return(
        <>
        <Component/>
        </>
    )
}

export default PrivateRoute;
