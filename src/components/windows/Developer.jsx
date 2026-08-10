import MacWindow from "./MacWindow";
import "./developer.scss";


const skillCategories = [
  {
    id: 1,
    title: "WordPress & CMS",
    skills: [
      "WordPress",
      "Elementor",
      "ACF Pro",
      "WooCommerce",
      "CPT UI",
    ],
  },
  {
    id: 2,
    title: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "React",
    ],
  },
  {
    id: 3,
    title: "Backend",
    skills: [
      "PHP",
      "MySQL",
    ],
  },
  {
    id: 4,
    title: "Tools",
    skills: [
      "Git",
      "GitHub",
      "Figma",
      "FileZilla",
      "Asana",
      "Slack"
    ],
  },
];

const projects = [
  {
    id: 1,
    name: "Air Concept",
    category: "Business Website",
    url: "https://airconcept.co.in/",
  },
  {
    id: 2,
    name: "Econo Envelope",
    category: "E-Commerce",
    url: "https://www.econoenvelope.com/",
  },
  {
    id: 3,
    name: "Haven Group SF",
    category: "Real Estate",
    url: "https://havengroupsf.intersectwp.com/",
  },
  {
    id: 4,
    name: "Han Jim Callister",
    category: "Real Estate",
    url: "https://hanjimcallister.com/",
  },
  {
    id: 5,
    name: "RM&D Nevada",
    category: "Business Website",
    url: "https://rmdnevada.com/",
  },
  {
    id: 6,
    name: "FCPL",
    category: "Corporate Website",
    url: "https://fcpl-website.vercel.app/",
  },
  {
    id: 7,
    name: "ECCU",
    category: "Education",
    url: "https://www.eccu.edu/",
  },
  {
    id: 8,
    name: "Sleep Shop VA",
    category: "E-Commerce",
    url: "https://sleepshopva.com/",
  },
  {
    id: 9,
    name: "ECCU Web Demo",
    category: "Education",
    url: "https://eccu.webdemos.co.in/",
  },
  {
    id: 10,
    name: "MMV Mumbaiya",
    category: "Business Website",
    url: "https://ca.mmvmumbaiya.com/",
  },
  {
    id: 11,
    name: "Miller's Ale House",
    category: "Restaurant",
    url: "https://millersstaging.wpengine.com/",
  },
];


const Developer = ({
  windowName,
  windowsState,
  setWindowsState,
  activeWindow,
  setActiveWindow,
}) => {
  return (
    <MacWindow
      windowName={windowName}
      windowsState={windowsState}
      setWindowsState={setWindowsState}
      activeWindow={activeWindow}
      setActiveWindow={setActiveWindow}
    >
      <div className="developer-content">

        {/* Profile */}
        <section className="developer-profile">
          <div className="profile-avatar">
            👨‍💻
          </div>
          <div className="profile-info">
            <h1>Surendra Puri</h1>
            <p className="role">
              WordPress Developer
            </p>
            <p className="experience">
              3+ Years of Professional Experience
            </p>
          </div>
        </section>


        {/* Quick Facts */}
        <section className="quick-facts">
          <h2>⚡ Quick Facts</h2>
          <div className="facts-grid">
            <div className="fact">
              <strong>3+</strong>
              <span>Years Experience</span>
            </div>
            <div className="fact">
              <strong>WordPress</strong>
              <span>Primary Expertise</span>
            </div>
            <div className="fact">
              <strong>WooCommerce</strong>
              <span>E-Commerce</span>
            </div>
            <div className="fact">
              <strong>ACF</strong>
              <span>Custom Content</span>
            </div>
          </div>
        </section>

        {/* Tech Stack */}

<section className="tech-stack">
  <h2>🛠 Tech Stack</h2>
  <div className="skill-categories">
    {skillCategories.map((category) => (
      <div
        className="skill-category"
        key={category.id}
      >
        <h3>{category.title}</h3>
        <div className="skills">
          {category.skills.map((skill) => (
            <span
              className="skill"
              key={skill}
            >
              {skill}
            </span>

          ))}
        </div>
      </div>
    ))}
  </div>
       </section>

       {/* Featured Projects */}

        <section className="projects-section">
         <div className="section-header">
         <h2>🚀 Featured Projects</h2>
    <span>
      {projects.length} Projects
    </span>
  </div>

  <div className="projects-grid">
    {projects.map((project) => (
      <div
        className="project-card"
        key={project.id}
      >
        <div className="project-info">
          <h3>{project.name}</h3>
          <span>
            {project.category}
          </span>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          View Project ↗
        </a>
      </div>
    ))}

  </div>
        </section>

        {/* Connect */}

        <section className="connect-section">
  <h2>🔗 Connect With Me</h2>
  <div className="connect-links">
    <a
      href="https://github.com/Sur186/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>🐙</span>
      <div>
        <strong>GitHub</strong>
        <small>View my code</small>
      </div>
      <span>↗</span>
    </a>

    <a
      href="https://www.linkedin.com/in/surendragoswami97/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>💼</span>
      <div>
        <strong>LinkedIn</strong>
        <small>Connect with me</small>
      </div>
      <span>↗</span>
    </a>
    <a
      href="mailto:surendrapuri5121@gmail.com"
    >
      <span>✉️</span>
      <div>
        <strong>Email</strong>
        <small>Send me an email</small>
      </div>
      <span>↗</span>
    </a>
  </div>
        </section>
      </div>
    </MacWindow>
  );
};

export default Developer;