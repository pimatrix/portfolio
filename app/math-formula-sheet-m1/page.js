import FormulaSheet from "./FormulaSheet";
import "./formulas.css";

export const metadata = {
  title: "Maths Formula Sheet — Engineering Mathematics-I (MA3001T)",
  description:
    "Complete formula sheet for Engineering Mathematics-I: Class 11–12 basics (algebra, trigonometry, differentiation, integration) plus Units 1–5 — matrices, differential calculus, integral calculus, differential equations and complex analysis. Searchable, with properties and short theory.",
};

export default function MathFormulaSheetPage() {
  return <FormulaSheet />;
}
