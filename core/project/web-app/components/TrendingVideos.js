"use client";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const videos = [
  {
    src: "https://res.cloudinary.com/dkfnwublk/image/upload/v1742277949/samples/upscale-face-1.jpg",
    title: "Movie thriller theory that turns out to be true",
  },
  {
    src: "https://res.cloudinary.com/dkfnwublk/image/upload/v1742277950/cld-sample-4.jpg",
    title: "Toy stories: all you need to know",
  },
  {
    src: "https://res.cloudinary.com/dkfnwublk/image/upload/v1742277950/cld-sample-3.jpg",
    title: "The best superhero movies ranked",
  },
  {
    src: "https://res.cloudinary.com/dkfnwublk/image/upload/v1742277949/samples/coffee.jpg",
    title: "Sci-fi movies that predicted the future",
  },
];

const TrendingVideos = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust scroll amount
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full px-6 mt-10">
      <h2 className="text-3xl font-semibold text-left mb-4">Trending Videos</h2>
      {/* Scrollable Container */}
      <div className="relative overflow-hidden">
        <div ref={scrollRef} className="flex gap-4 overflow-x-scroll no-scrollbar scroll-smooth">
          {videos.map((video, index) => (
            <div key={index} className="min-w-[350px] flex-shrink-0">
              <div className="h-[180px] rounded-lg overflow-hidden shadow-lg">
                <img src={video.src} alt={`Video ${index + 1}`} className="w-full h-full object-cover" />
              </div>
              <p className="mt-2 text-sm text-gray-700 font-medium">{video.title}</p>
            </div>
          ))}
        </div>

        {/* Left Button */}
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow-md z-10 hover:bg-gray-700"
          onClick={() => scroll("left")}
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Right Button */}
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full shadow-md z-10 hover:bg-gray-700"
          onClick={() => scroll("right")}
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default TrendingVideos;
