import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

import Island from "./Island";
import Tree from "./Tree";
import Water from "./Water";
// import Fishes from "./Fishes";
// import PaperMaterial from "./PaperMaterial";
import WaterLines from "./WaterLines";
import Lights from "./Lights";

export default function Experience() {
  const { debug, backgroundColor, fogNear, fogFar } = useControls("general scene", {
    debug: false,
    backgroundColor: { value: "#b3f1ff" },
    fogNear: { value: 75, min: 0, max: 300, step: 1 },
    fogFar: { value: 200, min: 0, max: 300, step: 1 },
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
      value: Math.PI / 2 - 0.01,
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
      {/* CANVAS SETUP */}
      <color attach="background" args={[backgroundColor]} />
      <fog attach="fog" args={[backgroundColor, fogNear, fogFar]} />
      <Lights debug={debug} />
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
      {/* DEBUG */}
      { debug && <axesHelper args={[10]} /> /* x: red, y: green, z: blue */ }
      <Perf position="top-left" />
      {/* ELEMENTS */}
      <Island />
      <Tree />
      {/* <Water /> */}
      {/* <Fishes /> */}
      {/* <Water /> */}
      <WaterLines />
      {/* <mesh>
            <sphereGeometry args={[10, 32, 32]} />
            <PaperMaterial baseColor="red" />
            </mesh> */}
    </>
  );
}
