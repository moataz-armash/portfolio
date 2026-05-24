import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { fetchProjects, addProject, updateProject, deleteProject } from "../../services/api";
import { Project } from "../../types";

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

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (authenticated) loadProjects();
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

  const buildPayload = (): Omit<Project, "id"> => ({
    name: form.name,
    category: form.category,
    imageUrl: form.imageUrl,
    link: form.link,
    ...(form.description && { description: form.description }),
    ...(form.mainStack && { mainStack: form.mainStack }),
    ...(Object.keys(form.techStack).length > 0 && { techStack: form.techStack }),
  });

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
        await updateProject(editingProject.id!, buildPayload());
        setEditingProject(null);
      } else {
        await addProject(buildPayload());
      }
      setForm(emptyForm);
      setNewTech(emptyNewTech);
      await loadProjects();
    } catch {
      setFormError(`Failed to ${editingProject ? "update" : "add"} project. Check Firebase write rules.`);
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

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthenticated(false);
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
                <input
                  style={s.input}
                  value={newTech.name}
                  onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                  placeholder="Tech name"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
                />
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

      </div>
    </div>
  );
}
