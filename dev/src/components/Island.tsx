import * as THREE from "three";
import { Mesh } from "three";
import { useGLTF } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";
import { useControls } from "leva";

import { useStore } from "../stores/store";

import islandVertexShader from "../shaders/island/vertex.glsl?raw";
import islandFragmentShader from "../shaders/island/fragment.glsl?raw";
import { useEffect, useMemo, useRef } from "react";
console.log(islandFragmentShader, islandVertexShader);

export default function Island() {
  useStore((state) => console.log("state", state));

  const model = useGLTF("./models/landscape.glb");
  const mesh = model.nodes.island as Mesh;

  const { sandBaseColor, grassBaseColor, underwaterBaseColor } = useControls({
    sandBaseColor: { value: "#ffb600" },
    grassBaseColor: { value: "#adff2f" },
    underwaterBaseColor: { value: "#24d6b8" },
  });

  const grassColor = useMemo(
    () => new THREE.Color(grassBaseColor),
    [grassBaseColor]
  );
  const underwaterColor = useMemo(
    () => new THREE.Color(underwaterBaseColor),
    [underwaterBaseColor]
  );

  const waterLevel = useStore((state) => state.waterLevel);

  const materialRef =
    // @ts-expect-error: Error with CustomShaderMaterial type, but needs to be typed otherwise error when accessing uniform
    useRef<CustomShaderMaterial>(null);

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uGrassColor.value = grassColor;
    materialRef.current.uniforms.uUnderwaterColor.value = underwaterColor;
    materialRef.current.uniforms.uWaterLevel.value = waterLevel;

    console.log("updating uniforms", materialRef.current.uniforms);
  }, [grassColor, underwaterColor, waterLevel]);

  return (
    <group>
      <mesh geometry={mesh.geometry} receiveShadow scale={10}>
        {/* <meshStandardMaterial color="greenyellow" /> */}
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshStandardMaterial}
          color={sandBaseColor}
          vertexShader={islandVertexShader}
          fragmentShader={islandFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uGrassColor: { value: grassColor },
            uUnderwaterColor: { value: underwaterColor },
            uWaterLevel: { value: waterLevel },
          }}
        />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[256, 256]} />
        <meshStandardMaterial color={underwaterBaseColor} />
      </mesh>
    </group>
  );
}

/*
  <meshStandardMaterial color="greenyellow" /> 

  <primitive object={model.scene} {...rest} /> 

  // <mesh position={[0, 1, 0]}>
  //   <boxGeometry args={[5, 2, 5]} />
  //   <meshToonMaterial color="#dab185" />
  // </mesh>
*/
