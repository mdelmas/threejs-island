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
    waterColor: "#00d3f8",
  });

  const distanceMap = useLoader(
    TextureLoader,
    "/textures/islandDistanceMap.png"
  );
  const perlinNoise = useLoader(TextureLoader, "/textures/perlinNoise.png");

  const materialRef = useRef();
  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
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
          ref={materialRef}
          baseMaterial={MeshStandardMaterial}
          vertexShader={waterVertexShader}
          fragmentShader={waterFragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uDistanceMap: { value: distanceMap },
            uPerlinNoise: { value: perlinNoise },
          }}
        />
      </mesh>
    </Float>
  );
}
