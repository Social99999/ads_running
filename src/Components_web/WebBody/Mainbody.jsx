import React, { useEffect, useState } from "react";
import tracking from "../../assets_web/Group (4).png";
import deliveryMan from "../../assets_web/12008 1.png";
import Icon from "../../assets_web/Group 7.png";
import Icon1 from "../../assets_web/Group 7 (1).png";
import Icon2 from "../../assets_web/Group 7 (2).png";
import Icon3 from "../../assets_web/Group 7 (3).png";
import Icon4 from "../../assets_web/Group 7 (4).png";
import partner1 from "../../assets_web/partner logo (1).jpg";
import partner2 from "../../assets_web/partner logo (2).jpg";
import { FaArrowRight } from "react-icons/fa";

import "./Mainbody.css";
import { useNavigate } from "react-router-dom";
import { getWebHome } from "../Api/Webapi";

const images = [
  'https://www.freewebheaders.com/wp-content/gallery/nature-size-1024x300/cache/unique-lake-snow-mountain-clouds-nature-landscape-header_size-1024x300.jpg-nggid045995-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg',
  'https://static.vecteezy.com/system/resources/thumbnails/049/150/623/small/green-valley-with-mountns-in-the-background-photo.jpg',
  'https://st4.depositphotos.com/1033604/38136/i/1600/depositphotos_381367268-stock-photo-panoramic-rural-landscape-idyllic-vast.jpg',
  // Add more online image URLs as needed
];

function Mainbody() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ads, setAds] = useState([]);
  useEffect(() => {
    const response = async () => {
      const response = await getWebHome();
      console.log(response.ads);
      setAds(response.ads);
    }
    response();
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} style={{ height: '700px', width: '100%' }} />
    </div>
  );
}

export default Mainbody;
