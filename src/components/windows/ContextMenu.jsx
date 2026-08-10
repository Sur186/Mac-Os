import "./contextmenu.scss";

const menuItems = [
  {
    id: "new-folder",
    icon: "📁",
    title: "New Folder",
  },
  {
    id: "wallpaper",
    icon: "🖼",
    title: "Change Wallpaper",
  },
  {
    id: "settings",
    icon: "⚙",
    title: "Settings",
  },
  {
    id: "refresh",
    icon: "🔄",
    title: "Refresh",
  },
];

const ContextMenu = ({
  position,
  setShowWallpaper,
  setShowSettings,
  onRefresh,
  onCreateFolder,
}) => {
  const handleMenuClick = (id) => {
    switch (id) {
      case "new-folder":
        onCreateFolder();
        break;

      case "wallpaper":
        setShowWallpaper(true);
        break;

      case "settings":
        setShowSettings(true);
        break;

      case "refresh":
        onRefresh();
        break;

      default:
        break;
    }
  };

  return (
    <div
      className="context-menu"
      style={{
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: 9999,
      }}
    >
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="item"
          onClick={() => handleMenuClick(item.id)}
        >
          <span>{item.icon}</span>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;