"use client";

import { useEffect, useRef, useState } from "react";

const PHRASES = ["AI-Assisted Full-Stack Developer", "OSINT Researcher", "Hackathon Builder"];

const PROJECTS = [
  {
    title: "Pragya AI",
    desc: "An AI chat workspace with four Indian Knowledge System personas — Veda, Neeti, Ganita and Sarathi — answering from classical Indian wisdom in Hindi, Hinglish and English. Exhibited at the Medicaps University IKS Exhibition, where real users picked it over generic AI answers.",
    tags: ["Supabase", "Gemini + Groq"],
    link: "https://pragyaai.yashx.xyz",
    live: true,
  },
  {
    title: "DigiShala — ERP",
    desc: "A comprehensive cloud-based school management system tailored for Tier-2/3 institutions, featuring real-time databases and secure admin dashboards for principals, teachers and parents.",
    tags: ["HTML/CSS", "Firebase"],
    link: "https://digishala.netlify.app",
    live: true,
  },
  {
    title: "X-Vault — SecretLink",
    desc: "A fast, end-to-end encrypted secret messenger: create a private payload, share one link, and the message reveals itself only to the person holding it. Built for confidentiality with a streamlined UI.",
    tags: ["Web Utility", "Security", "E2E"],
    link: "https://secretlinkx.netlify.app/",
    live: true,
  },
  {
    title: "EBVM Digital Portal",
    desc: "Digitized the information system for the School of Excellence Bal Vinay Mandir, Indore — with a custom Hindi/English language toggle so parents and students can use it in their own language.",
    tags: ["UI/UX", "Bilingual"],
    link: "https://ebvmindore.netlify.app/",
    live: true,
  },
  {
    title: "Voice-Controlled AI Car",
    desc: "My school project from Class 12: a WiFi-connected car built on ESP32 modules with DC motors, a motor driver/controller and a battery pack — fully voice-controlled, and it could even talk back and interact with us.",
    tags: ["ESP32", "IoT", "Voice Control"],
    link: null,
    live: false,
  },
];

const HACKS = [
  {
    tag: "36 Hours · Offline",
    title: "Void Hack(s) 8.0",
    desc: "A 36-hour offline hackathon at SVVV College, Indore, organised in collaboration with the Indore Police Commissionerate — built on a real-world problem statement under serious time pressure.",
  },
  {
    tag: "Online",
    title: "Cybercrime Hackathon, Bihar",
    desc: "Participated online — the problem statement here was the same one as Void Hack(s) 8.0.",
  },
  {
    tag: "Internal Round Qualified",
    title: "Smart India Hackathon",
    desc: "Competed in the world's biggest open innovation model at college level and qualified the internal round held at my college.",
  },
  {
    tag: "Inter-College",
    title: "Code-E-Fiesta",
    desc: "Participated in the Code-E-Fiesta inter-college hackathon hosted at Medicaps University — my own campus.",
  },
];

