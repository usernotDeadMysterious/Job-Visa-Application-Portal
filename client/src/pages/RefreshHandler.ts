import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type RefreshHandlerProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const RefreshHandler = ({setIsAuthenticated}: RefreshHandlerProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        if (localStorage.getItem('token')){
            setIsAuthenticated(true);
            if (location.pathname==='/' || location.pathname==='/new-login' || location.pathname==='/new-signup'){
                navigate('/user-dashboard?overview=', {replace:false});
            }

        }
    },[location,navigate,setIsAuthenticated])

  return (
    null
  )
}

export default RefreshHandler