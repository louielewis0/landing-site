"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { company } from "@/lib/config";

/**
 * Hero3D — the Peachworlds-style scroll experience. A pinned,
 * full-viewport WebGL scene: the brokerage's luxury photography lives
 * as large panels floating in a bright, fog-softened 3D corridor, and
 * scrolling the pinned section (350vh of scroll) flies the camera
 * forward through them while three headline acts cross-fade. Pointer
 * movement adds a subtle camera tilt.
 *
 * Engineering guardrails:
 *  - DPR capped at 2; textures are the already-optimized /public jpgs
 *  - Full teardown on unmount (renderer, geometries, textures, ST)
 *  - prefers-reduced-motion OR no-WebGL → static fallback hero (no
 *    pin, no canvas), so the page never depends on the effect
 */

const PANEL_IMAGES = [
  "/hero-home.jpg",
  "/areas/birmingham-real-estate-agent.jpg",
  "/areas/bloomfield-hills-real-estate-agent.jpg",
  "/areas/cta-interior.jpg",
  "/areas/troy-real-estate-agent.jpg",
  "/areas/kitchen.jpg",
  "/areas/rochester-hills-real-estate-agent.jpg",
  "/areas/modern-white.jpg",
  "/areas/west-bloomfield-real-estate-agent.jpg",
  "/areas/warren-real-estate-agent.jpg",
];

const SPACING = 13; // z distance between panels

