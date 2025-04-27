import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

import Island from "./Island";
// import Water from "./Water";
// import Fishes from "./Fishes";
// import PaperMaterial from "./PaperMaterial";
import WaterLines from "./WaterLines";
import Lights from "./Lights";
import { useEffect, useRef } from "react";

export default function Experience() {
  const { backgroundColor } = useControls({
    backgroundColor: { value: "#74e6ff" },
  });

  const {
    minDistance,
    maxDistance,
    minPolarAngle,
    maxPolarAngle,
    dampingFactor,
    rotateSpeed,
    minAzimuthAngle,
    maxAzimuthAngle,
  } = useControls("camera controls", {
    minDistance: { value: 20, min: 0, max: 200, step: 1 },
    maxDistance: { value: 80, min: 0, max: 200, step: 1 },
    minPolarAngle: { value: 0, min: 0, max: Math.PI, step: Math.PI / 12 },
    maxPolarAngle: {
      value: Math.PI / 2 - Math.PI / 12,
      min: 0,
      max: Math.PI,
      step: Math.PI / 12,
    },
    minAzimuthAngle: {
      value: -Math.PI / 2,
      min: -2 * Math.PI,
      max: Math.PI,
      step: Math.PI / 12,
    },
    maxAzimuthAngle: {
      value: Math.PI / 2,
      min: 0,
      max: 2 * Math.PI,
      step: Math.PI / 12,
    },
    dampingFactor: { value: 0.05, min: 0, max: 2, step: 0.05 },
    rotateSpeed: { value: 1, min: 0, max: 2, step: 0.05 },
  });

  // @ts-expect-error: Error with OrbitControls type, but needs to be typed otherwise error when accessing uniform
  const controlsRef = useRef<OrbitControls>(null);

  useEffect(() => {
    if (!controlsRef.current) return;

    const azimuth = controlsRef.current.getAzimuthalAngle();
    controlsRef.current.minAzimuthAngle = azimuth - maxAzimuthAngle;
    controlsRef.current.maxAzimuthAngle = azimuth + maxAzimuthAngle;
  }, [maxAzimuthAngle]);

  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      <Perf position="top-left" />

      <Lights debug={false} />
      <OrbitControls
        ref={controlsRef}
        target={[-6, 0, 0]} // offset camera on the left
        // limit zoom in/out
        minDistance={minDistance}
        maxDistance={maxDistance}
        // limit horizontal rotation
        minPolarAngle={minPolarAngle}
        maxPolarAngle={maxPolarAngle} // Math.PI / 2 = vue horizontale
        // limit vertical rotation
        minAzimuthAngle={minAzimuthAngle} // -45° à gauche
        maxAzimuthAngle={maxAzimuthAngle} // +45° à droite
        // damping
        enableDamping
        dampingFactor={dampingFactor}
        rotateSpeed={rotateSpeed}
      />

      <Island />
      {/* <Water /> */}
      {/* <Fishes /> */}

      <WaterLines />
      {/* <Water /> */}

      {/* <mesh>
            <sphereGeometry args={[10, 32, 32]} />
            <PaperMaterial baseColor="red" />
            </mesh> */}
    </>
  );
}
