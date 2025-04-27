import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Lights({ debug = false }) {
  const directionalLight = useRef<THREE.Object3D>(null);
  const directionalLight2 = useRef<THREE.Object3D>(null);

  useHelper(
    debug && (directionalLight as React.RefObject<THREE.Object3D>),
    THREE.DirectionalLightHelper,
    4
  );
  useHelper(
    debug && (directionalLight2 as React.RefObject<THREE.Object3D>),
    THREE.DirectionalLightHelper,
    2
  );

  // const rectAreaLight = useRef<THREE.Object3D>(null);
  // useHelper(
  //   rectAreaLight as React.RefObject<THREE.Object3D>,
  //   RectAreaLightHelper,
  //   5
  // );

  return (
    <>
      <ambientLight intensity={1} castShadow />
      <directionalLight
        ref={directionalLight}
        position={[5, 5, 5]}
        intensity={1}
        castShadow
      />
      <directionalLight
        ref={directionalLight2}
        position={[-5, 10, 5]}
        intensity={0.5}
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
