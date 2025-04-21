import CustomShaderMaterial from "three-custom-shader-material";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

// extend({ CustomShaderMaterial });

export default function PaperMaterial({ baseColor = "#ffffff" }) {
  const [normalMap, roughnessMap] = useTexture([
    "./textures/paper/Paper001_4K-PNG_NormalGL.png",
    "./textures/paper/Paper001_4K-PNG_Roughness.png",
  ]);
  console.log(normalMap, roughnessMap);

  return (
    <CustomShaderMaterial
      color={new THREE.Color(baseColor)}
      baseMaterial={THREE.MeshStandardMaterial}
      normalMap={normalMap}
      normalScale={new THREE.Vector2(0.2, 0.2)} // ajustable
      roughnessMap={roughnessMap}
      roughness={1}
    />
  );
}
