import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tournament.css";
import { motion } from "framer-motion";

export const Tournaments = () => {
  const [searchQuery, setSearchQuery] = useState("chess");
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    console.log("Fetching tournaments with query:", searchQuery);
    fetchTournaments(searchQuery);
  }, [searchQuery]);

  const fetchTournaments = async (query) => {
    const testFetchTournaments = async () => {
      try {
        const response = await axios.post("http://localhost:3456/tournaments", {
          query: "chess",
        });
        setTournaments(response.data.organic_results);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    testFetchTournaments();
  };
  const handleRedirect = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <div className="background-tournaments relative bg-red-200 max-w-[100vw] min-h-[100vh]">
        <div className="parallax">hjgfyhjsgjh</div>
        <div className="semicircle"></div>
        <h1 className="absolute top-0 "> Tournaments</h1>
      </div>
      <div className="tournament-section max-w-[100vw] min-h-[100vh] bg-[#121c26] flex flex-col items-center justify-start p-8">
        <div className="w-[80%] flex flex-col items-center justify-center mb-8">
          <div className="text-[2.8rem] text-white mb-4 text-center">
            Upcoming Tournaments
          </div>
          <div className="w-full flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[70%] px-3 text-lg rounded-l-md focus:outline-none"
            />
            <button
              onClick={() => fetchTournaments(searchQuery)}
              className="bg-blue-600 text-white px-3 py-2 rounded-r-md"
            >
              Search
            </button>
          </div>
        </div>
        <div className=" flex items-start justify-center h-[70vh] pt-2 scroll-smooth scrollbar-hide overflow-auto">
          <div className="grid grid-cols-3 w-[80%] p-4 gap-4  ">
            {tournaments.length > 0 ? (
              tournaments.map((tournament) => (
                <motion.div
                  key={tournament.id}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "easeIn" }}
                  className="tournament-card cursor-pointer bg-cover bg-red-200 bg-center rounded-lg shadow-md flex items-center justify-center"
                  // style={{
                  //   backgroundImage: `url('https://example.com/4k-image.png')`, // Replace with actual 4K PNG URL
                  // }}
                  onClick={() => handleRedirect(tournament.link)}
                >
                  {/* <div className="overlay"> */}
                  <span className="text-black text-2xl text-center p-2 font-bold shadow-text">
                    {tournament.title}
                  </span>
                  {/* </div> */}
                </motion.div>
              ))
            ) : (
              <div className="text-white text-lg">No tournaments found</div>
            )}
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Tournaments;
