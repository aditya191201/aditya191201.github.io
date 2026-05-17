/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck — R3F v9 JSX types / React 19 namespace workaround
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Floating geometric particle that drifts and rotates
function FloatingParticle({
  position,
  speed,
  rotationAxis,
  size,
  color,
}: {
  position: THREE.Vector3;
  speed: number;
  rotationAxis: THREE.Vector3;
  size: number;
  color: THREE.Color;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const originY = position.y;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    // Gentle bob up and down
    meshRef.current.position.y = originY + Math.sin(t) * 0.3;
    // Slow rotation
    meshRef.current.rotation.x += rotationAxis.x * 0.003;
    meshRef.current.rotation.y += rotationAxis.y * 0.003;
    meshRef.current.rotation.z += rotationAxis.z * 0.002;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshBasicMaterial color={color} transparent opacity={0.18} wireframe />
    </mesh>
  );
}

// Small dot particle field
function ParticleField({
  count,
  accentColor,
  secondaryColor,
}: {
  count: number;
  accentColor: string;
  secondaryColor: string;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color(accentColor);
    const c2 = new THREE.Color(secondaryColor);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = Math.random() > 0.5 ? c1 : c2;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count, accentColor, secondaryColor]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.012;
    pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.008) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

// Slowly drifting ring
function DriftingRing({
  position,
  radius,
  color,
  speed,
}: {
  position: THREE.Vector3;
  radius: number;
  color: THREE.Color;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    meshRef.current.rotation.x = t * 0.4;
    meshRef.current.rotation.z = t * 0.25;
    meshRef.current.position.y = position.y + Math.sin(t * 0.7) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, 0.015, 6, 60]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} />
    </mesh>
  );
}

function Scene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  const accentColor = isDark ? "#00d4ff" : "#0284c7";
  const secondaryColor = isDark ? "#7c3aed" : "#6d28d9";
  const accent3 = new THREE.Color(accentColor);
  const secondary3 = new THREE.Color(secondaryColor);

  // Floating geometric particles
  const particles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 5 - 2
      ),
      speed: 0.3 + Math.random() * 0.5,
      rotationAxis: new THREE.Vector3(
        Math.random(),
        Math.random(),
        Math.random()
      ).normalize(),
      size: 0.12 + Math.random() * 0.25,
      color: Math.random() > 0.5 ? accent3.clone() : secondary3.clone(),
    }));
  }, [isDark]);

  // Rings
  const rings = useMemo(() => [
    { position: new THREE.Vector3(-5, 1.5, -3), radius: 1.8, color: accent3.clone(), speed: 0.18 },
    { position: new THREE.Vector3(5, -1, -4), radius: 2.4, color: secondary3.clone(), speed: 0.12 },
    { position: new THREE.Vector3(0, -2.5, -5), radius: 3, color: accent3.clone(), speed: 0.09 },
  ], [isDark]);

  // Subtle mouse parallax on the whole scene
  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    }, { passive: true });
  }

  useFrame(() => {
    if (!groupRef.current) return;
    // Smooth follow
    targetRef.current.x += (mouseRef.current.x * 0.4 - targetRef.current.x) * 0.04;
    targetRef.current.y += (mouseRef.current.y * 0.2 - targetRef.current.y) * 0.04;
    groupRef.current.rotation.y = targetRef.current.x;
    groupRef.current.rotation.x = targetRef.current.y;
  });

  return (
    <group ref={groupRef}>
      <ParticleField count={220} accentColor={accentColor} secondaryColor={secondaryColor} />
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}
      {rings.map((r, i) => (
        <DriftingRing key={i} {...r} />
      ))}
    </group>
  );
}

export default function HeroBackground({ isDark = true }: { isDark?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 65 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: false }}
    >
      <Scene isDark={isDark} />
    </Canvas>
  );
}
