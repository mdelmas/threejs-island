import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

import Island from "./components/Island.jsx";
import Water from "./components/Water.jsx";
import Clouds from "./components/Clouds.jsx";

export default function Experience() {
  const { skyColor } = useControls({ skyColor: "#c6f6ff" });

  return (
    <>
      {/* 
        SCENE SETUP
      */}
      <OrbitControls
        target={[-0.4, 0.2, 0]}
        enablePan={false}
        // limit zoom in/out
        minDistance={1.5}
        maxDistance={6}
        // limit horizontal rotation
        minPolarAngle={Math.PI / 12}
        maxPolarAngle={Math.PI / 2}
        // limit vertical rotation
        minAzimuthAngle={-Math.PI / 4 - Math.PI / 12}
        maxAzimuthAngle={Math.PI / 2}
      />
      {/* <axesHelper args={[10]} /> // x: red, y: green, z: blue */}
      <color args={[skyColor]} attach="background" />
      <directionalLight position={[1, 2, 3]} intensity={4.5} castShadow />
      <fog attach="fog" args={[skyColor, 20, 40]} />
      {/* 
        SCENE ELEMENTS 
      */}
      <Island />
      <Water />
      <Clouds />
    </>
  );
}