export default function Hero3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const act1Ref = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const act3Ref = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      setFallback(true);
      return;
    }
    if (reduce) {
      renderer.dispose();
      setFallback(true);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const scene = new THREE.Scene();
    const CREAM = new THREE.Color("#fafaf8");
    scene.background = CREAM;
    scene.fog = new THREE.Fog(CREAM, 10, 42);

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 18);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const key = new THREE.DirectionalLight(0xfff2e2, 0.9);
    key.position.set(4, 6, 8);
    scene.add(key);

    // ── Photo panels in a corridor ──
    const loader = new THREE.TextureLoader();
    const panels: THREE.Mesh[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    PANEL_IMAGES.forEach((src, i) => {
      const tex = loader.load(src);
      tex.colorSpace = THREE.SRGBColorSpace;
      textures.push(tex);
      const w = 10.5;
      const h = 7;
      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.85,
        metalness: 0,
      });
      geometries.push(geo);
      materials.push(mat);
      const mesh = new THREE.Mesh(geo, mat);
      const side = i % 2 === 0 ? -1 : 1;
      mesh.position.set(
        side * (6.4 + (i % 3) * 0.9),
        (i % 3 === 0 ? 1.4 : i % 3 === 1 ? -1.1 : 0.4),
        -i * SPACING
      );
      mesh.rotation.y = side * -0.38;
      scene.add(mesh);
      panels.push(mesh);
    });

    // ── Gold dust ──
    const COUNT = 260;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = 8 - Math.random() * PANEL_IMAGES.length * SPACING - 10;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: new THREE.Color("#d9762f"),
      size: 0.075,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);
    geometries.push(dustGeo);
    materials.push(dustMat);

    // ── Scroll-driven camera ──
    const travel = { z: 18 };
    const END_Z = -(PANEL_IMAGES.length - 1) * SPACING - 4;
    const pointer = { x: 0, y: 0 };

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "+=350%",
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        travel.z = 18 + (END_Z - 18) * self.progress;
        // Headline acts: 0-0.3 / 0.3-0.66 / 0.66-1
        const p = self.progress;
        const setA = (el: HTMLDivElement | null, on: boolean, shift: number) => {
          if (!el) return;
          el.style.opacity = on ? "1" : "0";
          el.style.transform = `translateY(${on ? 0 : shift}px)`;
        };
        setA(act1Ref.current, p < 0.28, -24);
        setA(act2Ref.current, p >= 0.3 && p < 0.62, p < 0.3 ? 24 : -24);
        setA(act3Ref.current, p >= 0.66, 24);
      },
    });

    const onPointer = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onPointer);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      // camera glide + pointer tilt
      camera.position.z += (travel.z - camera.position.z) * 0.12;
      camera.position.x += (pointer.x * 1.1 - camera.position.x) * 0.05;
      camera.position.y += (-pointer.y * 0.7 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, camera.position.z - 10);
      // gentle life in the panels + dust
      panels.forEach((m, i) => {
        m.position.y += Math.sin(t * 0.5 + i) * 0.0009;
        m.rotation.z = Math.sin(t * 0.3 + i * 2) * 0.004;
      });
      dust.rotation.y = t * 0.012;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      window.removeEventListener("mousemove", onPointer);
      window.removeEventListener("resize", onResize);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((tx) => tx.dispose());
      renderer.dispose();
    };
  }, []);

  // ── Static fallback (reduced motion / no WebGL) ──
  if (fallback) {
    return (
      <section className="s-hero" style={{ minHeight: "92svh", paddingBottom: 60 }}>
        <div className="hero-layer hero-grid" />
        <div
          className="container hero-content"
          style={{ textAlign: "center", alignItems: "center", paddingTop: 150 }}
        >
          <div className="hero-badge" style={{ margin: "0 auto 30px" }}>
            <span className="dot" /> {company.region} · Accepting new clients
          </div>
          <h1 className="hero-title" style={{ margin: "0 auto" }}>
            Sell for top dollar.
            <br />
            Buy with <em>confidence.</em>
          </h1>
          <p className="hero-sub" style={{ margin: "26px auto 36px" }}>
            The team behind $100M+ in closed {company.region} sales.
          </p>
          <div className="hero-ctas" style={{ justifyContent: "center" }}>
            <a href="/home-value" className="btn btn-gold">Request your valuation →</a>
            <a href={`tel:${company.phoneTel}`} className="btn btn-ghost">Call {company.phone}</a>
          </div>
          <div className="hero-media" style={{ width: "100%" }}>
            <div
              className="media-layer"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(22,24,29,0) 45%, rgba(22,24,29,0.72) 100%), url('/hero-home.jpg')",
              }}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={wrapRef} className="hero3d">
      <canvas ref={canvasRef} className="hero3d-canvas" />

      {/* Act 1 — arrival */}
      <div ref={act1Ref} className="hero3d-act">
        <div className="hero-badge" style={{ margin: "0 auto 26px" }}>
          <span className="dot" /> {company.region} · Accepting new clients
        </div>
        <h1 className="hero-title">
          Sell for top dollar.
          <br />
          Buy with <em>confidence.</em>
        </h1>
        <p className="hero-sub" style={{ margin: "22px auto 0" }}>
          Scroll to step inside {company.region}&rsquo;s finest homes.
        </p>
      </div>

      {/* Act 2 — the proof */}
      <div ref={act2Ref} className="hero3d-act" style={{ opacity: 0 }}>
        <h2 className="hero-title" style={{ fontSize: "clamp(36px, 5.4vw, 72px)" }}>
          $100M+ closed.
          <br />
          <em>20 years</em> on these streets.
        </h2>
        <p className="hero-sub" style={{ margin: "22px auto 0" }}>
          Troy · Rochester Hills · Birmingham · Bloomfield Hills &amp; beyond.
        </p>
      </div>

      {/* Act 3 — the ask */}
      <div ref={act3Ref} className="hero3d-act" style={{ opacity: 0 }}>
        <h2 className="hero-title" style={{ fontSize: "clamp(36px, 5.4vw, 72px)" }}>
          Your home is the
          <br />
          next <em>masterpiece.</em>
        </h2>
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: 30 }}>
          <a href="/home-value" className="btn btn-gold">
            Request your valuation →
          </a>
          <a href={`tel:${company.phoneTel}`} className="btn btn-ghost">
            Call {company.phone}
          </a>
        </div>
      </div>

      <div className="scroll-cue" style={{ zIndex: 6 }}>
        <span>Scroll</span>
        <span className="line" />
      </div>
    </div>
  );
}
