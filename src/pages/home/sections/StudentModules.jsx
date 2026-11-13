import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { studentModules } from "./demoModuleContent";
import StudioIcon from "../../../components/StudioIcon";
import SubjectWorkbench from "./SubjectWorkbench";
import "./StudentModules.css";

const STORAGE_KEY = "student-studio-v1";
const subjectIcons = { "study-plan": "calendar", "lecture-notes": "notes", "assignment-plan": "book", revision: "quiz", business: "chart", humanities: "globe", engineering: "sun", programming: "code", collaboration: "team", careers: "portfolio" };
const studentActivities = studentModules.filter(item => item.group === "student");
const subjectActivities = studentModules.filter(item => item.group !== "student");
const questions = [
  "What did you personally do or notice in this activity, and which skills did you practise? Describe your contribution in your own words.",
  "What did you learn, and what limitation should someone reading your portfolio know about?",
  "What evidence could support this? Describe your checks or an evidence item. Say clearly if it is only planned."
];

function emptyWorkspace() {
  return { selectedId: studentModules[0].id, sessions: {}, entries: [] };
}

function validWorkspace(value) {
  const ids = studentModules.map(module => module.id);
  return value && ids.includes(value.selectedId) && value.sessions &&
    typeof value.sessions === "object" && !Array.isArray(value.sessions) &&
    Object.entries(value.sessions).every(([id, session]) =>
      ids.includes(id) && session && Array.isArray(session.answers) &&
      session.answers.length <= questions.length &&
      session.answers.every(answer => typeof answer === "string") &&
      typeof session.draft === "string" && typeof session.input === "string") &&
    Array.isArray(value.entries) && value.entries.length <= ids.length &&
    new Set(value.entries.map(entry => entry.id)).size === value.entries.length &&
    value.entries.every(entry => entry && ids.includes(entry.id) &&
      typeof entry.title === "string" && typeof entry.text === "string");
}

function loadWorkspace() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { workspace: emptyWorkspace(), error: "" };
    const saved = JSON.parse(raw);
    if (!validWorkspace(saved)) throw new Error("Unrecognised saved workspace");
    return { workspace: saved, error: "" };
  } catch {
    return {
      workspace: emptyWorkspace(),
      error: "Your saved workspace could not be loaded. It has not been overwritten. Export your current work before leaving, or explicitly replace the saved copy."
    };
  }
}

function buildDraft(module, answers) {
  const labels = module.draftLabels || ["My contribution and skills", "Learning and limitations", "Evidence and checks"];
  return `Practice project: ${module.title}\n\n${answers.map((answer, index) => `${labels[index]}: ${answer}`).join("\n\n")}\n\nContext: a guided ${module.subject.toLowerCase()} activity using fictional sample material. These are my own statements, not independently verified achievements.`;
}

