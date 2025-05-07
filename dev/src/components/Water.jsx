import { MeshStandardMaterial, TextureLoader } from "three";
import { Float, MeshReflectorMaterial } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";
import { useControls } from "leva";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";

import waterFragmentShader from "../shaders/water/fragment.glsl?raw";
import waterVertexShader from "../shaders/water/vertex.glsl?raw";

export default function Water() {
  const { waterColor } = useControls({
    waterColor: "#77bbbd",
  });

  const distanceMap = useLoader(
    TextureLoader,
    "/textures/islandDistanceMap.png"
  );
  const perlinNoise = useLoader(TextureLoader, "/textures/perlinNoise.png");

  const floatRef = useRef();
  const shaderRef = useRef();
  useFrame(({ clock }) => {
    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();

    if (!floatRef.current) return;
    const y = floatRef.current.position.y;
    const factor = (y - 0.0065) * 150.0; // convert [0, 0.013] → [0,1]
    shaderRef.current.material.uniforms.uWaveFactor.value = factor;
  });

  return (
    <Float speed={5} rotationIntensity={0} floatingRange={[0, 0.013]}>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          color={waterColor}
          roughness={0}
          resolution={1024}
        />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.001}>
        <planeGeometry args={[6, 6]} />
        <CustomShaderMaterial
          ref={shaderRef}
          baseMaterial={MeshStandardMaterial}
          vertexShader={waterVertexShader}
          fragmentShader={waterFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uWaveFactor: { value: 0 },
            uDistanceMap: { value: distanceMap },
            uPerlinNoise: { value: perlinNoise },
          }}
        />
      </mesh>
    </Float>
  );
}
