import { MeshStandardMaterial } from 'three';
import { Float } from '@react-three/drei'
import CustomShaderMaterial from "three-custom-shader-material";
import { MeshReflectorMaterial } from '@react-three/drei';
import { useControls } from 'leva';

export default function Water() {
  const { waterColor } = useControls({ 
    waterColor: '#00d3f8', 
  });

  return (
    <Float 
      speed={5} 
      rotationIntensity={0}
      floatingRange={[0, 0.014]}
    >
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          color={waterColor}
          roughness={0}
          resolution={1024}
        />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.001}>
        <planeGeometry args={[1, 1]} />
        <CustomShaderMaterial
          color="white"
          baseMaterial={MeshStandardMaterial}
        />
      </mesh>
    </Float>
  )
}