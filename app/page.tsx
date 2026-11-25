"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, BrainCircuit, BriefcaseBusiness, Check,
  Code2, ExternalLink, FileText, Github,
  GraduationCap, Layers3, Linkedin, Mail, Menu, MonitorCog, Rocket,
  ScanEye, Video, Languages, Gamepad2, LockKeyhole, X,
} from "lucide-react";

type Category = "Web Apps" | "Games" | "AI / ML" | "Systems" | "Embedded" | "Research" | "Mobile Apps";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  categories: Category[];
  style: "blue" | "red" | "green" | "yellow" | "purple" | "cyan";
  art: "dots" | "scene" | "translate" | "snake" | "research" | "study" | "notes" | "todo" | "dragon" | "dragonlume" | "drone" | "brain" | "goals" | "embedded" | "code";
  status?: "In development" | "Prototype";
  image?: string;
  demo?: string;
  github?: string;
  githubPrivate?: boolean;
  details?: string;
};

const featured: Project[] = [
  {
    title: "DOT AI",
    subtitle: "AI-powered visual learning and creation",
    description: "A reusable TypeScript dot-rendering engine and scene player render structured visual content for an evolving AI-assisted learning workspace.",
    tech: ["Next.js", "TypeScript", "AI / LLMs", "Visual Engine"],
    categories: ["Web Apps", "AI / ML"],
    style: "blue", art: "dots", status: "In development",
    github: "https://github.com/Forkan01/dot-ai",
    githubPrivate: true,
  },
  {
    title: "Scene Studio",
    subtitle: "JSON-powered infographic video maker",
    description: "Local-first motion graphics editor with editable charts, vector assets, object and camera keyframes, JSON import/export, and browser-side video export up to 1440p/60 fps.",
    tech: ["Next.js", "TypeScript", "JSON", "Video Export"],
    categories: ["Web Apps"],
    style: "purple", art: "scene",
    github: "https://github.com/Forkan01/SceneStudio",
    githubPrivate: true,
  },
  {
    title: "LearnTranslate",
    subtitle: "German–English visual learning app",
    description: "German–English word and sentence search with structured grammar and example cards, topic browsing, and device-local saved-card management.",
    tech: ["Next.js", "TypeScript", "Supabase", "AI"],
    categories: ["Web Apps", "AI / ML"],
    style: "green", art: "translate", status: "In development",
    github: "https://github.com/Forkan01/learntranslate",
  },
  {
    title: "Deep Reinforcement Learning for Gaming",
    subtitle: "Snake AI local",
    description: "PyTorch Q-learning agent with 11 state inputs, three possible actions, experience replay, and score tracking during self-play training.",
    tech: ["Python", "PyTorch", "Deep RL", "Pygame"],
    categories: ["AI / ML", "Games"],
    style: "red", art: "snake",
    github: "https://github.com/Forkan01/Automatic-Game-Playing-with-DL--Autonomous-Sys.-B",
  },
  {
    title: "Autonomous Driving Research",
    subtitle: "GAIA-X · CARLA · ROS / ROS2",
    description: "Research work with Python/JavaScript routing, OpenStreetMap simulations, vehicle meeting-point and parking workflows, plus CARLA and ROS/ROS2 experience.",
    tech: ["Python", "C++", "CARLA", "ROS2"],
    categories: ["Research", "Systems", "AI / ML"],
    style: "green", art: "research",
    github: "https://github.com/Forkan01/HSHL_Research",
    details: "#research",
  },
  {
    title: "Studly Prototype",
    subtitle: "Student productivity platform",
    description: "A student-focused product prototype bringing study management and productivity tools into an approachable experience.",
    tech: ["Web App", "Student Tools", "Product Design"],
    categories: ["Web Apps"],
    style: "yellow", art: "study", status: "Prototype",
    demo: "https://studly-everything-student-needs.lovable.app/",
  },
  {
    title: "DragonLume",
    subtitle: "Cute 3D dragon life & adventure game",
    description: "Godot 3D prototype with character selection, third-person movement, a floating island, a following baby dragon, and early feeding and bonding mechanics.",
    tech: ["3D Game", "Game Design", "Godot", "Characters"],
    categories: ["Games"],
    style: "purple", art: "dragonlume", status: "In development",
    github: "https://github.com/Forkan01/Dragonlume",
    githubPrivate: true,
  },
];

