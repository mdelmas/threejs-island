import "./App.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

import Island from "./components/Island";
import Water from "./components/Water";

function Scene() {
  // Dégradé de fond
  // const background = new THREE.CanvasTexture(
  //   (() => {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = 1;
  //     canvas.height = 256;
  //     const ctx = canvas.getContext("2d")!;
  //     const grad = ctx.createLinearGradient(0, 0, 0, 256);
  //     grad.addColorStop(0, "#ffffff"); // top
  //     grad.addColorStop(1, "#205b85"); // horizon
  //     ctx.fillStyle = grad;
  //     ctx.fillRect(0, 0, 1, 256);
  //     return canvas;
  //   })()
  // );

  return (
    <Canvas
      camera={{ position: [10, 8, 10], fov: 40 }}
      gl={{ antialias: true }}
      onCreated={({ scene }) => {
        //   scene.background = background;
        scene.fog = new THREE.Fog("#ffffff", 40, 140);
      }}
    >
      <ambientLight intensity={1.5} castShadow />
      <directionalLight position={[5, 10, 5]} intensity={3} castShadow />

      <OrbitControls />
      <Island />
      <Water />
    </Canvas>
  );
}

export default function App() {
  return <Scene />;
}
