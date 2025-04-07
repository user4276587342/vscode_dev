import TrendingVideos from "@/components/TrendingVideos";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      {/*<div className="p-10 text-center">
        <h2 className="text-3xl font-semibold">Latest Reviews</h2>
        <p className="mt-2 text-gray-600">Explore our curated movie reviews.</p>
      </div>
      */}
      <TrendingVideos />
    </div>
  );
}

