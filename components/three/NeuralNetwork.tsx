/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck — R3F v8 JSX types are not yet compatible with React 19 JSX namespace
"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

// Generate neural network node positions in 3D space (layered clusters)
function generateNodes(count: number): THREE.Vector3[] {
  const nodes: THREE.Vector3[] = [];
  const layers = [6, 10, 12, 10, 6, 6]; // nodes per layer
  let nodeIndex = 0;

  layers.forEach((layerCount, layerIdx) => {
    const x = (layerIdx - layers.length / 2) * 1.4;
    for (let i = 0; i < layerCount && nodeIndex < count; i++) {
      const angle = (i / layerCount) * Math.PI * 2;
      const radius = 0.8 + Math.random() * 0.5;
      const y = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      nodes.push(new THREE.Vector3(x + (Math.random() - 0.5) * 0.3, y, z));
      nodeIndex++;
    }
  });

  // Fill remaining
  while (nodeIndex < count) {
    nodes.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3
      )
    );
    nodeIndex++;
  }

  return nodes;
}

// Generate edges between nodes (connect nearby nodes)
function generateEdges(nodes: THREE.Vector3[], maxDist: number, maxEdges: number) {
  const edges: [THREE.Vector3, THREE.Vector3][] = [];

  for (let i = 0; i < nodes.length && edges.length < maxEdges; i++) {
    for (let j = i + 1; j < nodes.length && edges.length < maxEdges; j++) {
      const dist = nodes[i].distanceTo(nodes[j]);
      if (dist < maxDist && Math.random() > 0.3) {
        edges.push([nodes[i], nodes[j]]);
      }
    }
  }

  return edges;
}

interface NodeMeshProps {
  position: THREE.Vector3;
  index: number;
  accentColor: string;
}

function NodeMesh({ position, index, accentColor }: NodeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pulseOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const baseScale = useMemo(() => 0.04 + Math.random() * 0.04, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() + pulseOffset;
    const pulse = 1 + Math.sin(t * 1.5) * 0.3;
    meshRef.current.scale.setScalar(baseScale * pulse);
  });

  const color = new THREE.Color(accentColor);

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

interface SceneProps {
  isDark: boolean;
}

function Scene({ isDark }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  const accentColor = isDark ? "#00d4ff" : "#0284c7";
  const edgeColor = isDark ? "#7c3aed" : "#6d28d9";

  const nodes = useMemo(() => generateNodes(40), []);
  const edges = useMemo(() => generateEdges(nodes, 2.2, 60), [nodes]);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  }, [gl]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Slow auto-rotation
    groupRef.current.rotation.y = t * 0.08 + mouseRef.current.x * 0.3;
    groupRef.current.rotation.x = mouseRef.current.y * 0.2;
  });

  const edgeColor3 = new THREE.Color(edgeColor);

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <NodeMesh key={i} position={pos} index={i} accentColor={accentColor} />
      ))}

      {/* Edges */}
      {edges.map(([start, end], i) => (
        <Line
          key={i}
          points={[start, end]}
          color={edgeColor3}
          lineWidth={0.5}
          transparent
          opacity={0.25}
        />
      ))}
    </group>
  );
}

interface NeuralNetworkProps {
  isDark?: boolean;
}

export default function NeuralNetwork({ isDark = true }: NeuralNetworkProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <Scene isDark={isDark} />
    </Canvas>
  );
}
