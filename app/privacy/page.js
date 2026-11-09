export const metadata = {
  title: "Privacy Policy | Yash Sharma",
  description:
    "The common Privacy Policy for yashx.xyz and the projects run by Yash Sharma, including MathMitra. What data is collected, why, and your choices.",
};

export default function PrivacyPage() {
  return (
    <main className="legal">
      <a className="home-link" href="/">← Back to yashx.xyz</a>
      <h1>Privacy <span>Policy</span></h1>
      <p className="updated">Last updated: 9 November 2026</p>

      <div className="summary">
        <p>
          <strong>The short version:</strong> I never sell your data and I run no advertising
          trackers. I collect only what is needed to run these services and to understand
          how students use them, so I can improve them. Everything collected is listed on
          this page — nothing hidden. You can opt out of analytics, and you can ask for
          your account and data to be deleted at any time.
        </p>
      </div>

      <h2>1. Who is responsible</h2>
      <p>
        This policy covers yashx.xyz and the projects operated by Yash Sharma from it
        (together, the &quot;Services&quot;), including <strong>MathMitra</strong>. I am the person
        responsible for the data described here. Contact details are at the end of this page.
      </p>

      <h2>2. What data is collected</h2>
      <p><strong>When you send a message</strong> through a contact form:</p>
      <ul>
        <li>Your name, email address and message — so that I can reply to you.</li>
      </ul>
      <p><strong>When you create an account</strong> (in projects that offer accounts, such as MathMitra):</p>
      <ul>
        <li>Your name and email address, and — if you choose to provide it — your institution and study level.</li>
        <li>Your password, stored securely in hashed form by the sign-in provider (Supabase). I never see or store your password in plain text.</li>
        <li>Content you add, such as formulas you submit.</li>
      </ul>
      <p><strong>When you use the Services — usage and analytics data:</strong></p>
      <ul>
        <li>Pages and features used, content viewed (for example, which formulas are viewed most), and the date and time of visits.</li>
        <li>Device and browser information: device type (mobile or desktop), operating system and browser.</li>
        <li>Your IP address, which is used for security and for analytics.</li>
        <li>Battery level, only where your browser provides it (Chrome on Android does; Safari on iPhone and Firefox do not, so this is simply absent there).</li>
      </ul>
      <p>
        <strong>On your device:</strong> the apps store small amounts of data locally on your
        device (such as your preferences and a cached copy of app content) so they open
        faster and work smoothly. This stays on your device.
      </p>

      <h2>3. How the data is used</h2>
      <ul>
        <li>To operate the Services and the features you use.</li>
        <li>To understand which content genuinely helps students, and to improve that content.</li>
        <li>To keep the Services secure and prevent abuse.</li>
        <li>To reply to messages you send.</li>
      </ul>
      <p>
        Your data is <strong>never sold</strong>, and it is never shared with third parties
        for marketing. There are no advertising trackers in the Services.
      </p>

      <h2>4. MathMitra — specifics</h2>
      <p>
        In MathMitra, viewing a formula is recorded as an anonymous page view unless you are
        signed in; if you are signed in, your activity can appear in the admin dashboard
        together with your name and email, so I can see which students the app is helping
        and which formulas they need most. If you use the AI photo scan or the AI tutor,
        the photo or question you submit is sent to Google Gemini for processing, as
        described below.
      </p>

      <h2>5. Service providers</h2>
      <p>The Services are built on providers that process data on my behalf:</p>
      <ul>
        <li><strong>Vercel</strong> — website and app hosting.</li>
        <li><strong>Supabase</strong> — database and account sign-in.</li>
        <li><strong>Google Gemini</strong> — AI features. Photos and questions you submit to an AI feature are sent to Google for processing to produce the answer.</li>
        <li><strong>Web3Forms</strong> — contact form delivery.</li>
      </ul>
      <p>Each provider handles data under its own privacy policy.</p>

      <h2>6. Your choices and rights</h2>
      <ul>
        <li><strong>Analytics opt-out:</strong> you can opt out of analytics collection. Where an app provides a settings toggle, use it; otherwise send a request through the contact form and your account/device will be excluded.</li>
        <li><strong>Access and correction:</strong> you can ask what data I hold about you and ask for corrections.</li>
        <li><strong>Deletion:</strong> you can request deletion of your account and associated data at any time through the contact form. Requests are completed within 7 days. (A self-service delete option inside the app is also being added.)</li>
        <li><strong>Consent withdrawal:</strong> withdrawing consent is as easy as giving it — use the opt-out or the contact form.</li>
      </ul>

      <h2>7. How long data is kept</h2>
      <p>
        Account data is kept while your account is active and is deleted on request.
        Analytics data is kept only as long as it is useful for improving the Services and
        is periodically reviewed.
      </p>

      <h2>8. Security</h2>
      <p>
        Data is transmitted over encrypted connections, account passwords are hashed by the
        sign-in provider, and access to admin data is restricted to me. No system can be
        guaranteed 100% secure, but I take reasonable care with the data entrusted to the
        Services.
      </p>

      <h2>9. Children</h2>
      <p>
        The Services are study tools. If you are under 18, please use them with the consent
        of a parent or guardian, who may contact me about your data at any time.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        If what is collected ever changes, this page will be updated first — the &quot;last
        updated&quot; date at the top will change — before or at the same time as the change
        takes effect. The list on this page always reflects actual practice.
      </p>

      <h2>11. Contact</h2>
      <p>
        For any privacy question, opt-out or deletion request: use the contact form at{" "}
        <a href="/#contact">yashx.xyz</a> or call/WhatsApp 9201980161.
      </p>

      <a className="toplink" href="/terms">Read the Terms &amp; Conditions →</a>
    </main>
  );
}
