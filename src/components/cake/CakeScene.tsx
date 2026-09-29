"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

import { CakeModel } from "@/components/cake/CakeModel";

type CakeSceneProps = {
  extinguishRequested: boolean;
  extinguished: boolean;
};

export function CakeScene({ extinguishRequested, extinguished }: CakeSceneProps) {
  return (
    <div className="relative h-[50vh] min-h-88 w-full max-w-3xl sm:h-[58vh] sm:min-h-112" aria-label="Interactive 3D birthday cake scene" role="img">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.1, 6], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.42} color="#f5e6d3" />
        <directionalLight position={[-3, 4, 3]} intensity={1.2} color="#f5e6d3" castShadow />
        <pointLight position={[2.3, 1.5, 2]} intensity={1.5} distance={7} color="#7b2038" />
        <CakeModel extinguishRequested={extinguishRequested} extinguished={extinguished} />
        <Sparkles count={24} scale={[4.5, 3.8, 3]} size={2.1} speed={0.18} color="#d4af6a" opacity={0.5} />
      </Canvas>
    </div>
  );
}