export default function Portfolio() {
  const [typed, setTyped] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ sending: false, msg: "", ok: false });
  const dotRef = useRef(null);
  const trailRef = useRef(null);

  /* Particle-trail cursor: glowing traces follow the movement and fade out */
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot = dotRef.current;
    const canvas = trailRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = ["#ff4b1f", "#ff4b1f", "#ff4b1f", "#16130e", "#ffb59f"];
    const pts = [];
    let lastX = null, lastY = null, raf, lastT = performance.now();

    const spawn = (x, y) => {
      pts.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.12,
        life: 1,
        size: 2 + Math.random() * 3.6,
        color: COLORS[(Math.random() * COLORS.length) | 0],
      });
      if (pts.length > 110) pts.splice(0, pts.length - 110);
    };

    const move = (e) => {
      const x = e.clientX, y = e.clientY;
      if (dot) dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (lastX === null) { lastX = x; lastY = y; spawn(x, y); return; }
      const dist = Math.hypot(x - lastX, y - lastY);
      const steps = Math.min(10, Math.max(1, Math.floor(dist / 7)));
      for (let i = 1; i <= steps; i++) spawn(lastX + ((x - lastX) * i) / steps, lastY + ((y - lastY) * i) / steps);
      lastX = x; lastY = y;
    };

    const loop = (t) => {
      const dt = Math.min(50, t - lastT); lastT = t;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.life -= dt / 620;
        if (p.life <= 0) { pts.splice(i, 1); continue; }
        p.x += p.vx; p.y += p.vy;
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.shadowBlur = 14 * p.life;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.size * p.life), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const over = (e) => {
      const hit = e.target.closest("a, button, .chip, input, textarea, .proj-row");
      dot?.classList.toggle("is-active", !!hit);
    };
    const down = () => dot?.classList.add("is-down");
    const up = () => dot?.classList.remove("is-down");
    const leave = () => { lastX = null; lastY = null; };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Scroll progress bar */
  useEffect(() => {
    const bar = document.getElementById("progressBar");
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (bar) bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Typewriter */
  useEffect(() => {
    let pi = 0, ci = 0, del = false, timer;
    const tick = () => {
      const word = PHRASES[pi];
      setTyped(word.substring(0, ci));
      let delay = del ? 45 : 95;
      if (!del && ci === word.length) { delay = 1900; del = true; }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % PHRASES.length; delay = 450; }
      ci = del ? ci - 1 : ci + 1;
      if (ci < 0) ci = 0;
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, []);

  /* Reveal on scroll */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Magnetic buttons */
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const els = document.querySelectorAll(".btn, .top-links a.talk");
    const cleanups = [];
    els.forEach((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
      };
      const leave = () => { el.style.transform = ""; };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setFormState({ sending: true, msg: "", ok: false });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (res.status === 200) {
        setFormState({ sending: false, msg: "Message sent successfully. Thank you!", ok: true });
        form.reset();
      } else {
        setFormState({ sending: false, msg: data.message || "Something went wrong.", ok: false });
      }
    } catch {
      setFormState({ sending: false, msg: "Something went wrong. Please try again.", ok: false });
    }
    setTimeout(() => setFormState((s) => ({ ...s, msg: "" })), 5000);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <canvas className="trail-canvas" ref={trailRef} aria-hidden="true"></canvas>
      <div className="progress" id="progressBar"></div>

      <header className="topbar">
        <a href="#" className="logo">YASH<em>.</em>SHARMA</a>
        <nav className="top-links">
          <a href="#skills">Skills</a>
          <a href="#work">Work</a>
          <a href="#hackathons">Hackathons</a>
          <a href="/resume.html" target="_blank" rel="noopener">Resume</a>
          <a href="#contact" className="talk">Let&apos;s Talk</a>
        </nav>
        <button className="burger" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
      </header>
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <a href="#skills" onClick={closeMenu}>Skills</a>
        <a href="#work" onClick={closeMenu}>Work</a>
        <a href="#hackathons" onClick={closeMenu}>Hackathons</a>
        <a href="/resume.html" target="_blank" rel="noopener" onClick={closeMenu}>Resume</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </div>

      <main>
        {/* ---------------- HERO ---------------- */}
        <section className="hero" id="about">
          <div className="wrap">
            <span className="hero-kicker rise d1"><span className="dot"></span> Open to Internships &amp; Opportunities</span>
            <h1 className="rise d2">Yash<br /><span className="outline">Sharma</span><span className="acc">.</span></h1>
            <div className="hero-row">
              <div className="rise d3">
                <div className="type-line">&gt; <span className="typed">{typed}</span></div>
                <p className="lead">
                  I&apos;m an AI-Assisted Full-Stack Developer and <strong>BTech student at Medicaps University</strong>, building ERP
                  systems, secure applications and AI-powered tools with AI assistance — including <strong>Pragya AI</strong>, exhibited at the
                  Medicaps University IKS Exhibition.
                </p>
                <div className="hero-actions">
                  <a href="/resume.html" target="_blank" rel="noopener" className="btn btn-solid"><i className="fas fa-file-alt"></i> View Resume</a>
                  <a href="#work" className="btn btn-line">See My Work <i className="fas fa-arrow-down"></i></a>
                </div>
                <div className="hero-socials">
                  <a href="https://github.com/yash-sharmax" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/yashsharmax" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                  <a href="https://instagram.com/yashandmatrix" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="mailto:yashsharmaup2008@gmail.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
                </div>
              </div>
              <div className="photo-wrap rise d4">
                <div className="spin-badge" aria-hidden="true">
                  <svg viewBox="0 0 100 100">
                    <defs><path id="circ" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
                    <text><textPath href="#circ">AI-Assisted Developer • Builder • </textPath></text>
                  </svg>
                  <span className="core"><i className="fas fa-arrow-down"></i></span>
                </div>
                <div className="photo-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/photo.jpg" alt="Yash Sharma" />
                </div>
                <span className="photo-tag">Indore, India 🇮🇳</span>
              </div>
            </div>
          </div>
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              {[0, 1].map((n) => (
                <span key={n}>
                  Pragya AI <b>✦</b> Buildathon Winner — Indore <b>✦</b> ESP32 AI Car <b>✦</b> School ERP <b>✦</b> Supabase <b>✦</b> Hackathons <b>✦</b>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- SKILLS ---------------- */}
        <section className="section" id="skills">
          <div className="wrap">
            <div className="sec-head rv"><span className="sec-num">01</span><h2>Toolbox</h2></div>
            <p className="sec-sub rv">An honest map of where I am — what I code in today, what I am actively learning, and the platforms I build on.</p>
            <div className="skill-cols rv">
              <div className="skill-col">
                <span className="big-num">A</span>
                <h3>Languages I Code In</h3>
                <p>Foundations I build projects with.</p>
                <div className="chips">
                  <span className="chip"><i className="fab fa-html5"></i> HTML5</span>
                  <span className="chip"><i className="fab fa-css3-alt"></i> CSS3</span>
                  <span className="chip"><i className="fab fa-python"></i> Python</span>
                </div>
              </div>
              <div className="skill-col">
                <span className="big-num">B</span>
                <h3>Currently Learning</h3>
                <p>Systems programming — one step at a time.</p>
                <div className="chips">
                  <span className="chip learn"><i className="fas fa-c"></i> C</span>
                  <span className="chip learn"><i className="fas fa-code"></i> C++</span>
                </div>
              </div>
              <div className="skill-col">
                <span className="big-num">C</span>
                <h3>Tools &amp; Platforms</h3>
                <p>Where my projects live and run.</p>
                <div className="chips">
                  <span className="chip"><i className="fas fa-database"></i> Supabase</span>
                  <span className="chip"><i className="fas fa-leaf"></i> MongoDB Atlas</span>
                  <span className="chip"><i className="fas fa-play" style={{ transform: "rotate(-90deg)" }}></i> Vercel</span>
                  <span className="chip"><i className="fas fa-fire"></i> Firebase</span>
                  <span className="chip"><i className="fab fa-github"></i> Git &amp; GitHub</span>
                  <span className="chip"><i className="fas fa-plug"></i> API Integration</span>
                  <span className="chip"><i className="fas fa-robot"></i> AI-Assisted Workflows</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- PROJECTS ---------------- */}
        <section className="section" id="work">
          <div className="wrap">
            <div className="sec-head rv"><span className="sec-num">02</span><h2>Selected Work</h2></div>
            <p className="sec-sub rv">Live products and builds — every project below is real and reachable, or a physical build from my school days. Hover a row, then click to visit.</p>
            <div className="proj-list rv">
              {PROJECTS.map((p, i) => {
                const inner = (
                  <>
                    <span className="idx">0{i + 1}</span>
                    <span>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <span className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</span>
                    </span>
                    <span className="side-meta">
                      <span className={`live-dot ${p.live ? "" : "hw"}`}>{p.live ? "LIVE" : "HARDWARE · CLASS 12"}</span>
                      <span className="arrow"><i className="fas fa-arrow-up"></i></span>
                    </span>
                  </>
                );
                return p.link ? (
                  <a key={p.title} className="proj-row" href={p.link} target="_blank" rel="noopener noreferrer" data-cursor="view">{inner}</a>
                ) : (
                  <div key={p.title} className="proj-row static">{inner}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- HACKATHONS ---------------- */}
        <section className="section" id="hackathons">
          <div className="wrap">
            <div className="sec-head rv"><span className="sec-num">03</span><h2>Hackathons</h2></div>
            <p className="sec-sub rv">Competitions that taught me more than any classroom — from a city win in Class 12 to 36-hour offline builds in college.</p>
            <div className="hack-grid">
              <div className="hack-card win rv">
                <span className="h-tag">🏆 1st Position — Indore</span>
                <i className="fas fa-trophy trophy"></i>
                <h3>Viksit Bharat Buildathon 2025</h3>
                <p>Won first position in Indore at the national Viksit Bharat Buildathon 2025 — while I was still in Class 12.</p>
              </div>
              {HACKS.map((h) => (
                <div className="hack-card rv" key={h.title}>
                  <span className="h-tag">{h.tag}</span>
                  <h3>{h.title}</h3>
                  <p>{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CONTACT ---------------- */}
        <section className="section" id="contact">
          <div className="wrap">
            <div className="sec-head rv"><span className="sec-num">04</span><h2>Contact</h2></div>
            <div className="contact-box rv">
              <h2>Let&apos;s Work <span>Together</span></h2>
              <p>I am currently looking for an internship and new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!</p>
              <div className="c-socials">
                <a href="https://instagram.com/yashandmatrix" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/yashsharmax" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://github.com/yash-sharmax" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
                <a href="mailto:yashsharmaup2008@gmail.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
              </div>
              <form className="contact-form" onSubmit={onSubmit}>
                <input type="hidden" name="access_key" value="301bf00e-0a48-4396-af74-d61d876a84f8" />
                <input type="checkbox" name="botcheck" style={{ display: "none" }} readOnly />
                <div className="form-row">
                  <div><label className="sr-only" htmlFor="cf-name">Your Name</label><input id="cf-name" type="text" name="name" placeholder="Your Name" className="form-input" required /></div>
                  <div><label className="sr-only" htmlFor="cf-email">Email Address</label><input id="cf-email" type="email" name="email" placeholder="Email Address" className="form-input" required /></div>
                </div>
                <div className="form-row">
                  <div><label className="sr-only" htmlFor="cf-phone">Mobile Number (optional)</label><input id="cf-phone" type="tel" name="phone" placeholder="Mobile Number (optional)" className="form-input" /></div>
                  <div><label className="sr-only" htmlFor="cf-state">State</label><input id="cf-state" type="text" name="state" placeholder="State" className="form-input" /></div>
                </div>
                <div><label className="sr-only" htmlFor="cf-city">City</label><input id="cf-city" type="text" name="city" placeholder="City" className="form-input" /></div>
                <label className="sr-only" htmlFor="cf-message">Your message</label>
                <textarea id="cf-message" name="message" placeholder="Write your message here..." className="form-input" required></textarea>
                <button type="submit" className="submit-btn" disabled={formState.sending}>
                  {formState.sending ? <>Sending... <i className="fas fa-spinner fa-spin"></i></> : <>Send Message <i className="fas fa-paper-plane"></i></>}
                </button>
                {formState.msg && (
                  <div id="form-result" style={{ display: "block", color: formState.ok ? "#15803d" : "#dc2626" }}>{formState.msg}</div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="big">Yash <span>Sharma</span></div>
          <div className="f-row">
            <span>© {new Date().getFullYear()} Yash Sharma. Built with precision.</span>
            <span className="soc">
              <a href="https://github.com/yash-sharmax" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/yashsharmax" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="https://instagram.com/yashandmatrix" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
