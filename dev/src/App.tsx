import "./App.css";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import Island from "./components/Island";
import Water from "./components/Water";
import Fishes from "./components/Fishes";
import PaperMaterial from "./materials/PaperMaterial";
import WaterLines from "./components/WaterLines";
import Lights from "./components/Lights";

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
        onCreated={({ scene }) => {
          // scene.fog = new THREE.Fog("#defaff", 40, 140);
          scene.background = new THREE.Color("#74e6ff");
        }}
      >
        <Perf position="top-left" />

        <Lights />
        <OrbitControls />

        {/* <Island /> */}
        {/* <Water /> */}
        {/* <Fishes /> */}

        <WaterLines />

        {/* <mesh>
          <sphereGeometry args={[10, 32, 32]} />
          <PaperMaterial baseColor="red" />
        </mesh> */}
      </Canvas>
    </>
  );
}

export default function App() {
  return <Scene />;
}
