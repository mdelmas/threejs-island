import { useGLTF } from "@react-three/drei";

export default function Tree() {
  const model = useGLTF("models/tree.glb");
  console.log("tree", model)
  return <></>
}