import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import Experience from "./Experience.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Leva hidden={true} />
    <Canvas
      camera={{
        fov: 60,
        position: [1, 0.6, 2],
      }}
    >
      <Experience />
    </Canvas>
  </>
);
