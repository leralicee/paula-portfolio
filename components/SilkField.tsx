'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uAspect;
uniform vec2 uPointer;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = vUv * 3.0;
  p.x *= uAspect;

  vec2 pointer = uPointer;
  pointer.x *= uAspect;
  float d = distance(vec2(vUv.x * uAspect, vUv.y), pointer);
  float ripple = 0.45 * exp(-d * 3.2);

  vec2 q = vec2(
    fbm(p + uTime * 0.07),
    fbm(p + vec2(5.2, 1.3) - uTime * 0.05)
  );
  vec2 r = vec2(
    fbm(p + 3.0 * q + vec2(1.7, 9.2) + uTime * 0.1 + ripple),
    fbm(p + 3.0 * q + vec2(8.3, 2.8) - uTime * 0.08)
  );
  float f = fbm(p + 3.4 * r);

  vec3 col = mix(uColorA, uColorB, smoothstep(0.2, 0.8, f));
  col = mix(col, uColorC, smoothstep(0.5, 0.95, r.x) * 0.5);
  col = mix(col, uColorC, ripple * 0.45);
  col = mix(col, uColorA, smoothstep(0.75, 1.0, vUv.y) * 0.35);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function SilkField({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    const size = () => ({ w: container.clientWidth || 1, h: container.clientHeight || 1 });
    let { w, h } = size();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(w, h);
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uAspect: { value: w / h },
      uPointer: { value: new THREE.Vector2(0.5, 0.55) },
      uColorA: { value: new THREE.Color('#FBF6F4') },
      uColorB: { value: new THREE.Color('#F6DCE1') },
      uColorC: { value: new THREE.Color('#E1899B') },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
    });
    scene.add(new THREE.Mesh(geometry, material));

    const targetPointer = new THREE.Vector2(0.5, 0.55);
    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetPointer.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height,
      );
    };

    let raf = 0;
    let visible = true;
    const clock = new THREE.Clock();

    const frame = () => {
      if (!visible) return;
      raf = requestAnimationFrame(frame);
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uPointer.value.lerp(targetPointer, 0.045);
      renderer.render(scene, camera);
    };

    const resize = () => {
      ({ w, h } = size());
      renderer.setSize(w, h);
      uniforms.uAspect.value = w / h;
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && !document.hidden;
        if (visible && !reduced) frame();
      },
      { threshold: 0.02 },
    );
    io.observe(container);

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !reduced) frame();
    };
    document.addEventListener('visibilitychange', onVisibility);

    if (reduced) {
      uniforms.uTime.value = 4;
      renderer.render(scene, camera);
    } else {
      window.addEventListener('pointermove', onMove, { passive: true });
      frame();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  return <div ref={containerRef} aria-hidden className={className} />;
}
