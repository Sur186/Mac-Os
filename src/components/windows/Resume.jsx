import MacWindow from "./MacWindow";
import "./resume.scss";

const Resume = ({
  windowsState,
  windowName,
  setWindowsState,
  activeWindow,
  setActiveWindow,
}) => {
  return (
    <MacWindow
      windowsState={windowsState}
      windowName={windowName}
      setWindowsState={setWindowsState}
      activeWindow={activeWindow}
      setActiveWindow={setActiveWindow}
    >
      <div className="resume-window">
        <iframe
          src="/resume.pdf"
          title="Surendra Puri Resume"
        />
      </div>
    </MacWindow>
  );
};

export default Resume;