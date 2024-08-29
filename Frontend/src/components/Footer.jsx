import { useAVToggle } from "@100mslive/react-sdk";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";

import "./Footer.css"
function Footer() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
    const hmsActions = useHMSActions();
    const isConnected = useHMSStore(selectIsConnectedToRoom);
  
    const handleLeaveRoom = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };

  return (
    <div className="middles">

<div className="control-bar flex">
  {isConnected && (
    <button
      onClick={handleLeaveRoom}
      className="btn-control btn-danger"
    >
      Leave Room
    </button>
  )}
  <button className="btn-control" onClick={toggleAudio}>
    {isLocalAudioEnabled ? "Mute" : "Unmute"}
  </button>
  <button className="btn-control" onClick={toggleVideo}>
    {isLocalVideoEnabled ? "Hide" : "Unhide"}
  </button>
</div>
</div>


  );
}

export default Footer;
