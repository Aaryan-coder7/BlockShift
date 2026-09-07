import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, Check, ChevronRight, Code2, Mail, Menu, X } from 'lucide-react';
import { achievements, journey, profile, projects, skillGroups, stats } from './data/portfolio';

const nav = [['About', 'lore'], ['Stats', 'stats'], ['Abilities', 'abilities'], ['Arcs', 'arcs'], ['Journey', 'journey'], ['Contact', 'contact']];

export default function App() {
  const [menu, setMenu] = useState(false); const [active, setActive] = useState<number | null>(null);
  const scrollFrame = useRef<number | null>(null);
  useEffect(() => { document.body.style.overflow = active !== null ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [active]);
  const go = (id: string) => {
    const target = document.getElementById(id);
    setMenu(false);
    if (!target) return;
    if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.scrollIntoView();
      return;
    }
    const headerOffset = window.innerWidth <= 700 ? 62 : 74;
    const start = window.scrollY;
    const destination = Math.max(0, target.getBoundingClientRect().top + start - headerOffset);
    const distance = destination - start;
    const duration = Math.min(1300, Math.max(720, Math.abs(distance) * 0.52));
    const startedAt = performance.now();
    const easeInOutCubic = (progress: number) => progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    const animate = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      window.scrollTo(0, start + distance * easeInOutCubic(progress));
      if (progress < 1) scrollFrame.current = requestAnimationFrame(animate);
      else scrollFrame.current = null;
    };
    scrollFrame.current = requestAnimationFrame(animate);
  };
  return <>
    <header className="nav"><button className="wordmark" onClick={() => go('top')} aria-label="Go to top">AQ<span>®</span></button><nav>{nav.map(([l, id]) => <button key={id} onClick={() => go(id)}>{l}</button>)}</nav><button className="menu" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>{menu && <div className="mobile-nav">{nav.map(([l,id]) => <button key={id} onClick={() => go(id)}>{l}<ChevronRight size={16}/></button>)}</div>}</header>
    <main id="top">
      <section className="hero wrap"><div className="hero-copy reveal"><p className="eyebrow">PLAYER PROFILE <span/> AVAILABLE FOR A NEW ARC</p><h1>AVERY<br/><i>QUINN</i></h1><p className="role">CREATIVE DEVELOPER<br/>& AI BUILDER</p><p className="intro">{profile.intro}</p><div className="actions"><button className="btn primary" onClick={() => go('lore')}>Explore my story <ArrowDownRight/></button><button className="text-btn" onClick={() => go('arcs')}>View story arcs <ArrowDownRight/></button></div></div><div className="hero-visual reveal"><div className="hero-tag">CHARACTER<br/>SHEET / 01</div><div className="portrait"><div className="portrait-lines"/><div className="portrait-mark">AQ</div><p>PORTRAIT<br/>PENDING</p></div><div className="hero-stamp">EST. 2024<br/><b>BUILD<br/>WITH<br/>INTENT</b></div><p className="portrait-caption">Your image goes here. <span>Not a stock story.</span></p></div></section>
      <section id="stats" className="stats wrap section"><div className="section-head"><p className="eyebrow">01 / CHARACTER METRICS</p><h2>THE <i>STATS</i></h2></div><div className="stats-grid">{stats.map(([label, value, sub]) => <article className="stat" key={label}><p>{label}</p><strong>{value}</strong><span>{sub}</span></article>)}</div></section>
      <section id="lore" className="lore wrap section"><div className="section-head"><p className="eyebrow">02 / NO BORING BIOS</p><h2>THE <i>LORE</i></h2></div><div className="lore-body"><p className="lore-lead">{profile.lore}</p><div><p>MY MOTIVE</p><span>I’m drawn to work that makes complex things feel clear, generous, and a little more alive.</span><p>IN THE INVENTORY</p><span>Research notes, colour-coded browser tabs, a good question, and a half-finished prototype.</span></div></div></section>
      <section id="abilities" className="abilities section"><div className="wrap"><div className="section-head"><p className="eyebrow">03 / WHAT I BRING TO THE PARTY</p><h2>ABILITY <i>TREE</i></h2></div><div className="skills">{skillGroups.map((g, i) => <article className="skill-card" key={g.title}><span className="skill-index">0{i + 1}</span><h3>{g.title}</h3><p>{g.level}</p><div>{g.skills.map(x => <span key={x}>{x}</span>)}</div></article>)}</div></div></section>
      <section id="arcs" className="arcs wrap section"><div className="section-head"><p className="eyebrow">04 / SELECTED MISSIONS</p><h2>STORY <i>ARCS</i></h2><p className="side-note">Click any chapter to open its field notes.</p></div><div className="project-list">{projects.map((p, i) => <article className={`project ${p.color}`} key={p.title}><div className="project-art"><span>{p.number}</span><div className="glyph">{i === 0 ? '◉' : i === 1 ? '✶' : '⌁'}</div></div><div className="project-copy"><p>{p.type}</p><h3>{p.title}</h3><span>{p.description}</span><button onClick={() => setActive(i)}>Read arc <ArrowUpRight/></button></div></article>)}</div></section>
      <section id="journey" className="journey section"><div className="wrap"><div className="section-head"><p className="eyebrow">05 / THE PLOT SO FAR</p><h2>THE <i>JOURNEY</i></h2></div><div className="timeline">{journey.map(([date, title, desc]) => <article key={date}><p>{date}</p><i/><div><h3>{title}</h3><span>{desc}</span></div></article>)}</div></div></section>
      <section className="achievements wrap section"><div className="section-head"><p className="eyebrow">06 / COLLECTED ALONG THE WAY</p><h2>SMALL <i>WINS</i></h2></div><div className="badge-grid">{achievements.map(([icon, title, desc]) => <article key={title}><b>{icon}</b><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
      <section className="quest wrap section"><p className="eyebrow">07 / LIVE OBJECTIVE</p><div className="quest-grid"><h2>CURRENT<br/><i>QUEST</i></h2><div><p className="quest-title">Build something people actually use.</p><div className="progress"><span/></div><p className="progress-label">80% / EXPLORING → TESTING → SHIPPING</p><ul><li><Check/> Learn from real people</li><li><Check/> Build the useful version</li><li><Check/> Test the edges</li><li><span className="empty"/> Ship it into the world</li></ul></div></div></section>
      <section id="contact" className="contact"><div className="wrap"><p className="eyebrow">08 / THE DOOR IS OPEN</p><h2>START THE<br/><i>NEXT ARC.</i></h2><p>Have an ambitious problem worth solving? I’d love to hear the first chapter.</p><a className="contact-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight/></a><div className="socials"><a href="#" aria-label="GitHub placeholder"><Code2/> GitHub</a><a href="#" aria-label="LinkedIn placeholder"><BriefcaseBusiness/> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail/> Email</a></div></div></section>
    </main><footer className="wrap"><span>© 2026 AVERY QUINN</span><span>End of chapter. Not the story.</span><button onClick={() => go('top')}>BACK TO TOP ↑</button></footer>
    {active !== null && <ProjectModal project={projects[active]} close={() => setActive(null)} />}
  </>;
}
function ProjectModal({ project, close }: { project: typeof projects[number]; close: () => void }) { return <div className="modal-backdrop" role="presentation" onMouseDown={close}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="arc-title" onMouseDown={e => e.stopPropagation()}><button className="close" onClick={close} aria-label="Close project details"><X/></button><p className="eyebrow">STORY ARC / {project.number}</p><p className="modal-type">{project.type}</p><h2 id="arc-title">{project.title}</h2><div className="modal-grid"><div><h3>THE CHALLENGE</h3><p>{project.challenge}</p><h3>THE APPROACH</h3><p>{project.approach}</p></div><div><h3>THE BUILD</h3><p>{project.build}</p><h3>THE OUTCOME</h3><p>{project.outcome}</p></div></div><div className="stack">{project.stack.map(x => <span key={x}>{x}</span>)}</div><div className="modal-actions"><a href={project.links.github}>GitHub <ArrowUpRight/></a><a href={project.links.demo}>Live demo <ArrowUpRight/></a></div></section></div> }
