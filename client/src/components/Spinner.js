import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {useNavigate, useLocation} from "react-router-dom";

export default function Spinner() {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
    const interval = setInterval(() => {
        setCount((pre) => --pre);
    }, 1000);

    count === 0 && navigate("/login", {
          state: location.pathname,
        });
    
    return ()=> clearInterval(interval)
    }, [count, navigate,location]);


  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
      <h3 style={{display: "flex", justifyContent: "center"}}>
        Redirecting to You in {count} Seconds
      </h3>
    </Box>
  );
}