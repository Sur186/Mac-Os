import "./wallpaper.scss";
import { wallpapers } from "../../data/wallpapers";


const Wallpaper = ({
  wallpaper,
  setWallpaper,
  setShowWallpaper,
}) => {

  const handleWallpaper = (image) => {
    setWallpaper(image);
  };

  return (
    <div className="wallpaper-overlay">
      <div className="wallpaper-modal">
        <div className="wallpaper-header">
          <h2>Choose Wallpaper</h2>
          <button onClick={() => setShowWallpaper(false)}>
            ✕
          </button>
        </div>
        <div className="wallpaper-grid">
          {wallpapers.map((item) => {
            const isActive = wallpaper === item.image;
            return (
              <div
                key={item.id}
                className={`wallpaper-card ${
                  isActive ? "active" : ""
                }`}
                onClick={() => handleWallpaper(item.image)}
              >
                <div className="image-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  {isActive && (
                    <span className="active-badge">
                      ✓ Active
                    </span>
                  )}
                </div>
                <p>{item.name}</p>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default Wallpaper;