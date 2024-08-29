import React from "react";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";

function Header() {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  const handleLeaveRoom = () => {
    if (isConnected) {
      hmsActions.leave();
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <div className="text-xl font-bold">100ms Video Conference</div>

        {/* Leave Room Button */}
        {isConnected && (
          <button
            onClick={handleLeaveRoom}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Leave Room
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
