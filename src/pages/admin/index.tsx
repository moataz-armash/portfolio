import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { fetchProjects, addProject, updateProject, deleteProject, fetchAboutContent, updateAboutContent, fetchPageContent, updatePageContent } from "../../services/api";
import { Project, AboutContent, AboutSkillItem, AboutSkillBar, PageContent } from "../../types";

const CATEGORIES = ["App", "Practice", "Game"];

function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

const s = {
  btn: {
    background: "#007ced",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.5rem 1.2rem",
    cursor: "pointer",
    fontSize: "0.9rem",
  } as React.CSSProperties,
  dangerBtn: {
    background: "#c0392b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.4rem 0.9rem",
    cursor: "pointer",
    fontSize: "0.85rem",
    whiteSpace: "nowrap",
  } as React.CSSProperties,
  ghostBtn: {
    background: "transparent",
    color: "#888",
    border: "1px solid #444",
    borderRadius: "6px",
    padding: "0.4rem 0.9rem",
    cursor: "pointer",
    fontSize: "0.85rem",
    whiteSpace: "nowrap",
  } as React.CSSProperties,
  outlineBtn: {
    background: "transparent",
    color: "#888",
    border: "1px solid #444",
    borderRadius: "6px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "0.9rem",
  } as React.CSSProperties,
  card: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "10px",
    marginBottom: "1.5rem",
  } as React.CSSProperties,
  label: {
    display: "block",
    fontSize: "0.8rem",
    color: "#888",
    marginBottom: "0.3rem",
  } as React.CSSProperties,
  input: {
    width: "100%",
    background: "#0f0f0f",
    border: "1px solid #333",
    borderRadius: "6px",
    padding: "0.5rem 0.75rem",
    color: "#fff",
    fontSize: "0.9rem",
    boxSizing: "border-box",
    fontFamily: "inherit",
  } as React.CSSProperties,
  divider: {
    border: "none",
    borderTop: "1px solid #2a2a2a",
    margin: "1.25rem 0",
  } as React.CSSProperties,
  techChip: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.75rem",
    background: "#111",
    border: "1px solid #333",
    borderRadius: "8px",
    padding: "0.6rem 0.75rem",
    marginBottom: "0.5rem",
  } as React.CSSProperties,
  error: { color: "#e74c3c", fontSize: "0.85rem", marginTop: "0.5rem" } as React.CSSProperties,
};

