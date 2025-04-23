import "./App.css";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import Experience from "./components/Experience";

function Scene() {
  return (
    <>
      <Canvas
        camera={{ position: [10, 8, 10], fov: 40 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        // onCreated={({ scene }) => {
        //   // scene.fog = new THREE.Fog("#defaff", 40, 140);
        //   scene.background = backgroundColor;
        // }}
        // linear
        // flat
      >
        <Experience />
      </Canvas>
    </>
  );
}

export default function App() {
  return <Scene />;
}
