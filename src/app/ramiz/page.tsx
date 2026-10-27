import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "RMC!! luxury broker age",
  robots: { index: false, follow: false },
};

/**
 * /ramiz — a standalone doodle-style joke page recreating the hand-drawn
 * "RMC Doodle Website" mockup. Not linked anywhere; buttons go nowhere.
 */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&family=Patrick+Hand&display=swap');
.dd { --ink:#1b1b1b; --orange:#E4501E; --yellow:#fbe38a; --yellowbtn:#f5d93f; --blue:#9db0d0;
  background:#fff; color:var(--ink); min-height:100vh;
  font-family:"Patrick Hand", "Comic Sans MS", cursive; font-size:19px; line-height:1.35;
  -webkit-font-smoothing:antialiased;
}
.dd-wrap { max-width:1080px; margin:0 auto; padding:26px 26px 60px; }
.dd h1,.dd h2,.dd h3,.dd .marker { font-family:"Gochi Hand","Comic Sans MS",cursive; font-weight:400; }
.dd a { color:inherit; }
/* hand-drawn wobbly box */
.wob { border:3px solid var(--ink); border-radius:255px 15px 225px 15px/15px 225px 15px 255px; background:#fff; }
.wob2 { border:3px solid var(--ink); border-radius:15px 225px 15px 255px/255px 15px 225px 15px; background:#fff; }

/* header */
.dd-top { display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }
.dd-brand { display:flex; align-items:center; gap:12px; }
.dd-logobox { border:2.5px dashed var(--ink); border-radius:8px; padding:6px; display:flex; }
.dd-brand .rmc { font-family:"Gochi Hand",cursive; font-size:24px; }
.dd-nav { display:flex; gap:10px; flex-wrap:wrap; }
.dd-nav button { font-family:inherit; font-size:18px; cursor:pointer; padding:9px 16px;
  border:3px solid var(--ink); background:#fff; border-radius:200px 14px 190px 14px/14px 190px 14px 200px; }
.dd-nav .contakt { background:var(--yellowbtn); }

/* hero */
.dd-hero { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:10px; margin:30px 0 10px; }
.dd-hero .big { font-size:66px; line-height:0.98; }
.dd-hero .big.r { text-align:right; }
.dd-cat { width:min(300px,42vw); height:auto; }

/* search */
.dd-search { display:flex; align-items:center; gap:14px; padding:14px 18px; margin:22px 0 40px; flex-wrap:wrap; }
.dd-search .q { font-family:"Gochi Hand",cursive; font-size:24px; white-space:nowrap; }
.dd-search input { flex:1; min-width:180px; border:none; border-bottom:2px solid #bbb; outline:none;
  font-family:inherit; font-size:19px; padding:6px 2px; background:transparent; }
.dd-go { font-family:"Gochi Hand",cursive; font-size:21px; background:var(--orange); color:#fff; cursor:pointer;
  border:3px solid var(--ink); padding:8px 20px; border-radius:200px 14px 190px 14px/14px 190px 14px 200px; }

/* listings */
.dd-h2 { font-size:34px; margin:0 0 18px; }
.dd-h2 s { text-decoration-thickness:3px; }
.dd-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
.dd-card { padding:16px 18px 20px; }
.dd-card svg { width:100%; height:150px; display:block; margin-bottom:10px; }
.dd-price { font-family:"Gochi Hand",cursive; font-size:24px; margin:4px 0 4px; }
.dd-addr { color:#333; }

/* sell banner */
.dd-sell { display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap;
  background:var(--yellow); border:3px solid var(--ink); border-radius:230px 18px 230px 18px/18px 230px 18px 230px;
  padding:26px 30px; margin:40px 0; }
.dd-sell .t { font-family:"Gochi Hand",cursive; font-size:30px; line-height:1.05; max-width:720px; }
.dd-sell button { font-family:"Patrick Hand",cursive; font-size:20px; cursor:pointer; white-space:nowrap;
  background:#fff; border:3px solid var(--ink); padding:12px 20px; border-radius:190px 14px 190px 14px/14px 190px 14px 190px; }

/* footer */
.dd-foot { display:flex; align-items:flex-start; gap:24px; margin-top:30px; flex-wrap:wrap; }
.dd-foot .boss { font-family:"Gochi Hand",cursive; font-size:30px; margin:0 0 4px; }
.dd-foot .u { text-decoration:underline; }
.dd-dash { border:none; border-top:3px dashed var(--ink); margin:34px 0 18px; }
.dd-tag { text-align:center; }
.dd-tag .big2 { font-family:"Gochi Hand",cursive; font-size:26px; }
.dd-tag .fine { color:#666; margin-top:6px; }

@media (max-width:760px){
  .dd-hero { grid-template-columns:1fr; text-align:center; gap:4px; }
  .dd-hero .big,.dd-hero .big.r { font-size:46px; text-align:center; }
  .dd-cat { margin:10px auto; }
  .dd-cards { grid-template-columns:1fr; }
}
`;

function Cat() {
  return (
    <svg className="dd-cat" viewBox="0 0 300 330" fill="none" stroke="#1b1b1b" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      {/* surprise marks */}
      <path d="M130 40 L124 8 M170 40 L176 8" stroke="#9db0d0" strokeWidth="5" />
      {/* ears */}
      <path d="M95 95 L78 42 L140 72 M205 95 L222 42 L160 72" />
      {/* head */}
      <path d="M78 110 C78 55 222 55 222 112 C232 150 220 195 150 200 C80 195 68 150 78 110 Z" />
      {/* eyes */}
      <circle cx="122" cy="120" r="20" fill="#fff" />
      <circle cx="180" cy="120" r="20" fill="#fff" />
      <circle cx="126" cy="122" r="9" fill="#1b1b1b" stroke="none" />
      <circle cx="184" cy="122" r="9" fill="#1b1b1b" stroke="none" />
      {/* cheeks */}
      <ellipse cx="128" cy="160" rx="20" ry="16" stroke="#9db0d0" strokeWidth="3" />
      <ellipse cx="172" cy="160" rx="20" ry="16" stroke="#9db0d0" strokeWidth="3" />
      {/* nose + mouth */}
      <path d="M150 145 L142 155 M150 145 L158 155 M150 155 L150 162" strokeWidth="3" />
      {/* body */}
      <path d="M150 200 C120 205 105 250 110 320 M150 200 C185 205 200 255 240 230" />
      <path d="M110 320 L205 320" />
    </svg>
  );
}

function House({ kind }: { kind: 1 | 2 | 3 }) {
  const s = { fill: "none", stroke: "#1b1b1b", strokeWidth: 4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  if (kind === 1)
    return (
      <svg viewBox="0 0 260 190" {...s} aria-hidden>
        <path d="M30 95 L130 30 L230 95" />
        <path d="M195 55 L195 35 L210 35 L210 72" />
        <path d="M55 95 L55 160 L205 160 L205 95" />
        <path d="M110 160 L110 118 L150 118 L150 160" />
        <rect x="75" y="110" width="24" height="24" />
        <rect x="162" y="110" width="24" height="24" />
        <path d="M30 160 L230 160" />
      </svg>
    );
  if (kind === 2)
    return (
      <svg viewBox="0 0 260 190" {...s} aria-hidden>
        <path d="M30 95 L80 40 L130 95 L180 40 L230 95" />
        <path d="M50 95 L50 160 L210 160 L210 95" />
        <path d="M60 110 L90 110 L90 160" />
        <path d="M170 110 L200 110 L200 160" />
        <rect x="110" y="110" width="26" height="26" />
        <path d="M30 160 L230 160" />
      </svg>
    );
  return (
    <svg viewBox="0 0 260 190" {...s} aria-hidden>
      <path d="M70 55 L130 30 L190 55" />
      <path d="M78 55 L78 160 L182 160 L182 55 Z" />
      <rect x="95" y="75" width="22" height="22" />
      <rect x="143" y="75" width="22" height="22" />
      <path d="M118 160 L118 120 L142 120 L142 160" />
      <path d="M210 160 C208 120 222 110 214 80 C230 110 236 130 230 160" stroke="#4a9e4a" />
      <path d="M40 160 L232 160" />
    </svg>
  );
}

function StickFigure() {
  return (
    <svg width="110" height="200" viewBox="0 0 110 200" fill="none" stroke="#1b1b1b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="55" cy="35" r="27" />
      <circle cx="46" cy="32" r="3" fill="#1b1b1b" stroke="none" />
      <circle cx="64" cy="32" r="3" fill="#1b1b1b" stroke="none" />
      <path d="M44 44 C50 52 60 52 66 44" />
      <path d="M55 62 L55 140" />
      <path d="M55 80 L20 55 M55 80 L95 60" />
      <path d="M55 140 L30 195 M55 140 L82 195" />
    </svg>
  );
}

export default function RamizPage() {
  return (
    <div className="dd">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="dd-wrap">
        {/* header */}
        <div className="dd-top">
          <div className="dd-brand">
            <span className="dd-logobox">
              <Image src="/logo-transparent.png" alt="RMC" width={56} height={56} />
            </span>
            <span className="rmc">RMC!!</span>
          </div>
          <nav className="dd-nav">
            <button type="button">home</button>
            <button type="button">house3</button>
            <button type="button">sell ur house</button>
            <button type="button" className="contakt">contakt</button>
          </nav>
        </div>

        {/* hero */}
        <div className="dd-hero">
          <div className="big marker">Real Estate Market Center</div>
          <Cat />
          <div className="big marker r">luxury broker age</div>
        </div>

        {/* search */}
        <div className="dd-search wob">
          <span className="q">where u wanna live??</span>
          <input type="text" placeholder="type a city or whatever" />
          <button type="button" className="dd-go">GO →</button>
        </div>

        {/* listings */}
        <h2 className="dd-h2 marker">fancy house3 <s>for cheap</s> for sale</h2>
        <div className="dd-cards">
          <div className="dd-card wob">
            <House kind={1} />
            <div className="dd-price">$[PRICE]</div>
            <div className="dd-addr">[ADDRESS] — has a door. very nice</div>
          </div>
          <div className="dd-card wob2">
            <House kind={2} />
            <div className="dd-price">$[PRICE]</div>
            <div className="dd-addr">[ADDRESS] — DUPLEX (2 houses 1 roof)</div>
          </div>
          <div className="dd-card wob">
            <House kind={3} />
            <div className="dd-price">$[PRICE]</div>
            <div className="dd-addr">[ADDRESS] — 2 floors + 1 tree</div>
          </div>
        </div>

        {/* sell banner */}
        <div className="dd-sell">
          <div className="t">selling ur house?? we will sell it. probably for a lot</div>
          <button type="button">wut&rsquo;s it worth →</button>
        </div>

        {/* footer */}
        <div className="dd-foot">
          <StickFigure />
          <div>
            <div className="boss">call the boss</div>
            <div>Sundus Lewis — Broker (she is very good)</div>
            <div style={{ marginTop: 10 }}>cell: <span className="u">248-568-6081</span></div>
            <div style={{ marginTop: 6 }}>email: <span className="u">realestatemarketmedia@gmail.com</span></div>
          </div>
        </div>

        <hr className="dd-dash" />
        <div className="dd-tag">
          <div className="big2 marker">Independently Owned. Luxury by Standard.</div>
          <div className="fine">© Real Estate Market Center · marketcenterrealty.com · drawn with a mouse</div>
        </div>
      </div>
    </div>
  );
}
