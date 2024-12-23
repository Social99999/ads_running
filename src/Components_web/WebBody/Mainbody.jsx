import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWebHome } from "../Api/Webapi";
import "./Mainbody.css";

function Mainbody() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setIsLoading(true);
        const response = await getWebHome();
        setAds(response.data.data);
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
          style={{ height: "700px", width: "100%" }}
        />
      )}
    </div>
  );
}

export default Mainbody;
