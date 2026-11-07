import { NextResponse } from "next/server";
import seed from "../../math-formula-sheet-m1/formulas-seed.json";

export const dynamic = "force-dynamic";

const SB_URL = process.env.FORMULA_SHEET_SUPABASE_URL;
const SB_KEY = process.env.FORMULA_SHEET_SERVICE_KEY;
const EDIT_KEY = process.env.FORMULA_EDIT_KEY;

const VALID_CATEGORIES = new Set(seed.categories.map((c) => c.slug));

async function fetchAdded() {
  if (!SB_URL || !SB_KEY) return [];
  try {
    const r = await fetch(
      `${SB_URL}/rest/v1/maths_formulas?select=id,category,section,name,body,kind,created_at&order=created_at.asc`,
      {
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
        cache: "no-store",
      }
    );
    if (!r.ok) return [];
    const rows = await r.json();
    return rows.map((row) => ({
      id: "u" + row.id,
      category: row.category,
      section: row.section || "",
      name: row.name,
      body: row.body,
      kind: row.kind || "formula",
      userAdded: true,
    }));
  } catch {
    return [];
  }
}

export async function GET() {
  const added = await fetchAdded();
  return NextResponse.json({
    categories: seed.categories,
    entries: [...seed.entries, ...added],
  });
}

export async function POST(req) {
  if (!EDIT_KEY) {
    return NextResponse.json(
      { error: "Add feature is not configured yet." },
      { status: 500 }
    );
  }
  let data;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { key, category, section, name, formula } = data || {};
  if (!key || key !== EDIT_KEY) {
    return NextResponse.json(
      { error: "Incorrect security key. Formula was not added." },
      { status: 401 }
    );
  }
  if (!VALID_CATEGORIES.has(category)) {
    return NextResponse.json({ error: "Please choose a valid category." }, { status: 400 });
  }
  const cleanName = String(name || "").trim();
  const cleanFormula = String(formula || "").trim();
  const cleanSection = String(section || "").trim();
  if (!cleanName || !cleanFormula) {
    return NextResponse.json(
      { error: "Formula name and formula text are both required." },
      { status: 400 }
    );
  }
  if (cleanName.length > 200 || cleanFormula.length > 1500 || cleanSection.length > 120) {
    return NextResponse.json({ error: "Input is too long." }, { status: 400 });
  }
  if (!SB_URL || !SB_KEY) {
    return NextResponse.json(
      { error: "Storage is not configured yet." },
      { status: 500 }
    );
  }
  try {
    const r = await fetch(`${SB_URL}/rest/v1/maths_formulas`, {
      method: "POST",
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        category,
        section: cleanSection,
        name: cleanName,
        body: cleanFormula,
        kind: "formula",
      }),
    });
    if (!r.ok) {
      return NextResponse.json(
        { error: "Could not save the formula. Please try again." },
        { status: 502 }
      );
    }
    const rows = await r.json();
    const row = rows[0];
    return NextResponse.json({
      ok: true,
      entry: {
        id: "u" + row.id,
        category: row.category,
        section: row.section || "",
        name: row.name,
        body: row.body,
        kind: "formula",
        userAdded: true,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not save the formula. Please try again." },
      { status: 502 }
    );
  }
}

function keyOk(key) {
  return Boolean(EDIT_KEY) && Boolean(key) && key === EDIT_KEY;
}

function rowIdFromEntryId(id) {
  const raw = String(id || "").replace(/^u/, "");
  return /^[0-9a-fA-F-]{36}$/.test(raw) ? raw : null;
}

export async function PUT(req) {
  let data;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { key, id, category, section, name, formula } = data || {};
  if (!keyOk(key)) {
    return NextResponse.json(
      { error: "Incorrect security key. Formula was not updated." },
      { status: 401 }
    );
  }
  const rowId = rowIdFromEntryId(id);
  if (!rowId) {
    return NextResponse.json({ error: "Invalid formula id." }, { status: 400 });
  }
  if (!VALID_CATEGORIES.has(category)) {
    return NextResponse.json({ error: "Please choose a valid category." }, { status: 400 });
  }
  const cleanName = String(name || "").trim();
  const cleanFormula = String(formula || "").trim();
  const cleanSection = String(section || "").trim();
  if (!cleanName || !cleanFormula) {
    return NextResponse.json(
      { error: "Formula name and formula text are both required." },
      { status: 400 }
    );
  }
  if (cleanName.length > 200 || cleanFormula.length > 1500 || cleanSection.length > 120) {
    return NextResponse.json({ error: "Input is too long." }, { status: 400 });
  }
  if (!SB_URL || !SB_KEY) {
    return NextResponse.json({ error: "Storage is not configured yet." }, { status: 500 });
  }
  try {
    const r = await fetch(
      `${SB_URL}/rest/v1/maths_formulas?id=eq.${encodeURIComponent(rowId)}`,
      {
        method: "PATCH",
        headers: {
          apikey: SB_KEY,
          Authorization: `Bearer ${SB_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          category,
          section: cleanSection,
          name: cleanName,
          body: cleanFormula,
        }),
      }
    );
    if (!r.ok) {
      return NextResponse.json(
        { error: "Could not update the formula. Please try again." },
        { status: 502 }
      );
    }
    const rows = await r.json();
    if (!rows.length) {
      return NextResponse.json({ error: "Formula not found." }, { status: 404 });
    }
    const row = rows[0];
    return NextResponse.json({
      ok: true,
      entry: {
        id: "u" + row.id,
        category: row.category,
        section: row.section || "",
        name: row.name,
        body: row.body,
        kind: "formula",
        userAdded: true,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not update the formula. Please try again." },
      { status: 502 }
    );
  }
}

export async function DELETE(req) {
  let data;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { key, id } = data || {};
  if (!keyOk(key)) {
    return NextResponse.json(
      { error: "Incorrect security key. Formula was not deleted." },
      { status: 401 }
    );
  }
  const rowId = rowIdFromEntryId(id);
  if (!rowId) {
    return NextResponse.json({ error: "Invalid formula id." }, { status: 400 });
  }
  if (!SB_URL || !SB_KEY) {
    return NextResponse.json({ error: "Storage is not configured yet." }, { status: 500 });
  }
  try {
    const r = await fetch(
      `${SB_URL}/rest/v1/maths_formulas?id=eq.${encodeURIComponent(rowId)}`,
      {
        method: "DELETE",
        headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
      }
    );
    if (!r.ok) {
      return NextResponse.json(
        { error: "Could not delete the formula. Please try again." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not delete the formula. Please try again." },
      { status: 502 }
    );
  }
}
