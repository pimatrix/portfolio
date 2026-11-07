"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const GROUP_ORDER = ["basics-algebra", "basics-trigonometry", "basics-differentiation", "basics-integration", "unit1", "unit2", "unit3", "unit4", "unit5"];
const BASICS = ["basics-algebra", "basics-trigonometry", "basics-differentiation", "basics-integration"];

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export default function FormulaSheet() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all"); // all | basics | <slug>
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1); // 1 = details, 2 = key
  const [form, setForm] = useState({ name: "", category: "basics-trigonometry", section: "", formula: "" });
  const [key, setKey] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [highlightId, setHighlightId] = useState("");
  const cardRefs = useRef({});

  useEffect(() => {
    fetch("/api/math-formulas")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setError("Formulas could not be loaded. Please refresh the page."));
  }, []);

  const categories = data?.categories || [];
  const catTitle = useMemo(() => {
    const m = {};
    categories.forEach((c) => (m[c.slug] = c.title));
    return m;
  }, [categories]);

  const visible = useMemo(() => {
    if (!data) return [];
    let list = data.entries;
    if (filter === "basics") list = list.filter((e) => BASICS.includes(e.category));
    else if (filter !== "all") list = list.filter((e) => e.category === filter);
    const needle = q.trim().toLowerCase();
    if (needle) {
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(needle) ||
          (e.section || "").toLowerCase().includes(needle) ||
          stripHtml(e.body).includes(needle)
      );
    }
    return list;
  }, [data, filter, q]);

  const grouped = useMemo(() => {
    const out = [];
    const byCat = {};
    visible.forEach((e) => {
      if (!byCat[e.category]) byCat[e.category] = [];
      byCat[e.category].push(e);
    });
    GROUP_ORDER.forEach((slug) => {
      if (!byCat[slug]) return;
      const sections = [];
      const secMap = {};
      byCat[slug].forEach((e) => {
        const s = e.section || "General";
        if (!secMap[s]) {
          secMap[s] = [];
          sections.push({ name: s, items: secMap[s] });
        }
        secMap[s].push(e);
      });
      out.push({ slug, title: catTitle[slug] || slug, sections });
    });
    return out;
  }, [visible, catTitle]);

  function openForm() {
    setForm({ name: "", category: filter !== "all" && filter !== "basics" ? filter : "basics-trigonometry", section: "", formula: "" });
    setKey("");
    setFormError("");
    setStep(1);
    setShowForm(true);
  }

  function goToKeyStep() {
    if (!form.name.trim() || !form.formula.trim()) {
      setFormError("Please fill the formula name and the formula itself first.");
      return;
    }
    setFormError("");
    setStep(2);
  }

  async function submitWithKey() {
    if (!key) {
      setFormError("Please enter the security key.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      const r = await fetch("/api/math-formulas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, ...form }),
      });
      const d = await r.json();
      if (!r.ok) {
        setFormError(d.error || "Something went wrong.");
        setSaving(false);
        return;
      }
      setData((prev) => ({ ...prev, entries: [...prev.entries, d.entry] }));
      setShowForm(false);
      setSaving(false);
      setFilter(d.entry.category);
      setQ("");
      setToast("Formula added successfully.");
      setHighlightId(d.entry.id);
      setTimeout(() => {
        const el = cardRefs.current[d.entry.id];
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 120);
      setTimeout(() => setToast(""), 3500);
      setTimeout(() => setHighlightId(""), 4000);
    } catch {
      setFormError("Network error. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="fs-root">
      <header className="fs-header">
        <div className="fs-header-inner">
          <a className="fs-home" href="/">← yashx.xyz</a>
          <h1>Engineering Mathematics-I — Formula Sheet</h1>
          <p>MA3001T · Basics (Class 11–12) + Units 1–5 · All formulas, properties &amp; short theory in one place</p>
        </div>
      </header>

      <div className="fs-toolbar">
        <div className="fs-toolbar-inner">
          <div className="fs-search-row">
            <input
              className="fs-search"
              type="text"
              placeholder="Search any formula… e.g. Euler, Wallis, cos 2A, Integrating Factor"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button className="fs-add-btn" onClick={openForm}>+ Add Formula</button>
            <button className="fs-print-btn" onClick={() => window.print()}>Print</button>
          </div>
          <div className="fs-chips">
            <button className={filter === "all" ? "fs-chip active" : "fs-chip"} onClick={() => setFilter("all")}>All Formulas</button>
            <button className={filter === "basics" ? "fs-chip active" : "fs-chip"} onClick={() => setFilter("basics")}>All Basics</button>
            {categories.map((c) => (
              <button
                key={c.slug}
                className={filter === c.slug ? "fs-chip active" : "fs-chip"}
                onClick={() => setFilter(c.slug)}
              >
                {c.title}
              </button>
            ))}
          </div>
          {data && (
            <p className="fs-count">
              Showing <b>{visible.length}</b> of {data.entries.length} entries
              {q.trim() ? <> for “{q.trim()}”</> : null}
            </p>
          )}
        </div>
      </div>

      <main className="fs-main">
        {!data && !error && <p className="fs-loading">Loading formulas…</p>}
        {error && <p className="fs-error">{error}</p>}
        {data && visible.length === 0 && (
          <p className="fs-loading">No formula matched. Try a shorter search word.</p>
        )}
        {grouped.map((g) => (
          <section key={g.slug} className="fs-cat">
            <h2 className="fs-cat-title">{g.title}</h2>
            {g.sections.map((s) => (
              <div key={s.name} className="fs-section">
                {s.name !== "General" && <h3 className="fs-sec-title">{s.name}</h3>}
                <div className="fs-grid">
                  {s.items.map((e) =>
                    e.kind === "theory" ? (
                      <article
                        key={e.id}
                        ref={(el) => (cardRefs.current[e.id] = el)}
                        className={"fs-card fs-theory" + (highlightId === e.id ? " fs-highlight" : "")}
                      >
                        <h4>{e.name}</h4>
                        <div className="fs-body" dangerouslySetInnerHTML={{ __html: e.body }} />
                      </article>
                    ) : e.kind === "table" ? (
                      <article
                        key={e.id}
                        ref={(el) => (cardRefs.current[e.id] = el)}
                        className={"fs-card fs-table-card" + (highlightId === e.id ? " fs-highlight" : "")}
                      >
                        <h4>{e.name}</h4>
                        <div className="fs-body" dangerouslySetInnerHTML={{ __html: e.body }} />
                      </article>
                    ) : (
                      <article
                        key={e.id}
                        ref={(el) => (cardRefs.current[e.id] = el)}
                        className={"fs-card" + (highlightId === e.id ? " fs-highlight" : "")}
                      >
                        <h4>{e.name}{e.userAdded ? <span className="fs-new"> · added</span> : null}</h4>
                        {e.userAdded ? (
                          <div className="fs-body fs-user-body">{e.body}</div>
                        ) : (
                          <div className="fs-body" dangerouslySetInnerHTML={{ __html: e.body }} />
                        )}
                      </article>
                    )
                  )}
                </div>
              </div>
            ))}
          </section>
        ))}
        <footer className="fs-footer">
          <p>New formulas can be added only by the owner, using a security key at the final submission step.</p>
        </footer>
      </main>

      {showForm && (
        <div className="fs-modal-backdrop" onClick={() => !saving && setShowForm(false)}>
          <div className="fs-modal" onClick={(e) => e.stopPropagation()}>
            {step === 1 ? (
              <>
                <h3>Add a New Formula</h3>
                <label>
                  Formula name *
                  <input
                    type="text"
                    placeholder="e.g. d/dx (sinh x)"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>
                <label>
                  Category *
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.title}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Section (topic inside the category)
                  <input
                    type="text"
                    placeholder="e.g. Taylor and Maclaurin Series"
                    value={form.section}
                    onChange={(e) => setForm({ ...form, section: e.target.value })}
                  />
                </label>
                <label>
                  Formula *
                  <textarea
                    rows={3}
                    placeholder="e.g. d/dx (sinh x) = cosh x — you can type symbols like √ π θ ∫ ∂ λ directly"
                    value={form.formula}
                    onChange={(e) => setForm({ ...form, formula: e.target.value })}
                  />
                </label>
                {formError && <p className="fs-form-error">{formError}</p>}
                <div className="fs-modal-actions">
                  <button className="fs-btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                  <button className="fs-btn-primary" onClick={goToKeyStep}>Submit Formula →</button>
                </div>
              </>
            ) : (
              <>
                <h3>Final Step — Security Key</h3>
                <p className="fs-key-note">
                  Enter the security key to confirm adding <b>{form.name}</b> to <b>{catTitle[form.category] || form.category}</b>. Without the correct key, nothing is added.
                </p>
                <label>
                  Security key *
                  <input
                    type="password"
                    placeholder="Enter security key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitWithKey()}
                    autoFocus
                  />
                </label>
                {formError && <p className="fs-form-error">{formError}</p>}
                <div className="fs-modal-actions">
                  <button className="fs-btn-ghost" onClick={() => setStep(1)} disabled={saving}>← Back</button>
                  <button className="fs-btn-primary" onClick={submitWithKey} disabled={saving}>
                    {saving ? "Adding…" : "Confirm & Add"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {toast && <div className="fs-toast">{toast}</div>}
    </div>
  );
}
