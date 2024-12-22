import React, { useEffect } from 'react'
import './Formate.css'
import { useNavigate } from 'react-router-dom';
function Formate({children}) {

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
  <>
    <div className=''>
      {children}
    </div>
  </>
  )
}

export default Formate
