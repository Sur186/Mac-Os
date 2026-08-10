import "./dock.scss";

const Dock = ({ windowsState, setWindowsState }) => {
  const openApp = (appId) => {
    setWindowsState((state) => ({
      ...state,
      [appId]: {
        ...state[appId],
        open: true,
        minimized: false,
      },
    }));
  };

  return (
    <footer className="dock">

      {/* GitHub */}
      <div
        onClick={() => openApp("github")}
        className="icon github"
      >
        <img src="/doc-icons/github.svg" alt="GitHub" />

        {windowsState.github.open && (
          <div className="indicator"></div>
        )}
      </div>

      {/* Developer */}
      <div
        onClick={() => openApp("developer")}
        className="icon developer"
      >
        <img
          src="/doc-icons/developer.svg"
          alt="Developer"
        />

        {windowsState.developer.open && (
          <div className="indicator"></div>
        )}
      </div>

      {/* Notes */}
      <div
        onClick={() => openApp("note")}
        className="icon note"
      >
        <img src="/doc-icons/note.svg" alt="Notes" />

        {windowsState.note.open && (
          <div className="indicator"></div>
        )}
      </div>

      {/* Resume */}
      <div
        onClick={() => openApp("resume")}
        className="icon pdf"
      >
        <img src="/doc-icons/pdf.svg" alt="Resume" />

        {windowsState.resume.open && (
          <div className="indicator"></div>
        )}
      </div>

      {/* Calendar */}
      <div
        onClick={() =>
          window.open(
            "https://calendar.google.com/calendar/u/0/r",
            "_blank"
          )
        }
        className="icon calendar"
      >
        <img src="/doc-icons/calender.svg" alt="Calendar" />
      </div>

      {/* Spotify */}
      <div
        onClick={() => openApp("spotify")}
        className="icon spotify"
      >
        <img src="/doc-icons/spotify.svg" alt="Spotify" />

        {windowsState.spotify.open && (
          <div className="indicator"></div>
        )}
      </div>

      {/* Email */}
      <div
        onClick={() =>
          window.open(
            "mailto:surendrapuri5121@gmail.com",
            "_blank"
          )
        }
        className="icon mail">
        <img src="/doc-icons/mail.svg" alt="Email" />
      </div>

      {/* LinkedIn */}
      <div
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/surendragoswami97/",
            "_blank"
          )
        }
        className="icon link"
      >
        <img src="/doc-icons/link.svg" alt="LinkedIn" />
      </div>

      {/* Terminal */}
      <div
        onClick={() => openApp("cli")}
        className="icon cli"
      >
        <img src="/doc-icons/cli.svg" alt="Terminal" />

        {windowsState.cli.open && (
          <div className="indicator"></div>
        )}
      </div>

    </footer>
  );
};

export default Dock;