export const metadata = {
  title: "Terms & Conditions | Yash Sharma",
  description:
    "The common Terms & Conditions for yashx.xyz and the projects run by Yash Sharma, including MathMitra.",
};

export default function TermsPage() {
  return (
    <main className="legal">
      <a className="home-link" href="/">← Back to yashx.xyz</a>
      <h1>Terms &amp; <span>Conditions</span></h1>
      <p className="updated">Last updated: 9 November 2026</p>

      <div className="summary">
        <p>
          <strong>The short version:</strong> these terms apply to yashx.xyz and every project
          I run from it (including MathMitra). Use the services fairly, do not misuse them,
          and treat other users&apos; work with respect. Study tools and AI features are
          learning aids — always verify important information yourself.
        </p>
      </div>

      <h2>1. Who runs these services</h2>
      <p>
        yashx.xyz and the projects linked from it (together, the &quot;Services&quot;) are operated by
        Yash Sharma (&quot;I&quot;, &quot;me&quot;), a developer based in Indore, India. By using any of the
        Services, you agree to these Terms &amp; Conditions and to the{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>2. What the Services are</h2>
      <p>
        The Services include my portfolio website and the tools I build, such as{" "}
        <strong>MathMitra</strong> (a maths formula study app). Features may change over
        time as the projects grow — I may add, improve or remove features, and I will try to
        keep the Services available, but uninterrupted availability is not guaranteed.
      </p>

      <h2>3. Accounts</h2>
      <p>Some projects let you create an account. If you do:</p>
      <ul>
        <li>Give accurate information and keep your login details safe.</li>
        <li>You are responsible for activity that happens under your account.</li>
        <li>If you are under 18, use the Services with the consent of a parent or guardian.</li>
        <li>You can delete your account — see the Privacy Policy for how.</li>
      </ul>

      <h2>4. Acceptable use</h2>
      <p>Please do not:</p>
      <ul>
        <li>Break the law, or use the Services to harm, harass or mislead anyone.</li>
        <li>Try to break, overload, probe or bypass the security of the Services.</li>
        <li>Upload or add content that is illegal, infringing, or belongs to someone else without permission.</li>
        <li>Impersonate another person, or scrape the Services in a way that burdens them.</li>
      </ul>
      <p>
        I may remove content or suspend accounts that violate these terms, and I may
        moderate content added by users (for example, formulas added to MathMitra).
      </p>

      <h2>5. Content you add</h2>
      <p>
        Content you add (for example, a formula, note or message) remains yours. By adding
        it, you give me the permission needed to store, display and share it inside the
        Services so the feature can work. You are responsible for the content you add and
        for having the right to share it.
      </p>

      <h2>6. AI features</h2>
      <p>
        Some features use third-party artificial intelligence (such as Google Gemini) — for
        example, scanning a formula from a photo or answering study questions. AI output can
        be wrong. It is a study aid, not a substitute for your own judgement, your teachers,
        or official study material. Always verify anything that matters, especially before
        an exam.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        The design, code and original content of the Services belong to Yash Sharma unless
        stated otherwise. Facts and formulas themselves are public knowledge and are
        presented for study. Please do not copy the Services wholesale or present my work
        as your own.
      </p>

      <h2>8. Third-party services</h2>
      <p>
        The Services rely on third-party providers — including Vercel (hosting), Supabase
        (database and sign-in), Google (AI features) and Web3Forms (contact form). Their own
        terms and privacy policies also apply to the parts they provide.
      </p>

      <h2>9. No warranty; liability</h2>
      <p>
        The Services are provided &quot;as is&quot;, without warranties of any kind. I work to keep
        them accurate and available, but I am not liable for losses arising from reliance on
        the Services, from downtime, or from errors in content — including AI-generated
        content — to the maximum extent permitted by law.
      </p>

      <h2>10. Changes to these terms</h2>
      <p>
        I may update these terms as the projects evolve. The &quot;last updated&quot; date at the
        top will change when I do, and continuing to use the Services after an update means
        you accept the new terms.
      </p>

      <h2>11. Governing law</h2>
      <p>These terms are governed by the laws of India.</p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms: use the contact form at{" "}
        <a href="/#contact">yashx.xyz</a> or call/WhatsApp 9201980161.
      </p>

      <a className="toplink" href="/privacy">Read the Privacy Policy →</a>
    </main>
  );
}
