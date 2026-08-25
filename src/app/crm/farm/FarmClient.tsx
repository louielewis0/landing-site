"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { usePasscode } from "../gate";
import { apiFetch } from "../_lib/api-client";
import { clusterTargets, type FarmTarget } from "./cluster";

const FarmMap = dynamic(() => import("./FarmMap"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100%", display: "grid", placeItems: "center", color: "rgba(25,26,28,0.4)", fontSize: 13 }}>
      Loading map…
    </div>
  ),
});

export default function FarmClient() {
  const passcode = usePasscode();
  const [targets, setTargets] = useState<FarmTarget[]>([]);
  const [paste, setPaste] = useState("");
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  async function load() {
    try {
      const data = await apiFetch<{ targets: FarmTarget[] }>(passcode, "/farm");
      setTargets(data.targets);
    } catch {
      /* keep prior */
    } finally {
      setLoaded(true);
    }
  }
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clusters = useMemo(() => clusterTargets(targets), [targets]);
  const done = targets.filter((t) => t.carded).length;
  const remaining = targets.length - done;

  async function addAddresses() {
    const addresses = paste
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (addresses.length === 0) return;
    setAdding(true);
    setToast(null);
    try {
      const res = await apiFetch<{ added: number; failed: number; skippedDup: number }>(
        passcode,
        "/farm",
        { method: "POST", body: JSON.stringify({ addresses }) },
      );
      const parts = [`Added ${res.added}`];
      if (res.skippedDup) parts.push(`${res.skippedDup} already on the map`);
      if (res.failed) parts.push(`${res.failed} couldn't be located (check spelling)`);
      setToast(parts.join(" · "));
      setPaste("");
      await load();
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Couldn't add those.");
    } finally {
      setAdding(false);
    }
  }

  async function toggle(t: FarmTarget) {
    const next = !t.carded;
    setTargets((prev) =>
      prev.map((x) => (x.id === t.id ? { ...x, carded: next } : x)),
    );
    try {
      await apiFetch(passcode, `/farm/${t.id}`, {
        method: "PATCH",
        body: JSON.stringify({ carded: next }),
      });
    } catch {
      setTargets((prev) => prev.map((x) => (x.id === t.id ? { ...x, carded: !next } : x)));
    }
  }

  async function remove(t: FarmTarget) {
    setTargets((prev) => prev.filter((x) => x.id !== t.id));
    try {
      await apiFetch(passcode, `/farm/${t.id}`, { method: "DELETE" });
    } catch {
      load();
    }
  }

  return (
    <>
      <div className="farm-head">
        <div>
          <h1 className="farm-title">Farm map</h1>
          <p className="farm-sub">
            Paste today&rsquo;s expired addresses. They pin on the map, grouped
            into routes so you can card the closest ones in one trip.
          </p>
        </div>
        {targets.length > 0 && (
          <div className="farm-counter">
            <b>{remaining}</b> to card
            <span> · {done} done</span>
          </div>
        )}
      </div>

      {/* Paste box */}
      <div className="farm-paste">
        <textarea
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
          placeholder={"Paste addresses, one per line —\n18389 Silent Dr, Macomb, MI\n1816 Clifton Ave, Sterling Heights, MI"}
          rows={3}
        />
        <button onClick={addAddresses} disabled={adding || !paste.trim()}>
          {adding ? "Adding & mapping…" : "Add to map"}
        </button>
      </div>
      {toast && <p className="farm-toast">{toast}</p>}

      <div className="farm-grid">
        {/* Map */}
        <div className="farm-map">
          {loaded && targets.length === 0 ? (
            <div className="farm-empty">
              No addresses yet. Paste your expireds above and they&rsquo;ll pin here.
            </div>
          ) : (
            <FarmMap targets={targets} onToggle={toggle} focusId={focusId} />
          )}
        </div>

        {/* Route batches */}
        <div className="farm-routes">
          {clusters.length === 0 && loaded && (
            <p className="farm-routes-empty">Your route batches will show up here.</p>
          )}
          {clusters.map((c, i) => {
            const left = c.targets.filter((t) => !t.carded).length;
            return (
              <div key={i} className="farm-cluster">
                <div className="farm-cluster-head">
                  <span className="farm-cluster-name">
                    {c.targets.length === 1 ? "Lone stop" : `Route ${i + 1}`}
                  </span>
                  <span className="farm-cluster-count">
                    {left > 0 ? `${left} of ${c.targets.length} left` : "all done ✓"}
                  </span>
                </div>
                {c.targets.map((t) => (
                  <div
                    key={t.id}
                    className={`farm-row ${t.carded ? "carded" : ""}`}
                    onMouseEnter={() => setFocusId(t.id)}
                    onMouseLeave={() => setFocusId(null)}
                  >
                    <button
                      className="farm-check"
                      onClick={() => toggle(t)}
                      aria-label={t.carded ? "Mark not carded" : "Mark carded"}
                    >
                      {t.carded ? "✓" : ""}
                    </button>
                    <span className="farm-addr">{t.address}</span>
                    <a
                      className="farm-dir"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(t.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Directions"
                    >
                      ↗
                    </a>
                    <button className="farm-del" onClick={() => remove(t)} aria-label="Remove" title="Remove">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
