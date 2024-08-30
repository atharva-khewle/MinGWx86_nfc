import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import your CSS file here

const tournaments = [
  { id: 1, title: 'Chess Tournament', link: 'https://example.com/chess' },
  { id: 2, title: 'Soccer Championship', link: 'https://example.com/soccer' },
  { id: 3, title: 'Basketball League', link: 'https://example.com/basketball' },
  { id: 4, title: 'Tennis Open', link: 'https://example.com/tennis' },
  { id: 5, title: 'eSports Tournament', link: 'https://example.com/esports' },
  { id: 6, title: 'eSports Tournament', link: 'https://example.com/esports' },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCatalogClick = () => {
    navigate('/merch'); // Navigate to /merch route
  };

  const handleCommunityClick = () => {
    navigate('/community'); // Navigate to /community route
  };

  const handleTournamentsClick = () => {
    navigate('/tournaments'); // Navigate to /tournaments route
  };

  const handleRedirect = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className=' snap-container h-[100vh] w-[100vw] overflow-y-scroll'>
      <div className="snap-start description h-screen w-screen bg-yellow-300 flex items-center justify-center p-10">
        <div className='text-8xl text-white font-black'>
          PROJECT TITLE
        </div>
      </div>

      <div className='snap-start matchingames h-screen w-screen bg-orange-100'>
        <div className="flex flex-col items-center justify-start p-8 min-h-full">
          <div className=" w-[80%] flex flex-col items-center justify-center mb-8">
            <div className="text-[2.8rem] text-white mb-4 text-center font-extrabold">
              <div className='lkj p-10'></div>
            </div>
          </div>
          <div className="flex items-start justify-center h-[70vh] pt-2 overflow-auto">
            <div className="grid grid-cols-3 w-[80%] p-4 gap-4">
              {tournaments.map((tournament) => (
                <motion.div
                  key={tournament.id}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "easeIn" }}
                  className="tournament-card cursor-pointer bg-cover bg-gray-300 opacity-80 bg-center rounded-lg shadow-md flex items-center justify-center"
                  onClick={() => handleRedirect(tournament.link)}
                >
                  <span className="text-black text-2xl text-center p-2 font-bold">
                    {tournament.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="snap-start h-screen w-screen bg-[#172330] flex justify-center items-end">
        <div className="h-[89%] w-[90%] border-x border-t border-gray-300 flex items-center justify-center flex-col">
          <div className='w-full h-[13.5%] flex'>
            <div className='h-full w-[70%] border-b border-gray-300 border-r'></div>
            <div className='h-full w-[30%] flex items-center justify-center'>
              <div>
                <span className='text-2xl small-outlined-text'>AINT&nbsp;</span>
                <span className='text-2xl font-bold'>NO&nbsp;</span>
                <span className='text-2xl small-outlined-text'>FOE&nbsp;</span>
                <span className='text-2xl font-bold'>IN&nbsp;</span>
                <span className='text-2xl small-outlined-text'>SIGHT&nbsp;</span>
              </div>
            </div>
          </div>
          <div className='w-full h-[86.5%] relative flex flex-col items-center justify-start'>
            <div className="relative flex items-start justify-center mt-[3rem]">
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/nfc3-2024.appspot.com/o/pngwing.com%20(1).png?alt=media&token=36399fce-5267-4c53-9ec5-f57275cb677d" 
                alt="Prize Pool" 
                className="absolute inset-0 h-[48vh] top-[-10%] left-[26%] object-contain z-10"
              />
              <span className="text-[#ff4554] text-[10rem] italic font-bold letter-spacing-tight mr-[5rem]">PRIZE</span>
              <span className="outlined-text text-[10rem] letter-spacing-tight ml-[5rem]">POOL</span>
            </div>
            <div className="h-full w-full flex flex-col items-center justify-center">
              <button
                onClick={handleTournamentsClick}
                className="mb-8 px-8 py-4 bg-[#ff4554] text-black rounded-full text-2xl font-bold hover:bg-[#ff6670] transition-colors"
              >
                Explore Tournaments
              </button>
              <div className="text-2xl font-bold">
                DANCE FOR ME DANCE FOR ME OOOH
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="snap-start h-screen w-screen flex flex-col bg-[#adfdss] text-white">
        <div className="w-full h-[35%] flex items-end justify-center">
          <span className="font-bold text-[11rem]">Title Merch</span>
        </div>

        <div className="w-full h-[35%] flex px-[1.1rem] justify-around items-center">
          <div className="h-[90%] w-[20%] bg-pink-500 rounded-full overflow-hidden">
            <img src="https://firebasestorage.googleapis.com/v0/b/nfc3-2024.appspot.com/o/WhatsApp_Image_2024-08-30_at_04.41.33-removebg-preview.png?alt=media&token=21b3ca35-d334-44c2-829d-1aa6a98e0c38" alt="Model 1" className="h-[150%] w-full object-contain rounded-full" />
          </div>
          <div className="h-[90%] w-[20%] bg-red-500 rounded-full overflow-hidden">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nfc3-2024.appspot.com/o/redvalo-removebg-preview.png?alt=media&token=9f3aed3c-c749-419a-9baa-f7f1eda36644"
              alt="Model 2"
              className="h-[200%] w-full object-contain rounded-full transform -translate-y-[30%]"
            />
          </div>

          <div 
            className="h-[90%] w-[20%] bg-green-500 rounded-full flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer"
            onClick={handleCatalogClick}
          >
            <i className="ri-arrow-right-up-line text-white text-2xl"></i>
            <span className="text-white text-lg">See Catalog</span>
          </div>
          <div className="h-[90%] w-[20%] bg-blue-500 rounded-full overflow-hidden">
            <img src="https://firebasestorage.googleapis.com/v0/b/nfc3-2024.appspot.com/o/girPqIJ_bg_removed.png?alt=media&token=31d22452-bb0f-49c2-8b86-13ee21b12971" alt="Model 3" className="h-[120%] w-full object-contain rounded-full" />
          </div>
          <div className="h-[90%] w-[20%] bg-yellow-500 rounded-full overflow-hidden">
            <img src="https://firebasestorage.googleapis.com/v0/b/nfc3-2024.appspot.com/o/09785bbc22c1bccca8187794cb0fc92a-removebg-preview.png?alt=media&token=7f1d511b-48b9-4232-908d-d65b05b15639" alt="Model 4" className="h-[140%] w-full object-contain rounded-full" />
          </div>
        </div>

        <div className="w-full h-[30%] flex items-center justify-between px-[1.1rem] text-gray-300 text-sm">
          <div className="w-[30%] p-4">
            <p>Here you will find everything you need. Our collection is constantly expanding to suit your unique style.</p>
          </div>
          <div className="w-[30%] p-4">
            <p>
              The women's clothing in our new collection is both comfortable and stylish, ideal for both casual days and special
              occasions, all at affordable prices.
            </p>
          </div>
          <div className="w-[30%] p-4 flex items-center justify-center">
            <button className="bg-transparent border-2 border-white px-6 py-2 rounded-full text-white hover:bg-white hover:text-black transition-all">
              Explore New Collection
            </button>
          </div>
        </div>
      </div>

      <div className='snap-start h-screen w-screen bg-yellow-200 add-bg-community p-7 flex flex-col items-center justify-center'>
        <span className='text-9xl font-bold text-[#FABC57]'>COMMUNITY</span>
        <button
          onClick={handleCommunityClick}
          className="mt-8 px-8 py-4 bg-[#FABC57] text-black rounded-full text-2xl font-bold hover:bg-[#fac46e] transition-colors"
        >
          Open Community
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
