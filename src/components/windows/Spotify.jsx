import MacWindow from "./MacWindow";
import "./spotify.scss";

const Spotify = ({
  windowsState,
  windowName,
  setWindowsState,
  activeWindow,
  setActiveWindow,
}) => {
  return (
    <MacWindow
      width="25vw"
      windowsState={windowsState}
      windowName={windowName}
      setWindowsState={setWindowsState}
      activeWindow={activeWindow}
      setActiveWindow={setActiveWindow}
    >
      <div className="spotify-window">
        <iframe
          title="Spotify Music Player"
          src="https://open.spotify.com/embed/album/0Rkv5iqjF2uenfL0OVB8hg?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </MacWindow>
  );
};

export default Spotify;