export default function StudentModules() {
  const [initial] = useState(loadWorkspace);
  const [workspace, setWorkspace] = useState(initial.workspace);
  const [storageError, setStorageError] = useState(initial.error);
  const [savingAllowed, setSavingAllowed] = useState(!initial.error);
  const [status, setStatus] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [showHome, setShowHome] = useState(() => Object.keys(initial.workspace.sessions).length === 0);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moduleGroup, setModuleGroup] = useState("subjects");
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "light");
  const conversationRef = useRef(null);
  const composerRef = useRef(null);
  const portfolioButtonRef = useRef(null);
  const portfolioRef = useRef(null);
  const resetRef = useRef(null);
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const module = studentModules.find(item => item.id === workspace.selectedId);
  const session = workspace.sessions[module.id] || { answers: [], draft: "", input: "" };
  const moduleQuestions = module.questions || questions;
  const complete = session.answers.length === moduleQuestions.length;
  const visibleModules = moduleGroup === "student" ? studentActivities : subjectActivities;
  const savedEntry = workspace.entries.find(entry => entry.id === module.id);

  useEffect(() => {
    if (!savingAllowed) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
      setStorageError("");
    } catch {
      setStorageError("Browser saving failed. Your work is still on this screen, but may be lost when you leave. Download your portfolio to keep a copy.");
    }
  }, [workspace, savingAllowed]);

  useEffect(() => {
    const conversation = conversationRef.current;
    if (conversation) conversation.scrollTop = conversation.scrollHeight;
  }, [workspace.selectedId, session.answers.length, showHome]);

  useEffect(() => {
    if (!portfolioOpen) return;
    portfolioRef.current?.focus();
    function handleKey(event) {
      if (event.key === "Escape") {
        setPortfolioOpen(false);
        portfolioButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [portfolioOpen]);

  useEffect(() => {
    if (!sidebarOpen || showReset) return;
    const menuButton = menuButtonRef.current;
    const controls = sidebarRef.current.querySelectorAll("button, a");
    controls[0].focus();
    function handleKey(event) {
      if (event.key === "Escape") setSidebarOpen(false);
      if (event.key === "Tab") {
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      menuButton?.focus();
    };
  }, [sidebarOpen, showReset]);

  useEffect(() => {
    if (!showReset) return;
    const previousFocus = document.activeElement;
    const buttons = resetRef.current.querySelectorAll("button");
    buttons[0].focus();
    function handleKey(event) {
      if (event.key === "Escape") setShowReset(false);
      if (event.key === "Tab") {
        event.preventDefault();
        const index = Array.from(buttons).indexOf(document.activeElement);
        buttons[(index + (event.shiftKey ? buttons.length - 1 : 1)) % buttons.length].focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [showReset]);

  function chooseModule(id) {
    setWorkspace(current => ({ ...current, selectedId: id }));
    setShowHome(false);
    setPortfolioOpen(false);
    setSidebarOpen(false);
    setStatus("");
    composerRef.current?.focus();
  }

  function updateSession(update) {
    setWorkspace(current => ({
      ...current,
      sessions: {
        ...current.sessions,
        [module.id]: { ...(current.sessions[module.id] || session), ...update }
      }
    }));
    setStatus("");
  }

  function sendMessage(event) {
    event.preventDefault();
    const text = session.input.trim();
    if (!text || complete || showHome) return;
    setShowHome(false);
    const answers = [...session.answers, text];
    updateSession({
      answers,
      input: "",
      draft: answers.length === moduleQuestions.length ? buildDraft(module, answers) : ""
    });
  }

  function addToPortfolio() {
    if (!session.draft.trim()) return;
    const entry = { id: module.id, title: module.title, text: session.draft.trim() };
    setWorkspace(current => ({
      ...current,
      entries: current.entries.some(item => item.id === module.id)
        ? current.entries.map(item => item.id === module.id ? entry : item)
        : [...current.entries, entry]
    }));
    setPortfolioOpen(true);
    setStatus("Portfolio updated. This is a private browser draft, not a published website.");
  }

  function downloadPortfolio() {
    let url;
    let link;
    try {
      const text = `# My learning portfolio\n\nPrivate draft | Fictional practice activities | Student statements, not verified credentials\n\n${workspace.entries.map(entry => `## ${entry.title}\n\n${entry.text}`).join("\n\n---\n\n")}`;
      url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
      link = document.createElement("a");
      link.href = url;
      link.download = "my-learning-portfolio.md";
      document.body.appendChild(link);
      link.click();
      setStatus("Portfolio download requested. Nothing has been published.");
    } catch {
      setStatus("Download failed. Select and copy the portfolio text from the preview to keep your work.");
    } finally {
      link?.remove();
      if (url) setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  }

  return (
    <main id="student-modules" className="student-modules studio" data-theme={theme}>
      {sidebarOpen && <button type="button" className="studio-nav-backdrop" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <aside ref={sidebarRef} className={`studio-sidebar ${sidebarOpen ? "is-open" : ""}`} aria-label="Learning activities">
        <div className="studio-brand"><span className="studio-mark"><StudioIcon name="spark" size={22} /></span><strong>Student studio<span>From study to your next step</span></strong><button type="button" className="studio-nav-close studio-icon-button" aria-label="Close sidebar" onClick={() => setSidebarOpen(false)}><StudioIcon name="close" /></button></div>
        <button type="button" className="studio-new-chat" onClick={() => { setShowHome(true); setSidebarOpen(false); setStatus(""); }}><StudioIcon name="spark" /> Explore activities <StudioIcon name="arrow" size={16} /></button>
        <nav className="studio-main-nav" aria-label="Workspace">
          <button type="button" aria-current={showHome ? "page" : undefined} onClick={() => { setShowHome(true); setSidebarOpen(false); }}><StudioIcon name="home" /> Study space</button>
          <button type="button" onClick={() => { setPortfolioOpen(true); setSidebarOpen(false); }}><StudioIcon name="portfolio" /> My portfolio <span className="studio-count">{workspace.entries.length}</span></button>
          <Link to="/portfolio"><StudioIcon name="globe" /> Example website <StudioIcon name="arrow" size={14} /></Link>
        </nav>
        <p className="studio-nav-label">Study essentials</p>
        <nav className="studio-subject-nav" aria-label="Student modules">
          {studentActivities.map(item => <button type="button" key={item.id} aria-current={!showHome && module.id === item.id ? "page" : undefined} onClick={() => chooseModule(item.id)}>
            <StudioIcon name={subjectIcons[item.id]} size={18} /><span>{item.subject}</span>{workspace.entries.some(entry => entry.id === item.id) && <StudioIcon name="check" size={14} />}
          </button>)}
        </nav>
        <p className="studio-nav-label">Coursework to career</p>
        <nav className="studio-subject-nav" aria-label="Choose a subject">
          {subjectActivities.map(item => <button type="button" key={item.id} aria-current={!showHome && module.id === item.id ? "page" : undefined} onClick={() => chooseModule(item.id)}>
            <StudioIcon name={subjectIcons[item.id]} size={18} /><span>{item.subject}</span>{workspace.entries.some(entry => entry.id === item.id) && <StudioIcon name="check" size={14} />}
          </button>)}
        </nav>
        <div className="studio-sidebar-bottom">
          <div className="studio-progress-card"><div><StudioIcon name="book" size={18} /><strong>A little progress, every day.</strong></div><p>{workspace.entries.length} learning {workspace.entries.length === 1 ? "story" : "stories"} in your portfolio</p><div className="studio-progress-track"><span style={{ width: `${workspace.entries.length / studentModules.length * 100}%` }} /></div></div>
          <button type="button" className="studio-settings" onClick={() => setTheme(current => current === "dark" ? "light" : "dark")}><StudioIcon name="sun" size={18} /> {theme === "dark" ? "Light" : "Dark"} mode</button>
          <button type="button" className="studio-settings" onClick={() => setShowReset(true)}>Start a fresh workspace</button>
          <div className="studio-profile"><span className="studio-profile-avatar">Y</span><div><strong>Your study space</strong><small>Private / saved on this browser</small></div></div>
        </div>
      </aside>
      <div className="studio-main">
        <header className="studio-header">
          <div className="studio-breadcrumb"><button ref={menuButtonRef} type="button" className="studio-menu-button studio-icon-button" aria-label="Open navigation" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(true)}><StudioIcon name="menu" /></button><span>Study space</span>{!showHome && <><span className="studio-breadcrumb-divider">/</span><strong>{module.subject}</strong></>}</div>
          <div className="studio-header-actions"><span className="studio-demo-label"><span />Guided demo / no live AI</span><button ref={portfolioButtonRef} type="button" className="studio-portfolio-toggle" aria-label="Toggle portfolio" aria-expanded={portfolioOpen} onClick={() => setPortfolioOpen(current => !current)}><StudioIcon name="portfolio" size={17} /><span>Portfolio</span><span className="studio-count">{workspace.entries.length}</span></button></div>
        </header>
        {storageError && <div role="alert" className="studio-storage-error"><p>{storageError}</p>{!savingAllowed && <button type="button" onClick={() => setSavingAllowed(true)}>Replace unreadable saved copy with this workspace</button>}</div>}
        <section className="studio-chat" aria-label={showHome ? "Study space home" : module.title}>
          {showHome ? <div className="studio-welcome">
            <div className="studio-welcome-inner"><span className="studio-welcome-symbol"><StudioIcon name="book" size={36} /></span><p className="studio-eyebrow">Your day. Your degree. Your next chapter.</p><h1>What are we working on today?</h1><p className="studio-welcome-description">A busy week, a tricky lecture, your next big idea.<br />Find your starting point and build your portfolio as you go.</p><div className="studio-context-chips"><span><StudioIcon name="book" size={14} /> Student mode</span><span><StudioIcon name="check" size={14} /> No GitHub experience needed</span></div>
              <div className="studio-module-tabs" role="tablist" aria-label="Module categories" onKeyDown={event => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const next = event.key === "Home" ? "subjects" : event.key === "End" ? "student" : moduleGroup === "student" ? "subjects" : "student";
                setModuleGroup(next);
                document.getElementById(next === "student" ? "student-tab" : "subjects-tab").focus();
              }}>
                <button type="button" role="tab" id="subjects-tab" tabIndex={moduleGroup === "subjects" ? 0 : -1} aria-selected={moduleGroup === "subjects"} aria-controls="module-cards" onClick={() => setModuleGroup("subjects")}>Coursework to career <span>{subjectActivities.length}</span></button>
                <button type="button" role="tab" id="student-tab" tabIndex={moduleGroup === "student" ? 0 : -1} aria-selected={moduleGroup === "student"} aria-controls="module-cards" onClick={() => setModuleGroup("student")}>Study essentials <span>{studentActivities.length}</span></button>
              </div>
              <div id="module-cards" className="studio-suggestions" role="tabpanel" aria-labelledby={moduleGroup === "student" ? "student-tab" : "subjects-tab"}>{visibleModules.map(item => <button type="button" key={item.id} aria-label={`Start ${item.subject}`} onClick={() => chooseModule(item.id)} className="studio-suggestion">
                <span className="studio-suggestion-top"><StudioIcon name={subjectIcons[item.id]} size={20} /><span>{item.subject}</span><StudioIcon name="arrow" size={16} /></span><strong>{item.title}</strong><p>{item.outcome}</p><small>{workspace.sessions[item.id]?.answers.length ? "Continue your conversation" : `${item.duration} / guided activity`}</small>
              </button>)}</div>
              <p className="studio-home-note">Fictional campus examples. No school accounts connected. Your own work, at your pace.</p>
            </div>
          </div> : <div ref={conversationRef} className="studio-conversation" role="log" aria-label="Guided conversation" aria-live="polite">
            <div className="studio-conversation-heading"><span className="studio-subject-icon"><StudioIcon name={subjectIcons[module.id]} size={24} /></span><div><p className="studio-eyebrow">{module.subject}</p><h1>{module.title}</h1></div><span className="studio-badge">{Math.min(session.answers.length + 1, 3)} / 3</span></div>
            <article className="studio-message">
              <span className="studio-avatar"><StudioIcon name="spark" size={18} /></span>
              <div><p className="studio-speaker">Studio guide <span>Scripted</span></p><p>Let's turn a small learning moment into something for your portfolio.</p><p>{module.setup}</p><p>{module.outcome}</p>
                <details><summary>Open the practice material</summary><pre>{module.source}</pre><p><strong>Try this:</strong> {module.steps[0]}</p></details>
                <SubjectWorkbench key={module.id} moduleId={module.id} />
                <details><summary>Challenge a fictional AI mistake</summary><p>{module.challenge}</p><details><summary>Review the explanation</summary><p>{module.answer}</p></details></details>
                <details><summary>Optional: take it further with GitHub</summary><p>{module.extension}</p></details>
                <p>{moduleQuestions[0]}</p>
              </div>
            </article>
            {session.answers.map((answer, index) => <React.Fragment key={index}>
              <article className="studio-message studio-message-user"><span className="studio-avatar" aria-hidden="true">Y</span><div><p className="studio-speaker">You</p><p>{answer}</p></div></article>
              <article className="studio-message"><span className="studio-avatar"><StudioIcon name="spark" size={18} /></span><div><p className="studio-speaker">Studio guide <span>Scripted</span></p>{module.responseNotes?.[index] && <div className="studio-reference-note"><strong>Fixed practice reference / not an evaluation</strong><p>{module.responseNotes[index]}</p></div>}<p>{index < moduleQuestions.length - 1 ? moduleQuestions[index + 1] : "Your draft is ready below. I have organised your words, not checked or graded them. Review the claims, edit anything you need, then add it to your portfolio."}</p></div></article>
            </React.Fragment>)}
            {complete && <div className="studio-draft">
              <p className="studio-eyebrow">Ready for your review</p>
              <label htmlFor="portfolio-draft">Edit your portfolio entry</label>
              <textarea id="portfolio-draft" rows={11} value={session.draft} onChange={event => updateSession({ draft: event.target.value })} />
              <button type="button" className="studio-primary" disabled={!session.draft.trim()} onClick={addToPortfolio}>{savedEntry ? "Update portfolio entry" : "Add to my portfolio"}</button>
              <p className="studio-fine-print">Adding an entry is your confirmation that you reviewed it. This is not a verified qualification.</p>
            </div>}
          </div>}
          <form className="studio-composer" onSubmit={sendMessage}>
            <div className="studio-composer-box"><label htmlFor="chat-message">{showHome ? "Your response" : complete ? "Entry drafted - review it above" : "Your response"}</label>
              <textarea ref={composerRef} id="chat-message" rows={2} maxLength={4000} value={showHome ? "" : session.input} readOnly={showHome} disabled={!showHome && complete} onChange={event => updateSession({ input: event.target.value })} onKeyDown={event => {
                if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); sendMessage(event); }
              }} placeholder={showHome ? "Choose a student module to get started..." : complete ? "Your next learning story is one activity away." : "Share your plan, explanation or answer..."} />
              <div className="studio-composer-toolbar"><span><StudioIcon name={subjectIcons[module.id]} size={15} />{showHome ? "Choose an activity to begin" : module.subject}</span><button type="submit" className="studio-send" aria-label="Send" disabled={showHome || complete || !session.input.trim()}><StudioIcon name="send" size={18} /></button></div>
            </div>
            <p className="studio-fine-print">{showHome ? "Pick a card to start. " : "Enter to send / Shift+Enter for a new line. "}Scripted guidance, not live AI. Use fictional material only.</p>
          </form>
        </section>
        <p className="studio-status" role="status">{status}</p>
      </div>
      {portfolioOpen && <aside ref={portfolioRef} tabIndex={-1} className="studio-portfolio" aria-labelledby="portfolio-title">
          <header><div><p className="studio-eyebrow">Made by you</p><h2 id="portfolio-title">My portfolio</h2><p>{workspace.entries.length} learning {workspace.entries.length === 1 ? "story" : "stories"} added</p></div><button type="button" className="studio-icon-button" aria-label="Close portfolio" onClick={() => { setPortfolioOpen(false); portfolioButtonRef.current?.focus(); }}><StudioIcon name="close" /></button></header>
          <div className="studio-portfolio-content">
            {!workspace.entries.length ? <div className="studio-empty"><span aria-hidden="true">+</span><h3>Your first story starts here.</h3><p>Work through a conversation, review your draft and add it here. No GitHub setup. No blank-page pressure.</p></div> :
              workspace.entries.map(entry => <article className="studio-entry" key={entry.id}><span className="studio-badge">Practice project</span><h3>{entry.title}</h3><p>{entry.text}</p><div className="studio-entry-actions"><button type="button" onClick={() => {
                chooseModule(entry.id);
                setStatus("Edit the draft in the conversation, then choose Update portfolio entry.");
              }}>Edit entry</button><button type="button" aria-label={`Remove ${entry.title} from portfolio`} onClick={() => {
                setWorkspace(current => ({ ...current, entries: current.entries.filter(item => item.id !== entry.id) }));
                setStatus("Entry removed from portfolio. Its conversation and draft are kept.");
              }}>Remove</button></div></article>)}
          </div>
          <footer><button type="button" className="studio-primary" disabled={!workspace.entries.length} onClick={downloadPortfolio}>Download portfolio</button><p className="studio-fine-print">{storageError ? "Browser saving needs attention." : "Saved in this browser only."} Export a copy before using another device. Nothing is published.</p></footer>
        </aside>}
      {showReset && <div className="studio-reset-backdrop"><div ref={resetRef} className="studio-reset" role="dialog" aria-modal="true" aria-labelledby="reset-title"><h2 id="reset-title">Start a fresh workspace?</h2><p>This clears all conversations and portfolio entries in this browser. Download your portfolio first.</p><div><button type="button" onClick={() => { setShowReset(false); }}>Keep my work</button><button type="button" className="studio-primary" onClick={() => {
        setWorkspace(emptyWorkspace()); setSavingAllowed(true); setShowReset(false); setShowHome(true); setPortfolioOpen(false); setSidebarOpen(false); setStatus("Workspace reset.");
      }}>Clear my workspace</button></div></div></div>}
    </main>
  );
}
