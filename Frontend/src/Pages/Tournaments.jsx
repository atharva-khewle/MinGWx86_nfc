import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tournament.css";
import { motion } from "framer-motion";

export const Tournaments = () => {
  const [searchQuery, setSearchQuery] = useState("chess");
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments(searchQuery);
  }, [searchQuery]);

  const fetchTournaments = async (query) => {
    try {
      const response = await axios.post("http://localhost:3456/tournaments", {
        query: "chess",
      });
      setTournaments(response.data.organic_results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRedirect = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <div className="background-tournaments relative flex items-center justify-center min-w-[100vw] min-h-[100vh]">
        <div className="relative min-w-[100vw] min-h-[100vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-[#1d2e3d] opacity-50"></div>
          <h1 className="font-bold text-white text-[8.8rem] pb-[6%] relative">
            TOUR<span className="outlined-text">NAM</span>ENTS
          </h1>
        </div>
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
        <div className="flex items-start justify-center h-[70vh] pt-2 scroll-smooth overflow-auto">
          <div className="grid grid-cols-3 w-[80%] p-4 gap-4">
            {tournaments.length > 0 ? (
              tournaments.map((tournament) => (
                <motion.div
                  key={tournament.id}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "easeIn" }}
                  className="tournament-card cursor-pointer bg-cover bg-center rounded-lg shadow-md flex items-center justify-center"
                  onClick={() => handleRedirect(tournament.link)}
                >
                  <span className="text-black text-2xl text-center p-2 font-bold shadow-text">
                    {tournament.title}
                  </span>
                </motion.div>
              ))
            ) : (
              <div className="text-white text-lg">No tournaments found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tournaments;
