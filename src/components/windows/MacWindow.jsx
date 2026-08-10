import { Rnd } from "react-rnd";
import "./windows.scss";

const MacWindow = ({
  children,
  width = "40vw",
  height = "40vh",
  windowName,
  windowsState,
  setWindowsState,
  activeWindow,
  setActiveWindow,
}) => {

  // =========================================
  // Active Window
  // =========================================

  const isActive = activeWindow === windowName;
  const currentZIndex =
    windowsState[windowName]?.zIndex || 1;


  // =========================================
  // Bring Window To Front
  // =========================================

  const handleWindowClick = () => {
    setActiveWindow(windowName);
    setWindowsState((prevState) => {
      const maxZ = Math.max(
        ...Object.values(prevState).map(
          (window) => window.zIndex || 0
        )
      );

      return {
        ...prevState,

        [windowName]: {
          ...prevState[windowName],
          zIndex: maxZ + 1,
        },
      };
    });
  };


  // =========================================
  // Close Window
  // =========================================

  const handleClose = (e) => {

    e.stopPropagation();


    setWindowsState((prevState) => ({
      ...prevState,

      [windowName]: {
        ...prevState[windowName],
        open: false,
        minimized: false,
      },
    }));


    setActiveWindow(null);
  };


  // =========================================
  // Minimize Window
  // =========================================

  const handleMinimize = (e) => {

    e.stopPropagation();


    setWindowsState((prevState) => ({
      ...prevState,

      [windowName]: {
        ...prevState[windowName],
        minimized: true,
      },
    }));


    setActiveWindow(null);
  };

  return (

    <Rnd
      default={{
        width,
        height,
        x: 300,
        y: 200,
      }}

      minWidth={280}
      minHeight={200}
      bounds="parent"
      style={{
        zIndex: currentZIndex,
      }}
    >
      <div
        className={`windows ${
          isActive ? "active" : ""
        }`}

        onClick={handleWindowClick}
      >
        <div className="mac-nav">
          <div className="dots">
            <div
              className="dot red"
              onClick={handleClose}
              title="Close"
            />
            <div
              className="dot yellow"
              onClick={handleMinimize}
              title="Minimize"
            />
            <div
              className="dot green"
              title="Maximize"
            />
          </div>
          <div className="title">
            <p>
              Surendrapuri - 2Zh
            </p>
          </div>
        </div>
        <div className="mac-content">
          {children}
        </div>

      </div>

    </Rnd>
  );
};


export default MacWindow;