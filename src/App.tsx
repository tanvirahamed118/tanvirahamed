import { useEffect, useState } from "react";
import { ArrowUpRight, Sun, Moon } from "lucide-react";
import { CODE_LINES, ME, SERVICES, STACK, STEPS, WORK } from "./data";
import { CountUp, Reveal } from "./components/Reveal";

type Theme = "dark" | "light";
function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    /* Storage may be unavailable. */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}
function CodeWindow() {
  return (
    <div className="hero-visual">
      <div className="win">
        <div className="window-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="code">
          {CODE_LINES.map((line, index) => (
            <div
              className="code-line"
              style={{ animationDelay: `${0.5 + index * 0.45}s` }}
              key={index}
            >
              {line.kind === "comment" ? (
                <span className="comment">{line.text}</span>
              ) : line.kind === "code" ? (
                <>
                  <span className="keyword">const </span>app = await{" "}
                  <span className="keyword">build</span>
                  {"{"}
                </>
              ) : (
                <>
                  {line.before}
                  <span className="string">{line.highlight}</span>
                  {line.after}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="chip chip-a">
        <span>●</span> React
      </div>
      <div className="chip chip-b">
        <span>●</span> Next.js
      </div>
      <div className="chip chip-c">
        <span>●</span> Node.js
      </div>
    </div>
  );
}
function ProjectMock({ project }: { project: (typeof WORK)[number] }) {
  return (
    <div
      className="mockup"
      style={{ "--project-color": project.color } as React.CSSProperties}
    >
      <div className="screen">
        <div className="screen-nav">
          <b />
          <u />
          <u />
        </div>
        <div className="screen-hero">
          <h4>{project.name}</h4>
          <i />
          <i className="short-line" />
          <em />
        </div>
        <div className="screen-grid">
          <s />
          <s />
          <s />
          <s />
          <s />
          <s />
        </div>
      </div>
    </div>
  );
}
function ServiceTile({ service }: { service: (typeof SERVICES)[number] }) {
  const moveGlow = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--y",
      `${event.clientY - rect.top}px`,
    );
  };
  return (
    <div className="service-tile" onMouseMove={moveGlow}>
      <div className="service-icon">{service.icon}</div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* Ignore unavailable storage. */
    }
  }, [theme]);
  return (
    <>
      <div className="glow glow-one" />
      <div className="glow glow-two" />
      <nav className="site-nav">
        <div className="nav-inner">
          <a href="#top" className="logo" aria-label="Tanvir Ahamed home">
            <img src="/logo.png" alt="Tanvir Ahamed" />
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <button
              className="theme-toggle"
              aria-label="Switch between dark and light theme"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <a className="btn nav-hire" href="#contact">
              Hire me
            </a>
          </div>
        </div>
      </nav>
      <header className="hero" id="top">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="availability">
              <span className="status-dot" />
              Available for new projects
            </div>
            <h1>
              Web apps built to{" "}
              <span className="gradient-text">grow your business.</span>
            </h1>
            <p className="hero-subtitle">
              I’m Tanvir, a Top Rated web application developer with 5+ years of
              experience. I design and build fast, polished products for clients
              in Europe and the USA.
            </p>
            <div className="cta-row">
              <a className="btn" href="#contact">
                Start your project <ArrowUpRight size={18} />
              </a>
              <a className="btn btn-outline" href="#work">
                View my work
              </a>
            </div>
            <div className="trust">
              <b>★★★★★</b>
              <span>Top Rated on Upwork</span>
              <span>40+ projects delivered</span>
            </div>
          </div>
          <CodeWindow />
        </div>
      </header>
      <div className="stats-band">
        <div className="wrap stats-grid">
          <div>
            <CountUp to={5} suffix="+" />
            <small>Years of experience</small>
          </div>
          <div>
            <CountUp to={40} suffix="+" />
            <small>Projects delivered</small>
          </div>
          <div>
            <CountUp to={20} suffix="k+" />
            <small>USD earned on Upwork</small>
          </div>
          <div>
            <b>Top Rated</b>
            <small>Upwork status</small>
          </div>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div>
          {[...STACK, ...STACK].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>
      <section id="services">
        <div className="wrap">
          <Reveal>
            <div className="section-heading">
              <h2>Everything you need to launch and grow online</h2>
              <p>
                From the first idea to a live product, I handle the full build.
              </p>
            </div>
          </Reveal>
          <div className="bento-grid">
            {SERVICES.map((service) => (
              <ServiceTile service={service} key={service.title} />
            ))}
          </div>
        </div>
      </section>
      <section id="work">
        <div className="wrap">
          <Reveal>
            <div className="section-heading">
              <h2>Recent work, live on the web</h2>
              <p>Real products I built for real clients.</p>
            </div>
          </Reveal>
          {WORK.map((project, index) => (
            <div
              className={`project-row ${index % 2 === 1 ? "project-reverse" : ""}`}
              key={project.name}
            >
              <Reveal>
                <ProjectMock project={project} />
              </Reveal>
              <Reveal delay={150}>
                <div className="project-copy">
                  <h3>{project.name}</h3>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <strong>{project.category}</strong>
                  <p>{project.description}</p>
                  <a
                    className="btn btn-outline"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit live site <ArrowUpRight size={17} />
                  </a>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
      <section id="process">
        <div className="wrap">
          <Reveal>
            <div className="section-heading">
              <h2>A simple, predictable process</h2>
              <p>No surprises. You know what happens next at every step.</p>
            </div>
          </Reveal>
          <div className="timeline">
            {STEPS.map((step, index) => (
              <Reveal delay={index * 120} key={step.title}>
                <div className="step">
                  <b>{index + 1}</b>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="contact-section" id="contact">
        <div className="wrap">
          <Reveal>
            <div className="contact-card">
              <h2>Let’s build something great.</h2>
              <p>
                Tell me what you need. I reply within one business day with
                questions and a clear next step.
              </p>
              <div className="cta-row">
                <a className="btn" href={`mailto:${ME.email}`}>
                  Email me <ArrowUpRight size={18} />
                </a>
                <a
                  className="btn btn-outline"
                  href={ME.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hire on Upwork
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <footer>
        <div className="wrap footer-inner">
          <span>© 2026 Tanvir Ahamed</span>
          <span>
            <a href={ME.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{" "}
            ·{" "}
            <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>{" "}
            ·{" "}
            <a href={ME.upwork} target="_blank" rel="noopener noreferrer">
              Upwork
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
