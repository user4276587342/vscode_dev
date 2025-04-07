"use client";
import { useState, useEffect } from "react";

const images = [
  "https://res.cloudinary.com/dkfnwublk/image/upload/v1742277949/samples/upscale-face-1.jpg",
  "https://res.cloudinary.com/dkfnwublk/image/upload/v1742277950/cld-sample-4.jpg",
  "https://res.cloudinary.com/dkfnwublk/image/upload/v1742277950/cld-sample-3.jpg",
  "https://res.cloudinary.com/dkfnwublk/image/upload/v1742277949/samples/coffee.jpg",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Carousel Images */}
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
      ))}
      {/*<span className="relative bottom-[10px] left-[0px] w-full bg-black h-[15px] z-50">
      </span>*/}
    </div>
  );
};

export default Hero;