/* ── Login ─────────────────────────────────────────── */
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const isMobile = useIsMobile();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem("admin_auth", "true");
        onLogin();
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", color: "#fff", fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "360px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "12px", padding: isMobile ? "1.25rem" : "2rem" }}>
        <div style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem", color: "#007ced", textAlign: "center" }}>
          Project Manager
        </div>
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Password</label>
          <input style={{ ...s.input, marginBottom: "0.75rem" }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
          {error && <div style={s.error}>{error}</div>}
          <button style={{ ...s.btn, width: "100%", marginTop: "1rem", padding: "0.7rem" }} type="submit" disabled={loading}>
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Admin ─────────────────────────────────────────── */
const emptyForm = {
  name: "",
  category: "App",
  imageUrl: "",
  link: "",
  description: "",
  mainStack: "",
  techStack: {} as Record<string, string>,
};
const emptyNewTech = { name: "", description: "" };

export default function AdminPage() {
  const isMobile = useIsMobile();
  const [authenticated, setAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [newTech, setNewTech] = useState(emptyNewTech);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  const [aboutForm, setAboutForm] = useState<AboutContent | null>(null);
  const [loadingAbout, setLoadingAbout] = useState(false);
  const [savingAbout, setSavingAbout] = useState(false);
  const [aboutError, setAboutError] = useState("");
  const [aboutSaved, setAboutSaved] = useState(false);

  const [heroForm, setHeroForm] = useState<PageContent>({
    brandName: "0xMotaz",
    title: "Moataz Mohamed",
    subtitle: "Full Stack Developer & Security Enthusiast",
    description: "I build fast, clean web applications — from pixel-perfect frontends with React & Next.js to full-stack systems with Node.js and Firebase. Currently leveling up in cybersecurity and bug hunting.",
    videoUrl: "",
    cvUrl: "",
  });
  const [loadingHero, setLoadingHero] = useState(false);
  const [savingHero, setSavingHero] = useState(false);
  const [heroError, setHeroError] = useState("");
  const [heroSaved, setHeroSaved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadProjects();
      setLoadingAbout(true);
      fetchAboutContent().then(setAboutForm).finally(() => setLoadingAbout(false));
      setLoadingHero(true);
      fetchPageContent()
        .then((data) => { if (data) setHeroForm((prev) => ({ ...prev, ...data })); })
        .finally(() => setLoadingHero(false));
    }
  }, [authenticated]);

  const loadProjects = async () => {
    setLoadingProjects(true);
    try { setProjects(await fetchProjects()); }
    finally { setLoadingProjects(false); }
  };

  const addTech = () => {
    const name = newTech.name.trim();
    if (!name) return;
    setForm((f) => ({ ...f, techStack: { ...f.techStack, [name]: newTech.description.trim() } }));
    setNewTech(emptyNewTech);
  };

  const removeTech = (name: string) => {
    setForm((f) => {
      const next = { ...f.techStack };
      delete next[name];
      return { ...f, techStack: next };
    });
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setForm({
      name: project.name,
      category: project.category,
      imageUrl: project.imageUrl,
      link: project.link,
      description: project.description ?? "",
      mainStack: project.mainStack ?? "",
      techStack: project.techStack ? { ...project.techStack } : {},
    });
    setNewTech(emptyNewTech);
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setNewTech(emptyNewTech);
    setFormError("");
  };

  // Firebase keys cannot contain . # $ [ ] /
  const sanitizeKey = (k: string) => k.replace(/[.#$[\]/]/g, "");

  const buildPayload = (isNew = false): Omit<Project, "id"> => {
    const safeTechStack = Object.fromEntries(
      Object.entries(form.techStack).map(([k, v]) => [sanitizeKey(k), v])
    );
    return {
      name: form.name,
      category: form.category,
      imageUrl: form.imageUrl,
      link: form.link,
      ...(form.description && { description: form.description }),
      ...(form.mainStack && { mainStack: form.mainStack }),
      ...(Object.keys(safeTechStack).length > 0 && { techStack: safeTechStack }),
      ...(isNew && { createdAt: Date.now() }),
    };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.imageUrl || !form.link) {
      setFormError("Name, image URL, and link are required.");
      return;
    }
    setFormError("");
    setSubmitting(true);
    try {
      if (editingProject) {
        await updateProject(editingProject.id!, buildPayload(false));
        setEditingProject(null);
      } else {
        await addProject(buildPayload(true));
      }
      setForm(emptyForm);
      setNewTech(emptyNewTech);
      await loadProjects();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message
        : (err as { response?: { data?: unknown } })?.response?.data
          ? JSON.stringify((err as { response: { data: unknown } }).response.data)
          : String(err);
      setFormError(`Error: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    setDeletingId(id);
    try {
      await deleteProject(id);
      await loadProjects();
    } catch {
      alert("Failed to delete. Check Firebase write rules.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveHero = async () => {
    if (!heroForm) return;
    setSavingHero(true);
    setHeroError("");
    setHeroSaved(false);
    try {
      await updatePageContent(heroForm);
      setHeroSaved(true);
      setTimeout(() => setHeroSaved(false), 3000);
    } catch {
      setHeroError("Failed to save. Check Firebase write rules.");
    } finally {
      setSavingHero(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthenticated(false);
  };

  const handleSaveAbout = async () => {
    if (!aboutForm) return;
    setSavingAbout(true);
    setAboutError("");
    setAboutSaved(false);
    try {
      await updateAboutContent(aboutForm);
      setAboutSaved(true);
      setTimeout(() => setAboutSaved(false), 3000);
    } catch {
      setAboutError("Failed to save. Check Firebase write rules.");
    } finally {
      setSavingAbout(false);
    }
  };

  const updateAboutItem = (i: number, field: keyof AboutSkillItem, value: string) => {
    if (!aboutForm) return;
    const items = [...aboutForm.items];
    items[i] = { ...items[i], [field]: value };
    setAboutForm({ ...aboutForm, items });
  };

  const addAboutItem = () => {
    if (!aboutForm) return;
    setAboutForm({ ...aboutForm, items: [...aboutForm.items, { icon: "✨", title: "", description: "" }] });
  };

  const removeAboutItem = (i: number) => {
    if (!aboutForm) return;
    setAboutForm({ ...aboutForm, items: aboutForm.items.filter((_, idx) => idx !== i) });
  };

  const updateAboutSkill = (i: number, field: keyof AboutSkillBar, value: string | number) => {
    if (!aboutForm) return;
    const skills = [...aboutForm.skills];
    skills[i] = { ...skills[i], [field]: field === "percentage" ? Number(value) : value };
    setAboutForm({ ...aboutForm, skills });
  };

  const addAboutSkill = () => {
    if (!aboutForm) return;
    setAboutForm({ ...aboutForm, skills: [...aboutForm.skills, { name: "", percentage: 50 }] });
  };

  const removeAboutSkill = (i: number) => {
    if (!aboutForm) return;
    setAboutForm({ ...aboutForm, skills: aboutForm.skills.filter((_, idx) => idx !== i) });
  };

  if (!authenticated) return <LoginForm onLogin={() => setAuthenticated(true)} />;

  const pad = isMobile ? "1rem" : "1.5rem";
  const techKeys = Object.keys(form.techStack);

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", color: "#fff", fontFamily: "sans-serif", padding: isMobile ? "1rem" : "2rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid #333", paddingBottom: "1rem" }}>
          <span style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", fontWeight: 700, color: "#007ced" }}>Project Manager</span>
          <button style={s.outlineBtn} onClick={handleLogout}>Logout</button>
        </div>

        {/* Add / Edit form */}
        <div style={{ ...s.card, padding: pad, borderColor: editingProject ? "#007ced" : "#2a2a2a" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem", color: "#ccc" }}>
            {editingProject ? `Editing: ${editingProject.name}` : "Add Project"}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Row 1: Name + Category */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={s.label}>Name *</label>
                <input style={s.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="My App" />
              </div>
              <div>
                <label style={s.label}>Category *</label>
                <select style={s.input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Row 2: Image URL + Project Link */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={s.label}>Image URL *</label>
                <input style={s.input} value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <label style={s.label}>Project Link *</label>
                <input style={s.input} value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={s.label}>Description</label>
              <textarea
                style={{ ...s.input, resize: "vertical", minHeight: "70px" }}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of the project..."
              />
            </div>

            <hr style={s.divider} />

            {/* Main Stack + Tech Stack */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={s.label}>Main Stack</label>
              <input
                style={s.input}
                value={form.mainStack}
                onChange={(e) => setForm({ ...form, mainStack: e.target.value })}
                placeholder="React, TypeScript, Next.js  (comma-separated)"
                list="tech-suggestions"
              />
              {techKeys.length > 0 && (
                <datalist id="tech-suggestions">
                  {techKeys.map((t) => <option key={t} value={t} />)}
                </datalist>
              )}
            </div>

            {/* Tech Stack items */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ ...s.label, marginBottom: "0.6rem" }}>Tech Stack</label>

              {techKeys.map((name) => (
                <div key={name} style={s.techChip}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#007ced", marginBottom: "0.2rem" }}>{name}</div>
                    <div style={{ fontSize: "0.82rem", color: "#888" }}>{form.techStack[name] || <em>No description</em>}</div>
                  </div>
                  <button type="button" style={{ ...s.ghostBtn, padding: "0.2rem 0.6rem", fontSize: "1rem", flexShrink: 0 }} onClick={() => removeTech(name)}>✕</button>
                </div>
              ))}

              {/* Add tech sub-form */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr auto", gap: "0.6rem", marginTop: "0.6rem" }}>
                <div>
                  <input
                    style={s.input}
                    value={newTech.name}
                    onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                    placeholder="Tech name"
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
                  />
                  {/[.#$[\]/]/.test(newTech.name) && (
                    <div style={{ color: "#f39c12", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                      Dots/special chars will be removed from the key (e.g. "Next.js" → "Nextjs")
                    </div>
                  )}
                </div>
                <input
                  style={s.input}
                  value={newTech.description}
                  onChange={(e) => setNewTech({ ...newTech, description: e.target.value })}
                  placeholder="Short description (optional)"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
                />
                <button
                  type="button"
                  style={{ ...s.btn, whiteSpace: "nowrap" }}
                  onClick={addTech}
                  disabled={!newTech.name.trim()}>
                  + Add
                </button>
              </div>
            </div>

            {formError && <div style={s.error}>{formError}</div>}

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <button style={isMobile ? { ...s.btn, flex: 1 } : s.btn} type="submit" disabled={submitting}>
                {submitting ? (editingProject ? "Saving..." : "Adding...") : (editingProject ? "Save Changes" : "Add Project")}
              </button>
              {editingProject && (
                <button style={isMobile ? { ...s.ghostBtn, flex: 1 } : s.ghostBtn} type="button" onClick={handleCancelEdit}>Cancel</button>
              )}
            </div>
          </form>
        </div>

        {/* Project list */}
        <div style={{ ...s.card, padding: pad }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem", color: "#ccc" }}>
            Current Projects ({loadingProjects ? "..." : projects.length})
          </div>
          {loadingProjects ? (
            <div style={{ color: "#666", padding: "1rem 0" }}>Loading...</div>
          ) : projects.length === 0 ? (
            <div style={{ color: "#666", padding: "1rem 0" }}>No projects yet.</div>
          ) : (
            projects.map((project) => (
              <div key={project.id} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", padding: "0.75rem 0", borderBottom: "1px solid #222" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 }}>
                  {project.imageUrl && (
                    <Image src={project.imageUrl} alt={project.name} width={isMobile ? 60 : 80} height={isMobile ? 38 : 50} style={{ objectFit: "cover", borderRadius: "4px", flexShrink: 0 }} unoptimized />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, marginBottom: "0.2rem", wordBreak: "break-word" }}>{project.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "#888" }}>
                      {project.category}
                      {project.mainStack && <> &nbsp;·&nbsp; <span style={{ color: "#007ced" }}>{project.mainStack}</span></>}
                      {project.techStack && Object.keys(project.techStack).length > 0 && (
                        <> &nbsp;·&nbsp; {Object.keys(project.techStack).join(", ")}</>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "flex-end" : "flex-start" }}>
                  <button style={s.ghostBtn} type="button" onClick={() => handleEditClick(project)} disabled={deletingId === project.id}>Edit</button>
                  <button style={s.dangerBtn} type="button" onClick={() => handleDelete(project.id!, project.name)} disabled={deletingId === project.id}>
                    {deletingId === project.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Hero Section Editor */}
        <div style={{ ...s.card, padding: pad }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.25rem", color: "#ccc" }}>Hero Section</div>
          {loadingHero && <div style={{ color: "#666", fontSize: "0.85rem", marginBottom: "0.75rem" }}>Loading from Firebase...</div>}
          <div style={{ marginBottom: "1rem" }}>
            <label style={s.label}>Brand Name (navbar & footer)</label>
            <input style={{ ...s.input, maxWidth: isMobile ? "100%" : "260px" }} value={heroForm.brandName ?? ""} onChange={(e) => setHeroForm({ ...heroForm, brandName: e.target.value })} placeholder="0xMotaz" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={s.label}>Title (your name)</label>
              <input style={s.input} value={heroForm.title} onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })} placeholder="Moataz Mohamed" />
            </div>
            <div>
              <label style={s.label}>Subtitle (role / tagline)</label>
              <input style={s.input} value={heroForm.subtitle} onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })} placeholder="Full Stack Developer & Security Enthusiast" />
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={s.label}>Description</label>
            <textarea
              style={{ ...s.input, resize: "vertical", minHeight: "80px" }}
              value={heroForm.description}
              onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
              placeholder="Brief intro shown on the home page..."
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={s.label}>Video URL (Cloudinary public ID)</label>
              <input style={s.input} value={heroForm.videoUrl} onChange={(e) => setHeroForm({ ...heroForm, videoUrl: e.target.value })} placeholder="my-video-id" />
            </div>
            <div>
              <label style={s.label}>CV URL</label>
              <input style={s.input} value={heroForm.cvUrl} onChange={(e) => setHeroForm({ ...heroForm, cvUrl: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          {heroError && <div style={s.error}>{heroError}</div>}
          {heroSaved && <div style={{ color: "#2ecc71", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Saved successfully.</div>}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button style={s.btn} onClick={handleSaveHero} disabled={savingHero}>
              {savingHero ? "Saving..." : "Save Hero Section"}
            </button>
            <button style={s.ghostBtn} type="button" onClick={() => setHeroForm({
              brandName: "0xMotaz",
              title: "Moataz Mohamed",
              subtitle: "Full Stack Developer & Security Enthusiast",
              description: "I build fast, clean web applications — from pixel-perfect frontends with React & Next.js to full-stack systems with Node.js and Firebase. Currently leveling up in cybersecurity and bug hunting.",
              videoUrl: heroForm.videoUrl,
              cvUrl: heroForm.cvUrl,
            })}>
              Reset to New Defaults
            </button>
          </div>
        </div>

        {/* About Page Editor */}
        <div style={{ ...s.card, padding: pad }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.25rem", color: "#ccc" }}>About Page</div>

          {loadingAbout || !aboutForm ? (
            <div style={{ color: "#666", padding: "1rem 0" }}>{loadingAbout ? "Loading..." : "No data."}</div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={s.label}>Page Title</label>
                  <input style={s.input} value={aboutForm.pageTitle} onChange={(e) => setAboutForm({ ...aboutForm, pageTitle: e.target.value })} />
                </div>
                <div>
                  <label style={s.label}>Left Box Title</label>
                  <input style={s.input} value={aboutForm.whatIDoTitle} onChange={(e) => setAboutForm({ ...aboutForm, whatIDoTitle: e.target.value })} />
                </div>
                <div>
                  <label style={s.label}>Skills Box Title</label>
                  <input style={s.input} value={aboutForm.skillsTitle} onChange={(e) => setAboutForm({ ...aboutForm, skillsTitle: e.target.value })} />
                </div>
              </div>

              <hr style={s.divider} />

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ ...s.label, marginBottom: "0.75rem" }}>What I Do — Items</label>
                {aboutForm.items.map((item, i) => (
                  <div key={i} style={{ ...s.techChip, flexDirection: "column", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "80px 1fr auto", gap: "0.5rem", width: "100%" }}>
                      <input style={s.input} value={item.icon} placeholder="Emoji" onChange={(e) => updateAboutItem(i, "icon", e.target.value)} />
                      <input style={s.input} value={item.title} placeholder="Title" onChange={(e) => updateAboutItem(i, "title", e.target.value)} />
                      <button type="button" style={{ ...s.ghostBtn, padding: "0.2rem 0.6rem", fontSize: "1rem", alignSelf: "center" }} onClick={() => removeAboutItem(i)}>✕</button>
                    </div>
                    <textarea
                      style={{ ...s.input, resize: "vertical", minHeight: "55px" }}
                      value={item.description}
                      placeholder="Description"
                      onChange={(e) => updateAboutItem(i, "description", e.target.value)}
                    />
                  </div>
                ))}
                <button type="button" style={s.ghostBtn} onClick={addAboutItem}>+ Add Item</button>
              </div>

              <hr style={s.divider} />

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ ...s.label, marginBottom: "0.75rem" }}>Skill Bars</label>
                {aboutForm.skills.map((skill, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 90px 50px auto", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "center" }}>
                    <input style={s.input} value={skill.name} placeholder="Skill name" onChange={(e) => updateAboutSkill(i, "name", e.target.value)} />
                    <input style={s.input} type="number" min={0} max={100} value={skill.percentage} onChange={(e) => updateAboutSkill(i, "percentage", e.target.value)} />
                    <div style={{ height: "6px", background: "#333", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${skill.percentage}%`, background: "#007ced", borderRadius: "4px" }} />
                    </div>
                    <button type="button" style={{ ...s.ghostBtn, padding: "0.2rem 0.6rem", fontSize: "1rem" }} onClick={() => removeAboutSkill(i)}>✕</button>
                  </div>
                ))}
                <button type="button" style={s.ghostBtn} onClick={addAboutSkill}>+ Add Skill</button>
              </div>

              {aboutError && <div style={s.error}>{aboutError}</div>}
              {aboutSaved && <div style={{ color: "#2ecc71", fontSize: "0.85rem", marginBottom: "0.5rem" }}>Saved successfully.</div>}

              <button style={s.btn} onClick={handleSaveAbout} disabled={savingAbout}>
                {savingAbout ? "Saving..." : "Save About Page"}
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