const moreProjects: Project[] = [
  {
    title: "Note Taking App", subtitle: "Mobile notes and cloud storage",
    description: "React Native/Expo app with sign-up, sign-in, user-specific note creation and deletion, and persistent Supabase storage.",
    tech: ["React Native", "Expo", "Supabase"],
    categories: ["Mobile Apps", "Web Apps"],
    style: "blue", art: "notes",
    github: "https://github.com/Forkan01/Note-Taking-App-with-React-Native",
  },
  {
    title: "Todo Flutter", subtitle: "Cross-platform task manager",
    description: "Dart/Flutter task-list app with a simple interface for adding and deleting tasks.",
    tech: ["Flutter", "Dart", "Mobile"],
    categories: ["Mobile Apps"],
    style: "cyan", art: "todo", image: "/projects/todo-flutter.png",
    github: "https://github.com/Forkan01/Todo_Flutter",
  },
  {
    title: "Dragon Slayer", subtitle: "2D fantasy action platformer",
    description: "Godot pixel-art action platformer with movement, enemy and collision systems, and collectible coins.",
    tech: ["Godot", "2D Game", "GDScript"],
    categories: ["Games"],
    style: "purple", art: "dragon",
    github: "https://github.com/Forkan01/Dragon-Slayer-GODOT",
  },
  {
    title: "Drone Farming AI", subtitle: "Plant and weed detection",
    description: "Team coursework on deep-learning model training and verification for agricultural plant and weed detection.",
    tech: ["Deep Learning", "Computer Vision", "Drone"],
    categories: ["AI / ML", "Research", "Embedded"],
    style: "green", art: "drone",
    github: "https://github.com/Forkan01/Autonomous-Systems-B-Lab_Group-D",
  },
  {
    title: "Brain Boost Prototype", subtitle: "AI puzzle app prototype",
    description: "An interactive puzzle and learning-oriented app concept.",
    tech: ["App Prototype", "AI", "Learning"],
    categories: ["Web Apps", "AI / ML"],
    style: "red", art: "brain", status: "Prototype",
    demo: "https://brainboost.lovable.app",
  },
  {
    title: "Solo Leveling Prototype", subtitle: "Personal goals and challenges",
    description: "A gamified daily-goal app prototype.",
    tech: ["App Prototype", "Gamification"],
    categories: ["Web Apps", "Games"],
    style: "purple", art: "goals", status: "Prototype",
    demo: "https://quest-for-life-ai.lovable.app/",
  },
  {
    title: "Precision Farming Robot", subtitle: "Embedded robotics project",
    description: "Team engineering project for an agricultural robot.",
    tech: ["Robotics", "Embedded", "Engineering"],
    categories: ["Embedded", "Systems"],
    style: "yellow", art: "embedded",
    github: "https://github.com/Neaz145126/Team-4",
  },
  {
    title: "Snake Game in C", subtitle: "Classic game programming",
    description: "Team C programming project implementing classic Snake gameplay.",
    tech: ["C", "Game Development"],
    categories: ["Games", "Systems"],
    style: "cyan", art: "code",
    github: "https://github.com/Forkan01/SnakeGame-with-C_CS2",
  },
];

const filters = ["All", "Web Apps", "Games", "AI / ML", "Systems", "Embedded", "Research", "Mobile Apps"] as const;
type Filter = (typeof filters)[number];
const skillGroups = [
  { title: "Languages", icon: Code2, color: "blue", items: ["Python", "TypeScript", "JavaScript", "C / C++", "Dart", "Kotlin", "SQL", "GDScript"] },
  { title: "Apps & Web", icon: Layers3, color: "green", items: ["Next.js", "React", "React Native", "Expo", "Flutter", "Supabase", "REST APIs"] },
  { title: "AI & Data", icon: BrainCircuit, color: "red", items: ["Deep Learning", "Reinforcement Learning", "Computer Vision", "LLM APIs", "Data Processing"] },
  { title: "Systems & Tools", icon: MonitorCog, color: "yellow", items: ["Linux", "Git", "Docker", "ROS / ROS2", "CARLA", "Godot", "Unity"] },
];

