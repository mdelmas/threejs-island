import { useEffect, useRef } from "react";
import { TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { useControls } from "leva";

import waterLinesFragmentShader from "../shaders/waterLines/fragment.glsl?raw";
import waterLinesVertexShader from "../shaders/waterLines/vertex.glsl?raw";

export default function WaterLines() {
  const distanceMapBigIsland = useLoader(
    TextureLoader,
    "./textures/distanceMap/bigIsland.png"
  );
  const distanceMapSmallIsland = useLoader(
    TextureLoader,
    "./textures/distanceMap/smallIsland.png"
  );
  const perlinNoise = useLoader(TextureLoader, "./textures/noise/perlin1.png");

  // @ts-expect-error: Error with CustomShaderMaterial type, but needs to be typed otherwise error when accessing uniform
  const materialRef = useRef<CustomShaderMaterial>(null);

  const {
    frequency,
    noiseFrequency,
    treshold,
    waveSpeed,
    waveWidth,
    oscillationAmplitude,
    oscillationFrequency,
    waveColorIntensity,
    noiseStrength,
  } = useControls("wave shader", {
    frequency: { value: 10.0, min: 0, max: 20, step: 0.5 },
    noiseFrequency: { value: 0.3, min: 0, max: 1, step: 0.05 },
    treshold: { value: 0, min: 0, max: 1, step: 0.05 },
    waveSpeed: { value: 0.5, min: 0, max: 1, step: 0.1 },
    waveWidth: {
      value: 10.0,
      min: 0,
      max: 10,
      step: 0.5,
    },
    oscillationAmplitude: { value: 3.0, min: 0, max: 10, step: 0.5 },
    oscillationFrequency: { value: 0.1, min: 0, max: 1, step: 0.1 },
    waveColorIntensity: { value: 8.0, min: 0, max: 15, step: 1 },
    noiseStrength: { value: 2.0, min: 0, max: 4, step: 0.1 },
  });

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uFrequency.value = frequency;
    materialRef.current.uniforms.uNoiseFrequency.value = noiseFrequency;
    materialRef.current.uniforms.uTreshold.value = treshold;
    materialRef.current.uniforms.uWaveSpeed.value = waveSpeed;
    materialRef.current.uniforms.uOscillationAmplitude.value =
      oscillationAmplitude;
    materialRef.current.uniforms.uOscillationFrequency.value =
      oscillationFrequency;
    materialRef.current.uniforms.uWaveColorIntensity.value = waveColorIntensity;
    materialRef.current.uniforms.uWaveWidth.value = waveWidth;
    materialRef.current.uniforms.uNoiseStrength.value = noiseStrength;
  }, [
    frequency,
    noiseFrequency,
    treshold,
    waveSpeed,
    oscillationAmplitude,
    oscillationFrequency,
    waveColorIntensity,
    waveWidth,
    noiseStrength,
  ]);

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh rotation-x={-Math.PI / 2} rotation-z={Math.PI / 2} scale={40}>
      <planeGeometry args={[1, 1]} />
      <CustomShaderMaterial
        ref={materialRef}
        baseMaterial={THREE.MeshStandardMaterial}
        fragmentShader={waterLinesFragmentShader}
        vertexShader={waterLinesVertexShader}
        uniforms={{
          uTime: { value: 0 },
          uDistanceMapBigIsland: { value: distanceMapBigIsland },
          uDistanceMapSmallIsland: { value: distanceMapSmallIsland },
          uPerlinNoise: { value: perlinNoise },
          uFrequency: { value: frequency },
          uNoiseFrequency: { value: noiseFrequency },
          uTreshold: { value: treshold },
          uWaveSpeed: { value: waveSpeed },
          uOscillationAmplitude: { value: oscillationAmplitude }, // par exemple 2.0
          uOscillationFrequency: { value: oscillationFrequency }, // par exemple 0.2
          uWaveColorIntensity: { value: waveColorIntensity },
          uWaveWidth: { value: waveWidth },
          uNoiseStrength: { value: noiseStrength },
        }}
      />
    </mesh>
  );
}
