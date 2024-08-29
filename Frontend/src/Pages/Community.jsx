import React, { useState } from 'react';

function CommunityForum() {
  const [forums, setForums] = useState([
    { name: 'IFB001 Basis Data', id: 1 },
    { name: 'IFB012 Pemrograman Berorientasi Objek', id: 2 }
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newForumName, setNewForumName] = useState('');
  const [selectedForumId, setSelectedForumId] = useState(1);
  const [comments, setComments] = useState({
    1: [
      {
        id: 1,
        user: 'Rini Nirmala, M.Klin',
        messages: ['Ini kok gini gimana ???', 'Ini kok gini gimana ???'],
        profileImage: 'https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/DevsMember%2F2024%2Fkashish.JPG?alt=media&token=3e71f52b-b06f-4e65-89ba-d49569fd76d3'
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
      setForums([...forums, { name: newForumName, id: newId }]);
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
          user: 'Rini Nirmala, M.Klin',
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

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-200 h-full border-r flex flex-col">
        <div className="p-4 border-b h-[20%]">
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
        </div>
        <div className="h-[80%] bg-red-200 flex flex-col">
          {forums.map((forum) => (
            <div
              key={forum.id}
              onClick={() => handleForumClick(forum.id)}
              className={`bg-gray-300 h-[15%] flex items-center justify-between px-4 py-2 cursor-pointer ${
                selectedForumId === forum.id ? 'bg-gray-400' : ''
              }`}
            >
              <div>
                <h3 className="font-semibold text-black">{forum.name}</h3>
                <p className="text-sm text-gray-600">01 Reguler</p>
              </div>
              <i className="ri-arrow-down-s-line"></i>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full">
        {/* Forum Header */}
        <header className="p-4 border-b h-[20%] bg-pink-300">
          <h1 className="text-xl font-bold">{forums.find(f => f.id === selectedForumId).name}</h1>
          <p>IFB012 Pemrograman Berorientasi Objek</p>
          <div className="text-sm text-gray-500">
            <span>12 Des 2023 - 09:00 WIB</span> to <span>20 Des 2023 - 09:00 WIB</span>
          </div>
          <div className="mt-2 p-2 bg-yellow-100 text-yellow-700 text-sm rounded">
            Sebagai syarat kehadiran, Anda diwajibkan menuliskan komentar sebanyak 3 kali sebelum forum berakhir
          </div>
        </header>

        {/* Comments Section */}
        <div className="h-[80%] w-full overflow-y-auto bg-pink-100">
          {comments[selectedForumId].map((comment) => (
            <div key={comment.id} className="bg-green-100 p-4 w-full">
              <div className="flex items-start space-x-4">
                {/* Profile Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={comment.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Message Content */}
                <div>
                  <span className="font-semibold text-blue-500">{comment.user}</span>
                  {comment.messages.map((message, index) => (
                    <p key={index} className="mt-1">{message}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t bg-white">
          <input
            type="text"
            placeholder="Tulis komentar..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="w-full p-2 border rounded"
          />
        </div>
      </main>

      {/* Popup for New Forum */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Forum</h2>
            <input
              type="text"
              placeholder="Forum Name"
              value={newForumName}
              onChange={(e) => setNewForumName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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
