import "./App.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

import { Perf } from "r3f-perf";

import Island from "./components/Island";
import Water from "./components/Water";
import Fishes from "./components/Fishes";

function Scene() {
  return (
    <>
      <Canvas
        camera={{ position: [10, 8, 10], fov: 40 }}
        gl={{ antialias: true }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.Fog("#ffffff", 40, 140);
        }}
      >
        <Perf position="top-left" />

        <ambientLight intensity={1.5} castShadow />
        <directionalLight position={[5, 10, 5]} intensity={3} castShadow />

        <OrbitControls />

        <Island />
        <Water />
        <Fishes />
      </Canvas>
    </>
  );
}

export default function App() {
  return <Scene />;
}
