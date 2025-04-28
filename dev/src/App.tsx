import "./App.css";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import Experience from "./components/Experience";

function Scene() {
  return (
    <>
      <Canvas
        camera={{ position: [18, 6, 18], fov: 50 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
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
