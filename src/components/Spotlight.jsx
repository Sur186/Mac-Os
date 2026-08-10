import { useState } from 'react';
import './spotlight.scss'
import './dock.scss'

const apps = [
  { id:"github",icon: "/doc-icons/github.svg", name: "Github"},
  { id:"developer",icon: "/doc-icons/developer.svg", name: "developer"},
  { id:"note",icon: "/doc-icons/note.svg", name: "Notes" },
  { id:"pdf",icon: "/doc-icons/pdf.svg", name: "Resume",  },
  { id:"spotify",icon: "/doc-icons/spotify.svg", name: "Spotify"},
  { id:"cli",icon: "/doc-icons/cli.svg", name: "Terminal"},
];

const Spotlight = ({setWindowsState, setActiveWindow, setShowSpotlight}) => {
  const [search, setSearch] = useState("")
   const [activeIndex, setActiveIndex] = useState(0) 
  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(search.trim().toLowerCase())
);

const openWindow = (appID)=>{
setWindowsState(prev => ({ ...prev, [appID]:{...prev[appID],open:true, minimized:false}  }))
    setActiveWindow(appID)
    setSearch("")
    setActiveIndex(0)
    setShowSpotlight(false)

} 

const handleKeyDown = (e) =>{
  if(filteredApps.length === 0)return;
  if(e.key === "ArrowDown"){
   e.preventDefault();
   setActiveIndex(prev =>(prev + 1) % filteredApps.length);
  }
  else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + filteredApps.length) % filteredApps.length);
    }
    else if (e.key === "Enter") {
      const selectedApp = filteredApps[activeIndex];
      if (selectedApp) {
        openWindow(selectedApp.id);
      }
    }
    if(e.key==="Escape"){
    setShowSpotlight(false)
}
}


  return (
    <div className="spotlight-overlay">
    <div className="spotlight">
        <div className="search-box">
            <i className="ri-search-line"></i>
            <input type='text' placeholder='Search Application....' value={search}
            onChange={(e)=>{
              setSearch(e.target.value);
              setActiveIndex(0)
            }}
              onKeyDown={handleKeyDown}
              autoFocus
            />
        </div>
        <div className="results">
          {filteredApps.map((app, index)=>(
            <div onClick={()=>{
              openWindow(app.id)}} 
            className={`result ${index === activeIndex ? "active" : "" } `} key={app.id}>
              <img className={`${app.id}`} src={app.icon} alt={app.name} />
              <h3>{app.name}</h3>
            </div>
          ))}
        </div>
    </div>
</div>
  )
}

export default Spotlight