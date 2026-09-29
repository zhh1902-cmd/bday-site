"use client";

import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Group } from "three";

import { cakeConfig } from "@/data/cake";
import { Candle } from "@/components/cake/Candle";

type CakeModelProps = {
  extinguishRequested: boolean;
  extinguished: boolean;
};

const candlePositions: [number, number, number][] = [
  [-0.65, 1.22, 0.05],
  [-0.32, 1.22, 0.18],
  [0, 1.22, 0.05],
  [0.32, 1.22, 0.18],
  [0.65, 1.22, 0.05],
];

export function CakeModel({ extinguishRequested, extinguished }: CakeModelProps) {
  const group = useRef<Group>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useFrame(({ clock }) => {
    if (!group.current || shouldReduceMotion) return;
    const time = clock.getElapsedTime();
    group.current.rotation.y = Math.sin(time * 0.22) * 0.09;
    group.current.position.y = Math.sin(time * 0.6) * 0.025;
  });

  return (
    <group ref={group} position={[0, -1.2, 0]}>
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.65, 1.72, 0.38, 48]} />
        <meshStandardMaterial color="#3a101e" roughness={0.32} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.38, 0]} castShadow>
        <torusGeometry args={[1.48, 0.13, 16, 48]} />
        <meshStandardMaterial color="#f5e6d3" roughness={0.28} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.23, 1.28, 0.35, 48]} />
        <meshStandardMaterial color="#5a172b" roughness={0.35} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.82, 0]} castShadow>
        <torusGeometry args={[1.1, 0.11, 16, 48]} />
        <meshStandardMaterial color="#f5e6d3" roughness={0.3} metalness={0.08} />
      </mesh>
      <mesh position={[0, 1.03, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.92, 0.98, 0.3, 48]} />
        <meshStandardMaterial color="#4a1020" roughness={0.33} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.22, 0]}>
        <torusGeometry args={[0.79, 0.1, 16, 48]} />
        <meshStandardMaterial color="#d4af6a" roughness={0.28} metalness={0.72} />
      </mesh>
      {candlePositions.slice(0, cakeConfig.candleCount).map((position, index) => (
        <Candle key={index} position={position} extinguishRequested={extinguishRequested} extinguished={extinguished} reducedMotion={shouldReduceMotion} />
      ))}
    </group>
  );
}