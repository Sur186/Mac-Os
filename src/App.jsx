import {lazy, Suspense, useEffect, useRef, useState } from "react";

import "./app.scss";

// Components
import Nav from "./components/Nav";
import Dock from "./components/Dock";
import Spotlight from "./components/Spotlight";
import Weather from "./components/Weather";

// Windows
import BootScreen from "./components/windows/BootScreen";
import ContextMenu from "./components/windows/ContextMenu";
const Github = lazy(() => import("./components/windows/Github"));
const Note = lazy(() => import("./components/windows/Note"));
const Resume = lazy(() => import("./components/windows/Resume"));
const Spotify = lazy(() => import("./components/windows/Spotify"));
const Cli = lazy(() => import("./components/windows/Cli"));
const Developer = lazy(() => import("./components/windows/Developer"));
const Wallpaper = lazy(() => import("./components/windows/Wallpapermodal"));
const Settings = lazy(() => import("./components/windows/Settings"));

export const App = () => {

  // =========================================
  // Boot Screen
  // =========================================

  const [isBooting, setIsBooting] = useState(true);


  // =========================================
  // Spotlight
  // =========================================

  const [showSpotlight, setShowSpotlight] = useState(false);


  // =========================================
  // Settings / Wallpaper / Refresh
  // =========================================

  const [showSettings, setShowSettings] = useState(false);

  const [showWallpaper, setShowWallpaper] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);


  // =========================================
  // Wallpaper
  // =========================================

  const [wallpaper, setWallPaper] = useState(() => {
    return (
      localStorage.getItem("wallpaper") ||
      "/wallpapers/mountain.jpg"
    );
  });

  useEffect(() => {
    localStorage.setItem("wallpaper", wallpaper);
  }, [wallpaper]);


  // =========================================
  // Theme
  // =========================================

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);


  // =========================================
  // Context Menu
  // =========================================

  const [contextMenu, setContextMenu] = useState({
    show: false,
    x: 0,
    y: 0,
  });


  // =========================================
  // Windows State
  // =========================================

  const [windowsState, setWindowsState] = useState({
    github: {
      open: false,
      minimized: false,
      zIndex: 1,
    },

    note: {
      open: false,
      minimized: false,
      zIndex: 2,
    },

    resume: {
      open: false,
      minimized: false,
      zIndex: 3,
    },

    spotify: {
      open: false,
      minimized: false,
      zIndex: 4,
    },

    cli: {
      open: false,
      minimized: false,
      zIndex: 5,
    },

    developer: {
      open: false,
      minimized: false,
      zIndex: 6,
    },
  });

  const [activeWindow, setActiveWindow] = useState(null);


  // =========================================
  // Desktop Folders
  // =========================================

  const [folders, setFolders] = useState(() => {
    try {
      const savedFolders =
        localStorage.getItem("desktop-folders");

      return savedFolders
        ? JSON.parse(savedFolders)
        : [];
    } catch {
      return [];
    }
  });


  useEffect(() => {
    localStorage.setItem(
      "desktop-folders",
      JSON.stringify(folders)
    );
  }, [folders]);


  const [editingFolderId, setEditingFolderId] =
    useState(null);

  const cancelRenameRef = useRef(false);


  // =========================================
  // Create Folder
  // =========================================

  const handleCreateFolder = () => {
    setFolders((prev) => {

      const baseName = "New Folder";

      const existingNames = prev.map(
        (folder) => folder.name
      );

      let name = baseName;
      let count = 2;

      while (existingNames.includes(name)) {
        name = `${baseName} ${count}`;
        count++;
      }


      const column = prev.length % 5;
      const row = Math.floor(prev.length / 5);


      const newFolder = {
        id: Date.now(),
        name,
        x: column * 100,
        y: 50 + row * 100,
      };


      return [...prev, newFolder];
    });
  };


  // =========================================
  // Rename Folder
  // =========================================

  const handleRenameFolder = (id, newName) => {

    const trimmedName = newName.trim();


    if (!trimmedName) {
      setEditingFolderId(null);
      return;
    }


    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id
          ? {
              ...folder,
              name: trimmedName,
            }
          : folder
      )
    );


    setEditingFolderId(null);
  };


  // =========================================
  // Refresh
  // =========================================

  const handleRefresh = () => {

    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };


  // =========================================
  // Boot Screen Effect
  // =========================================

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2000);


    return () => {
      clearTimeout(timer);
    };

  }, []);


  // =========================================
  // Keyboard Events
  // =========================================

  useEffect(() => {

    const handleKeyDown = (e) => {

      // Spotlight
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();

        setShowSpotlight((prev) => !prev);
      }


      // Escape
      if (e.key === "Escape") {
        setShowSpotlight(false);
      }
    };


    // Close context menu
    const handleGlobalClick = () => {

      setContextMenu((prev) =>
        prev.show
          ? {
              ...prev,
              show: false,
            }
          : prev
      );
    };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "click",
      handleGlobalClick
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "click",
        handleGlobalClick
      );

    };

  }, []);


  // =========================================
  // Context Menu
  // =========================================

  const handleContextMenu = (e) => {

    // Only desktop background
    if (e.target !== e.currentTarget) {
      return;
    }


    e.preventDefault();


    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
    });
  };


  // =========================================
  // Boot Screen
  // =========================================

  if (isBooting) {
    return <BootScreen />;
  }


  // =========================================
  // Render
  // =========================================

  return (

    <main
      className={`app ${
        theme
      } ${
        isRefreshing ? "refreshing" : ""
      }`}

      onContextMenu={handleContextMenu}

      style={{
        backgroundImage: `url(${wallpaper})`,
      }}
    >


      {/* =====================================
          Desktop Folders
      ====================================== */}

      {folders.map((folder) => (

        <div
          className="desktop-folder"
          key={folder.id}

          style={{
            left: `${folder.x}px`,
            top: `${folder.y}px`,
          }}

          onDoubleClick={() => {
            setEditingFolderId(folder.id);
          }}
        >

          <img
            src="/doc-icons/folder.svg"
            alt="Folder"
          />
          
          {editingFolderId === folder.id ? (
            <input
              autoFocus
             defaultValue={folder.name}
              className="folder-name-input"
              onKeyDown={(e) => {
                if (e.key === "Enter") {

                  handleRenameFolder(
                    folder.id,
                    e.target.value
                  );
                }


                if (e.key === "Escape") {
                  cancelRenameRef.current = true;
                  setEditingFolderId(null);
                }

              }}

              onBlur={(e) => {
                if (cancelRenameRef.current) {
                  cancelRenameRef.current = false;
                  return;
                }
                handleRenameFolder(
                  folder.id,
                  e.target.value
                );
              }}
            />

          ) : (
            <span>
              {folder.name}
            </span>
          )}

        </div>

      ))}


      {/* =====================================
          Navigation
      ====================================== */}

      <Nav />

      <Weather />


      <Dock
        windowsState={windowsState}
        setWindowsState={setWindowsState}
      />

    <Suspense fallback={null}>

      {windowsState.github.open &&
        !windowsState.github.minimized && (
          <Github
            windowName="github"
            windowsState={windowsState}
            setWindowsState={setWindowsState}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
          />

        )}

      {windowsState.note.open &&
        !windowsState.note.minimized && (
          <Note
            windowName="note"
            windowsState={windowsState}
            setWindowsState={setWindowsState}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
          />

        )}

      {windowsState.resume.open &&
        !windowsState.resume.minimized && (
          <Resume
            windowName="resume"
            windowsState={windowsState}
            setWindowsState={setWindowsState}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
          />

        )}

      {windowsState.spotify.open &&
        !windowsState.spotify.minimized && (
          <Spotify
            windowName="spotify"
            windowsState={windowsState}
            setWindowsState={setWindowsState}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
          />

        )}

      {windowsState.cli.open &&
        !windowsState.cli.minimized && (
          <Cli
            windowName="cli"
            windowsState={windowsState}
            setWindowsState={setWindowsState}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
          />

        )}

      {windowsState.developer.open &&
        !windowsState.developer.minimized && (
          <Developer
            windowName="developer"
            windowsState={windowsState}
            setWindowsState={setWindowsState}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
          />

        )}

      {showSpotlight && (
        <Spotlight
          windowsState={windowsState}
          setWindowsState={setWindowsState}
          setActiveWindow={setActiveWindow}
          setShowSpotlight={setShowSpotlight}
        />

      )}

      {contextMenu.show && (
        <ContextMenu
          position={{
            x: contextMenu.x,
            y: contextMenu.y,
          }}
          setShowWallpaper={setShowWallpaper}
          setShowSettings={setShowSettings}
          onRefresh={handleRefresh}
          onCreateFolder={handleCreateFolder}
        />

      )}

      {showWallpaper && (
        <Wallpaper
          wallpaper={wallpaper}
          setWallpaper={setWallPaper}
          setShowWallpaper={setShowWallpaper}
        />
      )}

      {showSettings && (
        <Settings
          setShowSettings={setShowSettings}
          theme={theme}
          setTheme={setTheme}
          wallpaper={wallpaper}
          setWallpaper={setWallPaper}
        />
      )}

    </Suspense>
    </main>
  );
};


export default App;