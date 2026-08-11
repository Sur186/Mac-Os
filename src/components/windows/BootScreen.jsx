import "./bootscreen.scss";

const BootScreen = () => {
  return (
    <div className="boot-screen">
      <div className="boot-content">
        <img
          src="/doc-icons/logo.webp"
          alt="DeveloperOS Logo"
        />
        <h1>Dev Puri OS</h1>
        <p>Interactive React Portfolio...</p>
        <div className="loader">
          <div className="loader-fill"></div>
        </div>
        <span>Version 1.0.0</span>
      </div>
    </div>
  );
};

export default BootScreen;