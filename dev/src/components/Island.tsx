import * as THREE from "three";
import { Mesh } from "three";
import { useGLTF } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";
import { useControls } from "leva";

import { useStore } from "../stores/store";

import islandVertexShader from "../shaders/island/vertex.glsl?raw";
import islandFragmentShader from "../shaders/island/fragment.glsl?raw";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Island() {
  // const model = useGLTF("./models/landscape.glb");
  // const mesh = model.nodes.island as Mesh;
  const model = useGLTF("/models/islandV2.glb");
  console.log(model);
  const mesh = model.nodes.island as Mesh;
  console.log(mesh);

  const waterLevel = useStore((state) => state.waterLevel);
  const waveSpeed = useStore((state) => state.waveSpeed);
  const waveAmplitude = useStore((state) => state.waveAmplitude);
  const foamDepthInitial = useStore((state) => state.foamDepth);

  const { sandBaseColor, grassBaseColor, underwaterBaseColor, foamDepth } =
    useControls({
      sandBaseColor: { value: "#ffb600" },
      grassBaseColor: { value: "#adff2f" },
      underwaterBaseColor: { value: "#24d6b8" },
      foamDepth: { value: foamDepthInitial, min: 0, max: 0.2, step: 0.001 },
    });

  const grassColor = useMemo(
    () => new THREE.Color(grassBaseColor),
    [grassBaseColor]
  );
  const underwaterColor = useMemo(
    () => new THREE.Color(underwaterBaseColor),
    [underwaterBaseColor]
  );

  // @ts-expect-error: Error with CustomShaderMaterial type, but needs to be typed otherwise error when accessing uniform
  const materialRef = useRef<CustomShaderMaterial>(null);

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uGrassColor.value = grassColor;
    materialRef.current.uniforms.uUnderwaterColor.value = underwaterColor;
    materialRef.current.uniforms.uWaterLevel.value = waterLevel;
    materialRef.current.uniforms.uFoamDepth.value = foamDepth;
    materialRef.current.uniforms.uWaveSpeed.value = waveSpeed;
    materialRef.current.uniforms.uWaveAmplitude.value = waveAmplitude;
  }, [
    grassColor,
    underwaterColor,
    waterLevel,
    foamDepth,
    waveSpeed,
    waveAmplitude,
  ]);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <group>
      <mesh geometry={mesh.geometry} receiveShadow scale={10}>
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={THREE.MeshToonMaterial}
          color={sandBaseColor}
          vertexShader={islandVertexShader}
          fragmentShader={islandFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uWaveSpeed: { value: 0 },
            uWaveAmplitude: { value: 0 },
            uWaterLevel: { value: waterLevel },
            uGrassColor: { value: grassColor },
            uUnderwaterColor: { value: underwaterColor },
            uFoamDepth: { value: foamDepth },
          }}
        />
      </mesh>

      {/* <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[256, 256]} />
        <meshStandardMaterial color={underwaterBaseColor} />
      </mesh> */}
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
