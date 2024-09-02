import React, { useState } from 'react';
import logo1 from "../../public/logo1.png"

function CommunityForum() {
  const [forums, setForums] = useState([
    { name: 'Valorant Chats', id: 1, createdAt: 'Dec 12, 2023 - 09:00 WIB', createdBy: 'John Doe' },
    { name: 'PUBG Pros', id: 2, createdAt: 'Dec 13, 2023 - 10:00 WIB', createdBy: 'Jane Smith' },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newForumName, setNewForumName] = useState('');
  const [selectedForumId, setSelectedForumId] = useState(1);
  const [comments, setComments] = useState({
    1: [
      {
        id: 1,
        user: 'Juhi Deore',
        messages: ['WHO WONN???', 'WHO WONN???'],
        profileImage: 'https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/DevsMember%2F2024%2FJuhi.jpg?alt=media&token=33b59920-a019-458e-a925-4cfda021d74a'
      },
      {
        id: 2,
        user: 'Jash Rashne',
        messages: ['Guys! I won the first place in Jett Comp Tourney.'],
        profileImage: 'https://via.placeholder.com/150',
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fesports.gg%2Fnews%2Fvalorant%2Friot-upgrading-valorant-post-match-win-and-loss-screens%2F&psig=AOvVaw1Jf22eGb75F8r743SQOGMJ&ust=1725084327858000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLjtroqGnIgDFQAAAAAdAAAAABAE', // Static image for this post
      }
    ],
    2: []
  });
  const [newMessage, setNewMessage] = useState('');

  const handleCreateClick = () => {
    setShowPopup(true);
  };

  const handleDoneClick = () => {
    if (newForumName.trim()) {
      const newId = forums.length + 1;
      setForums([...forums, { name: newForumName, id: newId, createdAt: new Date().toLocaleString(), createdBy: 'Current User' }]);
      setComments({ ...comments, [newId]: [] });
      setNewForumName('');
    }
    setShowPopup(false);
  };

  const handleCancelClick = () => {
    setShowPopup(false);
    setNewForumName('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleDoneClick();
    }
  };

  const handleForumClick = (id) => {
    setSelectedForumId(id);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const currentComments = comments[selectedForumId];
      const lastComment = currentComments[currentComments.length - 1];

      if (
        lastComment &&
        lastComment.user === 'Rini Nirmala, M.Klin' &&
        lastComment.messages.length < 2
      ) {
        // Add message to the existing last comment
        const updatedComments = [...currentComments];
        updatedComments[updatedComments.length - 1].messages.push(newMessage);
        setComments({ ...comments, [selectedForumId]: updatedComments });
      } else {
        // Create a new comment
        const newComment = {
          id: currentComments.length + 1,
          user: 'Juhi Deore',
          messages: [newMessage],
          profileImage: 'https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/DevsMember%2F2024%2Fkashish.JPG?alt=media&token=3e71f52b-b06f-4e65-89ba-d49569fd76d3'
        };
        setComments({
          ...comments,
          [selectedForumId]: [...currentComments, newComment]
        });
      }
      setNewMessage('');
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const selectedForum = forums.find(f => f.id === selectedForumId);

  return (
    <div className="flex h-screen w-full bg-white p-2">
      {/* Sidebar */}
      <aside className="w-64 h-full  flex flex-col">
        <div className="h-[20%] bg-red-100 w-full"> 
          <img src={logo1} alt="" className='w-ful h-full' />
          </div> {/* Empty space in sidebar */}
        <div className="h-[80%] border-r  flex flex-col">
          {forums.map((forum) => (
            <div
              key={forum.id}
              onClick={() => handleForumClick(forum.id)}
              className={`bg-gray-100 h-[15%] flex items-center justify-between px-4 py-2 cursor-pointer ${
                selectedForumId === forum.id ? 'bg-gray-300' : ''
              }`}
            >
              <div>
                <h3 className="font-semibold text-black">{forum.name}</h3>
                <p className="text-sm text-gray-600">{forum.createdBy}</p>
              </div>
              <i className="ri-arrow-down-s-line"></i>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full">
        {/* Forum Header */}
        <header className="p-4 border border-gray-400 h-[20%] rounded-2xl flex justify-between items-center">
          <div>
            <h1 className="text-xl text-black font-bold">{selectedForum.name}</h1>
            <p className='text-gray-700'>Created by: {selectedForum.createdBy}</p>
            <div className="text-sm text-gray-700">
              <span>{selectedForum.createdAt}</span>
            </div>
          </div>
          {/* Create Button in Header */}
          <a
            href="#_"
            onClick={handleCreateClick}
            className="relative inline-flex items-center justify-between px-6 py-3 overflow-hidden font-medium transition-all bg-gray-300 rounded hover:bg-white group"
          >
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              Create
            </span>
            <span className="relative text-black group-hover:text-white ml-2">+</span>
          </a>
        </header>

        {/* Comments Section */}
        <div className="h-[80%] w-full overflow-y-auto ">
          {comments[selectedForumId].map((comment) => (
            <div key={comment.id} className=" p-2 pb-4 w-full border-b ">
              <div className="flex items-start space-x-4 p-2 ">
                {/* Profile Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={comment.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Message Content */}
                <div className=''>
                  <span className="font-semibold text-blue-500">{comment.user}</span>
                  {comment.messages.map((message, index) => (
                    <p key={index} className="mt-1 text-black">{message}</p>
                  ))}
                  {/* Display image if available */}
                  {comment.image && (
                    <img
                      src={comment.image}
                      alt="Comment visual"
                      className="mt-2 rounded-lg"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t bg-white flex items-center space-x-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="flex-1 p-2 border rounded text-black"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </main>

      {/* Popup for New Forum */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-black">Create New Forum</h2>
            <input
              type="text"
              placeholder="Forum Name"
              value={newForumName}
              onChange={(e) => setNewForumName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-2 border rounded mb-4 text-black"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleDoneClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityForum;
