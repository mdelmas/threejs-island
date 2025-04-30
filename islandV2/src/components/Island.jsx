import { useGLTF, useTexture } from '@react-three/drei'

export default function Island() {
  const model = useGLTF('./model/island/model.glb');
  const bakedTexture = useTexture('./model/island/bake.jpg');
  bakedTexture.flipY = false;
  
  return <mesh geometry={ model.nodes.baked.geometry } castShadow>
    <meshBasicMaterial map={bakedTexture} />
  </mesh>
}