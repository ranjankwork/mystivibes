import React, { useEffect, useState } from "react";
import PartyCard from "./PartyCard";
import { getPosts } from "../services/api";

function PartiesSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data); // Make sure the response includes title, date, price, location
      } catch (error) {
        console.log("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <section className="py-5 flex flex-col justify-center text-white bg-[#400061] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center w-full max-w-[1140px] mx-auto">
        <h2 className="text-xl text-center">Events in Your City</h2>

        <div className="flex flex-wrap justify-center mt-8 w-full gap-6">
          {posts.map((event) => (
            <PartyCard
              key={event.title}
              username={event.username}
              title={event.title}
              date={event.date}
              price={event.price}
              location={event.location}
              caption={event.caption}
              imageUrl={event.image_url}
            />
          ))}
        </div>
      </div>

      {/* Uncomment this block if you plan to add the 'See all Parties' button */}
      {/* <div className="flex justify-center items-center mt-6 w-full">
    <button className="flex gap-4 justify-center items-center px-4 py-2.5 rounded-xl border-2 border-zinc-700">
      <span>See all Parties</span>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e06cd91e7d212f7581233142481ef147a768d7ae26b1b311986645335252b41c?placeholderIfAbsent=true&apiKey=d44aee9adfe64d97a8f6ddc2200f8808"
        alt="See all parties icon"
        className="w-5 h-auto"
      />
    </button>
  </div> */}
    </section>
  );
}

export default PartiesSection;
