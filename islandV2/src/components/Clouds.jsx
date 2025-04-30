import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useGLTF, useTexture, Float } from "@react-three/drei";
import { zlib } from "three/examples/jsm/libs/fflate.module.js";

const cloudNames = ["cloud1", "cloud2", "cloud3", "cloud4", "cloud5"];

const getRandomBetween = (min, max) => Math.random() * (max - min) + min;
const getRandomIntBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomCloudPosition = () => {
  const x = getRandomBetween(-2, 1);

  let z = getRandomBetween(-2, 1);
  while (x + z > 0) {
    z = getRandomBetween(-2, 1);
  }

  const y = 1.2 + getRandomBetween(-0.2, 0.2);

  return { x, y, z };
};

function Cloud() {
  const model = useGLTF("./model/clouds/model.glb");
  const bakedTexture = useTexture("./model/clouds/bake.jpg");
  bakedTexture.flipY = false;

  const cloudType = useMemo(
    () => cloudNames[Math.floor(Math.random() * cloudNames.length)],
    [cloudNames]
  );
  const scale = useMemo(() => getRandomBetween(0.8, 1.2), []);
  const pos = useMemo(() => getRandomCloudPosition(), []);

  const floatIntensity = useMemo(() => getRandomBetween(0.6, 1), []);

  return (
    <Float
      speed={floatIntensity}
      rotationIntensity={floatIntensity}
      floatIntensity={floatIntensity}
    >
      <mesh
        geometry={model.nodes[cloudType].geometry}
        position={[pos.x, pos.y, pos.z]}
        scale={scale}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </Float>
  );
}

export default function Clouds() {
  const count = useMemo(() => getRandomIntBetween(2, 5), []); // entre 0 et 5
  const clouds = useMemo(() => Array.from({ length: count }), [count]);

  return (
    <>
      {clouds.map((_, i) => (
        <Cloud key={i} />
      ))}
    </>
  );
}
