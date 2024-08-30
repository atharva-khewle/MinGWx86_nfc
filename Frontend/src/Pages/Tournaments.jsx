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
    try {
      const response = await axios.post("http://localhost:3456/tournaments", {
        query: query,
      });
      const fetchedTournaments = response.data.organic_results;

      // Adding random prizes and player counts
      const tournamentsWithDetails = fetchedTournaments.map((tournament) => ({
        ...tournament,
        matchPrize: `SAR ${Math.floor(Math.random() * 5000) + 500}`, // Random prize between 500 and 5500
        players: `${Math.floor(Math.random() * 30) + 1}/${Math.floor(
          Math.random() * 30
        ) + 10}`, // Random players format like "12/18"
        time: "11:00 AM, 16 APR", // Placeholder time; replace with actual time if available
        type: "2x2", // Placeholder type; replace with actual type if available
      }));

      setTournaments(tournamentsWithDetails);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRedirect = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <div className="background-tournaments relative bg-red-200 max-w-[100vw] min-h-[100vh]">
        <div className="parallax">hjgfyhjsgjh</div>
        <div className="semicircle"></div>
        <h1 className="absolute top-0 ">Tournaments</h1>
      </div>
      <div className="tournament-section max-w-[100vw] min-h-[100vh] bg-[#121c26] flex flex-col items-center justify-start p-8">
        <div className="w-[80%] flex flex-col items-center justify-center mb-8">
          <div className="text-[2.8rem] text-white mb-4 text-center font-extrabold text-3xl">
            Upcoming Tournaments
          </div>
          <div className="w-full flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[70%] px-3 text-lg rounded-l-md focus:outline-none text-black"
            />
            <button
              onClick={() => fetchTournaments(searchQuery)}
              className="bg-[FE4551] text-white px-3 py-2 rounded-r-md"
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex items-start justify-center h-[70vh] pt-2 scroll-smooth scrollbar-hide overflow-auto">
          <div className="grid grid-cols-3 w-[80%] p-4 gap-4">
            {tournaments.length > 0 ? (
              tournaments.map((tournament) => (
                <motion.div
                  key={tournament.id}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "easeIn" }}
                  className="tournament-card relative cursor-pointer bg-gradient-to-r from-[#ff4343] to-[#fd9aa1] rounded-lg shadow-lg p-4 text-white flex flex-col items-center justify-center overflow-auto"
                  onClick={() => handleRedirect(tournament.link)}
                >
                  <div className="text-center text-white z-10">
                    <h2 className="text-2xl font-bold mb-2 text-white">
                      {tournament.title}
                    </h2>
                    <p className="text-sm mb-1">{tournament.time}</p>
                    <p className="text-lg font-semibold">{tournament.matchPrize}</p>
                    <p className="text-sm">Players: {tournament.players}</p>
                    <p className="text-sm">Type: {tournament.type}</p>
                  </div>

                  {/* Add the image in the corner */}
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/nfc3-2024.appspot.com/o/gamingconsole.png?alt=media&token=6cef4eda-f157-42a1-bfa2-a0bbf531b3a3"
                    alt="Gaming Console"
                    className="absolute right-0 bottom-0 w-[6.5rem] h-[6.5rem] opacity-70 transform rotate-12"
                  />
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
