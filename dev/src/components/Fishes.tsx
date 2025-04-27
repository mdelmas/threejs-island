import { useControls } from "leva";
import { useStore } from "../stores/store";
// import { getRandomBetween } from "../utils/utils";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useMemo } from "react";

export default function Fishes() {
  const waterLevel = useStore((state) => state.waterLevel);
  // const waveAmplitude = useStore((state) => state.waveAmplitude);

  const { fishesBaseColor, fishesOpacity } = useControls({
    fishesBaseColor: { value: "#255c51" },
    fishesOpacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
  });

  const fishesColor = useMemo(
    () => new THREE.Color(fishesBaseColor),
    [fishesBaseColor]
  );

  const fishesLevel = waterLevel + 0.2;
  // const fishesLevel = getRandomBetween(0, waterLevel - waveAmplitude);
  const alphaMap = useLoader(TextureLoader, "/textures/fishesAlphaMap.png");
  console.log(alphaMap);

  return (
    <mesh rotation-x={-Math.PI / 2} position={[6, fishesLevel, 6]}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial
        color={fishesColor}
        alphaMap={alphaMap}
        opacity={fishesOpacity}
        transparent
      />
    </mesh>
  );
}
