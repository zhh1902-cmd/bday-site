import { CandleFlame } from "@/components/cake/CandleFlame";

type CandleProps = {
  position: [number, number, number];
  extinguishRequested: boolean;
  extinguished: boolean;
  reducedMotion: boolean;
};

export function Candle({ position, extinguishRequested, extinguished, reducedMotion }: CandleProps) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.07, 0.07, 0.65, 16]} />
        <meshStandardMaterial color="#f5e6d3" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.17, 0]}>
        <torusGeometry args={[0.08, 0.015, 8, 20]} />
        <meshStandardMaterial color="#d4af6a" metalness={0.75} roughness={0.25} />
      </mesh>
      <CandleFlame extinguishRequested={extinguishRequested} extinguished={extinguished} reducedMotion={reducedMotion} />
    </group>
  );
}