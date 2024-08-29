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
    <header className="bg-blue-600 text-white p-4 h-20">
        {isConnected && (
          <button
            onClick={handleLeaveRoom}
            className="btn flex bg-red-600"
          >
            Leave Room
          </button>
        )}
    </header>
  );
}

export default Header;
