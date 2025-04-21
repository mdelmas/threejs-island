import { useEffect, useMemo, useRef } from "react";
import { useStore } from "../stores/store";
import { useControls } from "leva";
import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { useFrame } from "@react-three/fiber";

import waterVertexShader from "../shaders/water/vertex.glsl?raw";
import waterFragmentShader from "../shaders/water/fragment.glsl?raw";

export default function Water() {
  const waterLevelInitial = useStore((state) => state.waterLevel);
  const waveSpeedInitial = useStore((state) => state.waveSpeed);
  const waveAmplitudeInitial = useStore((state) => state.waveAmplitude);

  const {
    coastColor,
    waterLevel,
    waterOpacity,
    waveSpeed,
    waveAmplitude,
    textureSize,
    farBaseColor,
  } = useControls({
    coastColor: { value: "#00fccd" },
    waterLevel: { value: waterLevelInitial, min: 0, max: 1, step: 0.01 },
    waterOpacity: { value: 0.6, min: 0, max: 1, step: 0.01 },
    waveSpeed: { value: waveSpeedInitial, min: 0, max: 2, step: 0.1 },
    waveAmplitude: {
      value: waveAmplitudeInitial,
      min: 0,
      max: 0.5,
      step: 0.05,
    },
    textureSize: { value: 50, min: 0, max: 100, step: 1 },
    farBaseColor: { value: "#45baa5" },
  });

  const farColor = useMemo(() => new THREE.Color(farBaseColor), [farBaseColor]);

  // @ts-expect-error: Error with CustomShaderMaterial type, but needs to be typed otherwise error when accessing uniform
  const materialRef = useRef<CustomShaderMaterial>(null);

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uWaveSpeed.value = waveSpeed;
    materialRef.current.uniforms.uWaveAmplitude.value = waveAmplitude;
    materialRef.current.uniforms.uTextureSize.value = textureSize;
    materialRef.current.uniforms.uColorFar.value = farColor; // TODO : change variable name to make theme more coherent
  }, [waveSpeed, waveAmplitude, textureSize, farColor]);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  useEffect(() => {
    useStore.setState({ waterLevel, waveAmplitude, waveSpeed });
  }, [waterLevel, waveAmplitude, waveSpeed]);

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, waterLevel, 0]} receiveShadow>
      <planeGeometry args={[512, 512]} />
      {/* <meshStandardMaterial color="paleturquoise" /> */}
      <CustomShaderMaterial
        ref={materialRef}
        baseMaterial={THREE.MeshStandardMaterial}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        color={coastColor}
        transparent
        roughness={0}
        opacity={waterOpacity}
        uniforms={{
          uTime: { value: 0 },
          uWaveSpeed: { value: waveSpeed },
          uWaveAmplitude: { value: waveAmplitude },
          uTextureSize: { value: textureSize },
          uColorFar: { value: farColor },
        }}
      />
    </mesh>
  );
}

/*

CHATGPT VERSION

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { useStore } from "../stores/store";

import waterVertexShader from "../shaders/waterChatGPT/vertex.glsl?raw";
import waterFragmentShader from "../shaders/waterChatGPT/fragment.glsl?raw";
import CustomShaderMaterial from 'three-custom-shader-material';

export default function Water() {
  const ref = useRef<THREE.ShaderMaterial>(null!);

  useFrame(() => {
    if (ref.current) {
      ref.current.uniforms.time.value = performance.now() / 1000;
    }
  });

  return (
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[1000, 1000, 100, 100]} />
      <shaderMaterial
        ref={ref}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        uniforms={{
          time: { value: 0 },
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

*/
