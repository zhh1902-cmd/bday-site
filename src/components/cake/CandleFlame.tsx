"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, PointLight } from "three";

type CandleFlameProps = {
  extinguishRequested: boolean;
  extinguished: boolean;
  reducedMotion: boolean;
};

export function CandleFlame({ extinguishRequested, extinguished, reducedMotion }: CandleFlameProps) {
  const flame = useRef<Mesh>(null);
  const light = useRef<PointLight>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (flame.current) {
      const flicker = extinguishRequested ? Math.abs(Math.sin(time * 27)) * 0.5 : reducedMotion ? 0.04 : Math.sin(time * 8) * 0.08;
      const visibility = extinguished ? 0 : 1;
      flame.current.scale.set(visibility * (1 + flicker), visibility * (1.15 + flicker), visibility * (1 + flicker));
      flame.current.rotation.z = reducedMotion ? 0 : Math.sin(time * 6) * 0.08;
    }
    if (light.current) {
      const visibility = extinguished ? 0 : extinguishRequested ? Math.abs(Math.sin(time * 22)) : 1;
      light.current.intensity = visibility * (reducedMotion ? 0.8 : 1.15);
    }
  });

  return (
    <>
      <mesh ref={flame} position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color="#f5e6d3" />
      </mesh>
      <pointLight ref={light} position={[0, 0.3, 0.08]} color="#d4af6a" distance={2.4} decay={2} intensity={1.1} />
      {extinguished && (
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#b76e79" transparent opacity={0.18} />
        </mesh>
      )}
    </>
  );
}