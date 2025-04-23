import { useEffect, useMemo, useRef } from "react";
import { TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { useControls } from "leva";

import waterLinesFragmentShader from "../shaders/waterLines/fragment.glsl?raw";
import waterLinesVertexShader from "../shaders/waterLines/vertex.glsl?raw";
console.log(waterLinesFragmentShader, waterLinesVertexShader);

export default function WaterLines() {
  const distanceMap = useLoader(
    TextureLoader,
    "./textures/islandDistanceMap.png"
  );
  console.log(distanceMap);
  const perlinNoise = useLoader(TextureLoader, "./textures/noise/perlin1.png");
  console.log(perlinNoise);

  // @ts-expect-error: Error with CustomShaderMaterial type, but needs to be typed otherwise error when accessing uniform
  const materialRef = useRef<CustomShaderMaterial>(null);

  const {
    baseColor,
    frequency,
    noiseFrequency,
    treshold,
    waveSpeed,
    // baseWaveColorWhite,
    // baseWaveColorLightBlue,
    // waveSpeed,
    // waveOffset,
    // waveFrequency,
    // lightBlueWaveWidth,
    // whiteWaveWidth,
  } = useControls({
    baseColor: { value: "#74e6ff" },
    frequency: { value: 3.0, min: 0, max: 10, step: 0.5 },
    noiseFrequency: { value: 0.6, min: 0, max: 1, step: 0.1 },
    treshold: { value: 0.1, min: 0, max: 1, step: 0.1 },
    waveSpeed: { value: 0.1, min: 0, max: 1, step: 0.1 },
    // baseWaveColorLightBlue: { value: "#abf6ff" },
    // baseWaveColorWhite: { value: "#f9feff" },
    // waveSpeed: { value: 1, min: 0, max: 10, step: 0.1 },
    // waveOffset: { value: 0.3, min: 0, max: 2, step: 0.01 },
    // waveFrequency: { value: 4.0, min: 0, max: 40, step: 1 },
    // lightBlueWaveWidth: { value: 0.05, min: 0, max: 0.4, step: 0.01 },
    // whiteWaveWidth: { value: 0.005, min: 0, max: 0.1, step: 0.001 },
  });

  // const waveColorWhite = useMemo(
  //   () => new THREE.Color(baseWaveColorWhite),
  //   [baseWaveColorWhite]
  // );
  // const waveColorLightBlue = useMemo(
  //   () => new THREE.Color(baseWaveColorLightBlue),
  //   [baseWaveColorLightBlue]
  // );

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uFrequency.value = frequency;
    materialRef.current.uniforms.uNoiseFrequency.value = noiseFrequency;
    materialRef.current.uniforms.uTreshold.value = treshold;
    materialRef.current.uniforms.uWaveSpeed.value = waveSpeed;
    // materialRef.current.uniforms.uWaveColorWhite.value = waveColorWhite;
    // materialRef.current.uniforms.uWaveColorLightBlue.value = waveColorLightBlue;
    // materialRef.current.uniforms.uWaveSpeed.value = waveSpeed;
    // materialRef.current.uniforms.uWaveOffset.value = waveOffset;
    // materialRef.current.uniforms.uWaveFrequency.value = waveFrequency;
    // materialRef.current.uniforms.uLightBlueWaveWidth.value = lightBlueWaveWidth;
    // materialRef.current.uniforms.uWhiteWaveWidth.value = whiteWaveWidth;
  }, [
    frequency,
    noiseFrequency,
    treshold,
    waveSpeed,
    // waveColorWhite,
    // waveColorLightBlue,
    // waveSpeed,
    // waveOffset,
    // waveFrequency,
    // lightBlueWaveWidth,
    // whiteWaveWidth,
  ]);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh rotation-x={-Math.PI / 2} rotation-z={Math.PI / 2} scale={20}>
      <planeGeometry args={[1, 1]} />
      {/* <meshStandardMaterial color={"white"} /> */}
      <CustomShaderMaterial
        ref={materialRef}
        // color={baseColor}
        baseMaterial={THREE.MeshStandardMaterial}
        fragmentShader={waterLinesFragmentShader}
        vertexShader={waterLinesVertexShader}
        uniforms={{
          uTime: { value: 0 },
          uDistanceMap: { value: distanceMap },
          uPerlinNoise: { value: perlinNoise },
          uFrequency: { value: frequency },
          uNoiseFrequency: { value: noiseFrequency },
          uTreshold: { value: treshold },
          uWaveSpeed: { value: waveSpeed },
          // uWaveColorWhite: { value: waveColorWhite },
          // uWaveColorLightBlue: { value: waveColorLightBlue },
          // uWaveSpeed: { value: waveSpeed },
          // uWaveOffset: { value: waveOffset },
          // uWaveFrequency: { value: waveFrequency },
          // uLightBlueWaveWidth: { value: lightBlueWaveWidth },
          // uWhiteWaveWidth: { value: whiteWaveWidth },
        }}
      />
    </mesh>
  );
}
