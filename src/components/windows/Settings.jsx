import { useState } from "react";
import "./setting.scss";
import { wallpapers } from "../../data/wallpapers";



const Settings = ({ setShowSettings, theme, setTheme, wallpaper, setWallpaper, }) => {
  const [activeTab, setActiveTab] = useState("appearance");
  return (
    <div className="settings-overlay">
      <div className="settings">

        {/* Header */}
        <div className="settings-header">
          <h2>Settings</h2>
          <button onClick={() => setShowSettings(false)}>
            ✕
          </button>
        </div>


        {/* Body */}
        <div className="settings-body">

          {/* Sidebar */}
          <aside className="settings-sidebar">
            <button
              className={activeTab === "appearance" ? "active" : ""}
              onClick={() => setActiveTab("appearance")}
            >
              🎨 Appearance
            </button>
            <button
              className={activeTab === "wallpaper" ? "active" : ""}
              onClick={() => setActiveTab("wallpaper")}
            >
              🖼️ Wallpaper
            </button>
            <button
              className={activeTab === "about" ? "active" : ""}
              onClick={() => setActiveTab("about")}
            >
              👤 About
            </button>
          </aside>

          {/* Content */}
          <section className="settings-content">
            {/* Appearance */}
            {activeTab === "appearance" && (
              <>
                <h3>Appearance</h3>
                <p>
                  Customize your desktop experience.
                </p>
                <div className="theme-options">
                  <button
                    className={theme === "dark" ? "selected" : ""}
                    onClick={() => setTheme("dark")}
                  >
                    <span className="theme-icon">🌙</span>
                    <span>Dark</span>
                    {theme === "dark" && (
                      <span className="check">✓</span>
                    )}
                  </button>
                  <button
                    className={theme === "light" ? "selected" : ""}
                    onClick={() => setTheme("light")}
                  >
                    <span className="theme-icon">☀️</span>
                    <span>Light</span>
                    {theme === "light" && (
                      <span className="check">✓</span>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Wallpaper */}
            {activeTab === "wallpaper" && (
              <>
                <h3>Wallpaper</h3>
                <p>
                  Choose your desktop wallpaper.
                </p>
                <div className="settings-wallpapers">
                 {wallpapers.map((item) => (
                    <div
                       key={item.id}
                       className={`wallpaper-card ${
                   wallpaper === item.image ? "selected" : ""
                        }`}
                 onClick={() => setWallpaper(item.image)}
                     >
          <div className="wallpaper-image">
            <img
              src={item.image}
              alt={item.name}
            />
            {wallpaper === item.image && (
              <span className="wallpaper-check">
                ✓
              </span>
            )}
          </div>
          <span className="wallpaper-name">
            {item.name}
          </span>
        </div>
      ))}
    </div>
              </>
            )}


            {/* About */}
   {activeTab === "about" && (
    <div className="about-section">
    <div className="about-profile">
      <div className="about-avatar">SP</div>
      <div className="about-info">
        <h3>Surendra Puri</h3>
        <p className="role">WordPress Developer</p>
        <span className="experience">
          3+ Years Experience
        </span>
      </div>
    </div>
    <div className="about-divider"></div>
    <div className="about-details">
      <h4>About Me</h4>
      <p>I build modern, responsive and high-performance websites with WordPress and modern web technologies.</p>
    </div>
    <div className="skills">
      <span>WordPress</span>
      <span>WooCommerce</span>
      <span>PHP</span>
      <span>JavaScript</span>
      <span>React</span>
      <span>SCSS</span>
    </div>
    <div className="portfolio-info">
      <span>Portfolio OS</span>
      <span>v1.0</span>
    </div>
  </div>
)}
        </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;