import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

export default function Lights() {
  const directionalLight = useRef<THREE.Object3D>(null);
  useHelper(
    directionalLight as React.RefObject<THREE.Object3D>,
    THREE.DirectionalLightHelper,
    5
  );
  const directionalLight2 = useRef<THREE.Object3D>(null);
  useHelper(
    directionalLight2 as React.RefObject<THREE.Object3D>,
    THREE.DirectionalLightHelper,
    5
  );

  // const rectAreaLight = useRef<THREE.Object3D>(null);
  // useHelper(
  //   rectAreaLight as React.RefObject<THREE.Object3D>,
  //   RectAreaLightHelper,
  //   5
  // );

  return (
    <>
      <ambientLight intensity={5} castShadow />
      <directionalLight
        ref={directionalLight}
        position={[5, 5, 5]}
        intensity={2}
        castShadow
      />
      <directionalLight
        ref={directionalLight2}
        position={[-5, 10, 5]}
        intensity={1}
        castShadow
      />
      {/* <rectAreaLight
        ref={rectAreaLight}
        width={20}
        height={20}
        intensity={4}
        color="#ffffff"
        position={[0, 5, 10]}
        lookAt={[0, 0, 0]}
        castShadow
      /> */}
    </>
  );
}