function ProjectArt({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={"project-art art-" + project.art + (project.image && !failed ? " has-screenshot" : "")}>
      <div className="art-fallback" aria-hidden="true">
        <span className="art-corner">{project.art === "snake" ? "AI / TRAINING" : project.art === "research" ? "SENSORS / SIMULATION" : "BUILD / CREATE"}</span>
        {project.art === "dots" && <div className="demo-interface"><span className="demo-sidebar">✦<br/>◻<br/>◎<br/>⌘</span><div className="demo-canvas"><Rocket size={58} strokeWidth={1.6}/><i className="dot dot-a"/><i className="dot dot-b"/><i className="dot dot-c"/></div><span className="demo-tools">Generate<br/>Modify<br/>Explore</span></div>}
        {project.art === "scene" && <div className="scene-art"><div className="scene-preview"><Video size={32} strokeWidth={1.5}/><span>Infographic scenes</span><div className="scene-shapes"><i/><i/><i/></div></div><div className="scene-timeline"><span>SCENE 01</span><div><i/><i/><i/></div><small>00:08</small></div></div>}
        {project.art === "translate" && <div className="translate-art"><span className="translate-kicker">DEUTSCH ↔ ENGLISH</span><strong>lernen <span>→</span> learn</strong><p>verb · to acquire knowledge</p><div><span>Meaning</span><span>Grammar</span><span>Examples</span></div></div>}
        {project.art === "dragonlume" && <div className="dragonlume-art"><span>🐲</span><b>DragonLume</b><small>3D GAME · IN DEVELOPMENT</small></div>}
        {project.art === "snake" && <div className="snake-demo"><div className="snake-board">{Array.from({length: 70}, (_, i) => <span key={i} className={[10,11,12,22,32,42,43,44,45].includes(i) ? "snake-bit" : i === 52 ? "snake-food" : ""}/>)}</div><div className="snake-score">SCORE <strong>024</strong><small>MODEL: DQN</small><span className="score-line"/></div></div>}
        {project.art === "research" && <div className="research-art"><div className="radar radar-1"/><div className="radar radar-2"/><ScanEye size={44}/><span className="car-icon">🚘</span><span className="sensor-label">OBJECT DETECTED</span></div>}
        {project.art === "study" && <div className="study-art"><span>My workspace</span><div className="study-metrics"><b>04<small>Learning paths</small></b><b>12<small>Tasks complete</small></b><b>85%<small>Progress</small></b></div><div className="study-bars"><i/><i/><i/></div></div>}
        {project.art === "notes" && <div className="note-art"><FileText size={46}/><div><b>My Notes</b><span>Capture ideas, anywhere</span><i/><i/><i/></div></div>}
        {project.art === "todo" && <div className="todo-art"><span><Check size={17}/> Plan portfolio</span><span><Check size={17}/> Build a new app</span><span><Check size={17}/> Keep learning</span></div>}
        {project.art === "dragon" && <div className="emoji-art">🐉<small>DRAGON SLAYER</small></div>}
        {project.art === "drone" && <div className="emoji-art">🚁<small>PLANT DETECTION</small></div>}
        {project.art === "brain" && <div className="emoji-art">🧠<small>BRAIN BOOST</small></div>}
        {project.art === "goals" && <div className="emoji-art">⚡<small>DAILY CHALLENGES</small></div>}
        {project.art === "embedded" && <div className="emoji-art">🤖<small>FARMING ROBOT</small></div>}
        {project.art === "code" && <div className="emoji-art"><Code2 size={46}/><small>C PROGRAMMING</small></div>}
      </div>
      {project.image && !failed && (
        // This is an existing local asset where available; the CSS artwork remains a fallback.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="project-art-image"
          src={project.image}
          alt={project.title + " application screenshot"}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      {(!project.image || failed) && <span className="preview-note">Illustration</span>}
      {project.image && !failed && <span className="screenshot-note">App screenshot</span>}
    </div>
  );
}

function IconLink({ href, children, primary = false, privateRepo = false }: { href: string; children: React.ReactNode; primary?: boolean; privateRepo?: boolean }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={"project-link" + (primary ? " project-link-primary" : "") + (privateRepo ? " project-link-private" : "")}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      title={privateRepo ? "Private GitHub repository — access requires permission" : undefined}
    >
      {children} {privateRepo && <LockKeyhole size={13} aria-label="Private repository" />}
      {external ? <ArrowUpRight size={15} /> : <ArrowRight size={15} />}
    </a>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const Icon = [Rocket, Video, Languages, BrainCircuit, ScanEye, GraduationCap, Gamepad2][index];
  return (
    <article className={"featured-card tone-" + project.style}>
      <div className="featured-category"><span className="category-icon"><Icon size={18}/></span><span>{["AI + SOFTWARE ENGINEERING", "INFOGRAPHICS + VIDEO", "EDTECH + LANGUAGES", "ALGORITHMS + AI", "RESEARCH + SYSTEMS", "EDTECH + PRODUCT", "GAME DEVELOPMENT"][index]}</span></div>
      <h3>{project.title}</h3>
      <p className="project-subtitle">{project.subtitle}</p>
      {project.status && <span className="project-status">{project.status}</span>}
      <ProjectArt project={project}/>
      <p className="featured-description">{project.description}</p>
      <div className="tech-tags">{project.tech.map(t => <span key={t}>{t}</span>)}</div>
      <div className="project-actions">
        {project.demo && <IconLink href={project.demo} primary>Live Demo</IconLink>}
        {project.details && <IconLink href={project.details} primary>Experience</IconLink>}
        {project.github && <IconLink href={project.github} primary={!project.demo && !project.githubPrivate} privateRepo={project.githubPrivate}><Github size={15} /> {project.githubPrivate ? "GitHub (private)" : "GitHub"}</IconLink>}
      </div>
    </article>
  );
}

function MiniCard({ project }: { project: Project }) {
  return (
    <article className="mini-card">
      <ProjectArt project={project}/>
      <div className="mini-content">
        <h3>{project.title}</h3>
        {project.status && <span className="mini-status">{project.status}</span>}
        <p>{project.subtitle}</p>
        <p className="mini-description">{project.description}</p>
        <div className="mini-bottom">
          <div className="mini-tags">{project.tech.slice(0, 3).map(t => <span key={t}>{t}</span>)}</div>
          <div className="mini-links">
            {project.demo && <a href={project.demo} aria-label={"Open " + project.title + " live demo"} target="_blank" rel="noopener noreferrer"><ExternalLink size={14}/><span>Demo</span></a>}
            {project.github && <a href={project.github} aria-label={"Open " + project.title + " GitHub repository"} target="_blank" rel="noopener noreferrer"><Github size={14}/><span>GitHub</span></a>}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<Filter>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileFallback, setProfileFallback] = useState(false);
  const visibleProjects = moreProjects.filter(p => filter === "All" || p.categories.includes(filter));
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("mobile-menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  const navLinks = [
    ["About", "#about"], ["Projects", "#projects"], ["Skills", "#skills"],
    ["Experience", "#experience"], ["Contact", "#contact"],
  ];

  return (
    <>
      <a className="skip-link" href="#home">Skip to content</a>
      <header className="site-header">
        <div className="site-container header-inner">
          <a className="logo" href="#home" aria-label="Abdullah Al Forkan homepage"><span className="logo-symbol">AF<span>.</span></span><span className="logo-name">Abdullah Al Forkan</span></a>
          <nav id="primary-navigation" className={menuOpen ? "site-nav nav-open" : "site-nav"} aria-label="Main navigation">
            {navLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
          <a className="nav-cta" href="mailto:Abdullah-al.forkan@stud.hshl.de?subject=Portfolio%20inquiry">Let&apos;s connect <ArrowUpRight size={16}/></a>
          <button id="mobile-menu-toggle" className="mobile-menu-button" type="button" aria-controls="primary-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button>
        </div>
      </header>
      <main id="home" tabIndex={-1}>

      <section className="hero-wrapper" id="about" aria-labelledby="hero-title">
        <div className="hero site-container">
          <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot"/> BUILD · LEARN · IMPROVE</div>
          <h1 id="hero-title">Hi, I&apos;m <span>Abdullah Al Forkan</span></h1>
          <p className="hero-role">Software Developer <span>·</span> AI Enthusiast <span>·</span> Game Developer</p>
          <p className="hero-desc">I'm an Electronic Engineering student at Hochschule Hamm-Lippstadt, Germany. I build practical software, visual AI tools, learning apps and games — bringing engineering research and creative ideas together.</p>
          <div className="hero-links">
            <a href="https://github.com/Forkan01" target="_blank" rel="noopener noreferrer"><Github size={17}/> GitHub</a>
            <a href="https://www.linkedin.com/in/forkan02/" target="_blank" rel="noopener noreferrer"><Linkedin size={17}/> LinkedIn</a>
            <a href="mailto:Abdullah-al.forkan@stud.hshl.de"><Mail size={17}/> Email</a>
          </div>
        </div>
        <div className="hero-visual">
          <span className="hero-orbit hero-orbit-outer"/><span className="hero-orbit hero-orbit-inner"/>
          <span className="hero-spark spark-1">✦</span><span className="hero-spark spark-2">✧</span><span className="hero-spark spark-3">+</span>
          <div className="hero-photo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profileFallback ? "https://avatars.githubusercontent.com/u/72549235?v=4" : "/CVpic.png"} onError={() => setProfileFallback(true)} alt="Abdullah Al Forkan" fetchPriority="high" decoding="async" className={profileFallback ? "hero-photo hero-photo-avatar" : "hero-photo"}/>
          </div>
          <div className="hero-sticker sticker-one"><Code2 size={18}/> Software</div>
          <div className="hero-sticker sticker-two"><BrainCircuit size={17}/> AI &amp; research</div>
        </div>
        </div>
        <div className="site-container hero-highlights" aria-label="About me at a glance">
          <div className="hero-fact"><span className="hero-fact-icon"><GraduationCap size={19}/></span><div><strong>Electronic Engineering</strong><span>B.Eng. (in progress) · Hochschule Hamm-Lippstadt</span></div></div>
          <div className="hero-fact"><span className="hero-fact-icon"><ScanEye size={19}/></span><div><strong>Research background</strong><span>GAIA-X · Autonomous driving · ROS2</span></div></div>
          <div className="hero-fact"><span className="hero-fact-icon"><Code2 size={19}/></span><div><strong>Building across disciplines</strong><span>Software · AI · Learning · Games</span></div></div>
        </div>
      </section>

      <section className="section featured-section" id="projects" aria-labelledby="featured-title">
        <div className="site-container">
          <div className="section-heading featured-heading">
            <div><span className="section-label">PROJECTS</span><h2 id="featured-title">Featured <em>Projects</em></h2>
              <p>Featured projects in software, AI, video creation, research, learning and game development.</p></div>
            <div className="heading-scribble"><span>Different projects.<br/>One passion.<br/>Building useful things.</span><ArrowRight size={27}/></div>
          </div>
          <div className="featured-grid">{featured.map((p,i) => <FeaturedCard key={p.title} project={p} index={i}/>)}</div>
          <p className="repo-visibility-note"><LockKeyhole size={13} /> Private GitHub repositories can only be viewed by authorized accounts.</p>
        </div>
      </section>

      <section className="section more-section" aria-labelledby="more-title">
        <div className="site-container">
          <div className="more-heading">
            <div className="more-title-wrap"><span className="four-squares"><i/><i/><i/><i/></span><div><h2 id="more-title">More <em>Projects</em></h2><p>More apps, prototypes, games and engineering work.</p></div></div>
            <div className="filter-list" role="group" aria-label="Filter projects by category">{filters.map(f => <button key={f} type="button" aria-pressed={filter === f} className={filter === f ? "filter-chip active" : "filter-chip"} onClick={() => setFilter(f)}>{f}</button>)}</div>
          </div>
          <p className="sr-only" role="status">{visibleProjects.length} projects shown</p>
          {visibleProjects.length ? <div className="more-grid">{visibleProjects.map(p => <MiniCard key={p.title} project={p}/>)}</div> : <p className="empty-projects">No projects in this category yet.</p>}
          <a className="all-projects-link" href="https://github.com/Forkan01" target="_blank" rel="noopener noreferrer">Explore all my GitHub repositories <ArrowUpRight size={17}/></a>
        </div>
      </section>

      <section className="section skills-section" id="skills" aria-labelledby="skills-title">
        <div className="site-container">
          <div className="section-heading"><div><span className="section-label">TOOLBOX</span><h2 id="skills-title">Skills &amp; <em>Technologies</em></h2><p>Tools and technologies I use across coding, engineering and experimentation.</p></div></div>
          <div className="skills-grid">{skillGroups.map(group => <article key={group.title} className={"skill-card skill-" + group.color}><div className="skill-card-heading"><span className="skill-icon"><group.icon size={21}/></span><h3>{group.title}</h3></div><div className="skill-chips">{group.items.map(s => <span key={s}>{s}</span>)}</div></article>)}</div>
        </div>
      </section>

      <section className="section experience-section" id="experience" aria-labelledby="experience-title">
        <div className="site-container"><div className="section-heading"><div><span className="section-label">BACKGROUND</span><h2 id="experience-title">Education &amp; <em>Experience</em></h2><p>Research-driven engineering with hands-on software projects.</p></div></div>
          <div className="experience-grid">
            <article className="experience-card" id="research"><span className="experience-icon"><BriefcaseBusiness size={23}/></span><div><span className="experience-date">JUN 2024 — JUN 2025</span><h3>Student Research Assistant</h3><strong>Hochschule Hamm-Lippstadt · GAIA-X / Autonomous Driving</strong><p>Worked with Python, C/C++, SQL, sensor and geodata, simulation workflows and autonomous-driving technologies including CARLA and ROS / ROS2.</p></div></article>
            <article className="experience-card"><span className="experience-icon"><GraduationCap size={23}/></span><div><span className="experience-date">B.ENG. · IN PROGRESS</span><h3>Electronic Engineering</h3><strong>Hochschule Hamm-Lippstadt, Germany</strong><p>Engineering foundation across programming, embedded systems, signal processing and applied systems development.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact" aria-labelledby="contact-title">
        <div className="site-container contact-inner"><div><span className="section-label">LET'S CONNECT</span><h2 id="contact-title">Have an idea or <em>opportunity?</em></h2><p>I'm interested in software engineering, AI and applied research opportunities — and in meeting people who love building things.</p></div><a className="contact-button" href="mailto:Abdullah-al.forkan@stud.hshl.de?subject=Hello%20from%20your%20portfolio"><Mail size={19}/> Send me an email <ArrowUpRight size={18}/></a></div>
      </section>

      </main>
      <footer className="site-footer"><div className="site-container footer-inner"><span><strong>AF<span className="blue-dot">.</span></strong> © {new Date().getFullYear()} Abdullah Al Forkan</span><span>Built with curiosity <span className="footer-spark">✦</span></span><div><a href="https://github.com/Forkan01" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={19}/></a><a href="https://www.linkedin.com/in/forkan02/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={19}/></a><a href="mailto:Abdullah-al.forkan@stud.hshl.de" aria-label="Email"><Mail size={19}/></a></div></div></footer>
    </>
  );
}
