import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

import Island from "./Island";
import Water from "./Water";
import Fishes from "./Fishes";
import PaperMaterial from "./PaperMaterial";
import WaterLines from "./WaterLines";
import Lights from "./Lights";

export default function Experience() {
  const { backgroundColor } = useControls({
    backgroundColor: { value: "#74e6ff" },
  });

  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      <Perf position="top-left" />

      <Lights debug={false} />
      <OrbitControls />

      <Island />
      {/* <Water /> */}
      {/* <Fishes /> */}

      <WaterLines />

      {/* <mesh>
            <sphereGeometry args={[10, 32, 32]} />
            <PaperMaterial baseColor="red" />
            </mesh> */}
    </>
  );
}
