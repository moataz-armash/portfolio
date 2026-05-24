import { useState, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot, faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INFO_ITEMS = [
  { icon: faPhone,       label: "+90 538 897 0925",    color: "#007ced", bg: "rgba(0,124,237,0.12)" },
  { icon: faLocationDot, label: "İstanbul, Turkey",    color: "#e05b4b", bg: "rgba(224,91,75,0.12)" },
  { icon: faEnvelope,    label: "moatazarmash@gmail.com", color: "#27ae60", bg: "rgba(39,174,96,0.12)" },
];

type Field = "name" | "email" | "subject" | "message";

const RULES: Record<Field, (v: string) => string> = {
  name:    (v) => !v.trim() ? "Name is required." : v.trim().length < 2 ? "At least 2 characters." : "",
  email:   (v) => !v.trim() ? "Email is required." : !EMAIL_RE.test(v) ? "Enter a valid email." : "",
  subject: (v) => !v.trim() ? "Subject is required." : v.trim().length < 3 ? "At least 3 characters." : "",
  message: (v) => !v.trim() ? "Message is required." : v.trim().length < 10 ? "At least 10 characters." : "",
};

const empty = { name: "", email: "", subject: "", message: "" };

function ContactInfo() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const validate = (fields = form) => {
    const errs: Partial<Record<Field, string>> = {};
    (Object.keys(RULES) as Field[]).forEach((k) => {
      const msg = RULES[k](fields[k]);
      if (msg) errs[k] = msg;
    });
    return errs;
  };

  const handleBlur = (field: Field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: RULES[field](form[field]) }));
  };

  const handleChange = (field: Field, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) setErrors((e) => ({ ...e, [field]: RULES[field](value) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm(empty);
        setTouched({});
        setErrors({});
      } else {
        setServerError(data.error ?? "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please try again.");
      setStatus("error");
    }
  };

  const inputClass = (field: Field) =>
    `contact-input${touched[field] && errors[field] ? " input-error" : touched[field] && !errors[field] ? " input-valid" : ""}`;

  return (
    <div className="contact-massege-box">
      {/* Left — info */}
      <div className="first-contact-container">
        {INFO_ITEMS.map(({ icon, label, color, bg }) => (
          <div key={label} className="info-container">
            <div className="skill-icon-wrap contact-icon" style={{ background: bg, color }}>
              <FontAwesomeIcon icon={icon} />
            </div>
            <div className="phone-number">{label}</div>
          </div>
        ))}
      </div>

      {/* Right — form */}
      <div className="second-contact-container">
        <div className="contact-me">
          <p className="title">Contact me !</p>
          <div className="progress-bar contact">
            <div className="progress-fill"></div>
          </div>
        </div>

        <form className="input-container" onSubmit={handleSubmit} noValidate>
          <div className="field-wrap">
            <input
              className={inputClass("name")}
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
            />
            {touched.name && errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field-wrap">
            <input
              className={inputClass("email")}
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
            />
            {touched.email && errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field-wrap">
            <input
              className={inputClass("subject")}
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              onBlur={() => handleBlur("subject")}
            />
            {touched.subject && errors.subject && <span className="field-error">{errors.subject}</span>}
          </div>

          <div className="field-wrap textarea-wrap">
            <textarea
              className={inputClass("message")}
              placeholder="Your message..."
              rows={6}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              onBlur={() => handleBlur("message")}
            />
            {touched.message && errors.message && <span className="field-error">{errors.message}</span>}
          </div>

          <div className="buttons">
            {status === "success" && (
              <div className="contact-success">
                Message sent! I will get back to you soon.
              </div>
            )}
            {status === "error" && serverError && (
              <div className="contact-server-error">{serverError}</div>
            )}
            <button className="send-btn" type="submit" disabled={status === "loading"}>
              <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: "0.8rem" }} />
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactInfo;
