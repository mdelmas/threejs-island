import "./App.css";

// import { Canvas } from "@react-three/fiber";
// import * as THREE from "three";

// import Experience from "./components/Experience";

function Scene() {
  return (
    <>
      <h1>hello</h1>
      <img src="/textures/distanceMap.png" />
      {/* <Canvas
        camera={{ position: [18, 6, 18], fov: 50 }}
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
      </Canvas> */}
    </>
  );
}

export default function App() {
  return <Scene />;
}
