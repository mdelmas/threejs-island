import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense } from "react";

import Experience from "./Experience.jsx";
import Loader from "./components/Loader.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Leva hidden={true} />
    <Loader />
    <Canvas
      camera={{
        fov: 60,
        position: [1, 0.6, 2],
      }}
    >
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </Canvas>
    <div id="link">
      made by <a href="https://github.com/mdelmas">@mdelmas</a>
    </div>
  </>
);
