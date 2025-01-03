import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWebHome } from "../Api/Webapi";
import "./Mainbody.css";

function Mainbody() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("UserData"));
    console.log("userData", userData);
    const fetchAds = async () => {
      try {
        setIsLoading(true);
        const response = await getWebHome();
        console.log("response", response.data.data);
        if (response.data.data.length > 0) {
            setAds(response.data.data.filter(ad => ad.category !== userData.category));
        } else {
          setAds([]);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [ads]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <img
          src={ads[currentIndex]?.image}
          alt={`Ad ${currentIndex + 1}`}
          style={{ height: "1080px", width: "1920px" }}
        />
      )}
    </div>
  );
}

export default Mainbody;
