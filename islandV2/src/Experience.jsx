import { OrbitControls } from '@react-three/drei';

import Island from './components/Island.jsx';
import Water from './components/Water.jsx';

export default function Experience()
{

    return <>
        <OrbitControls makeDefault />

        <color args={ [ '#BBFCFF' ] } attach="background" />
        {/* <ambientLight intensity={4} castShadow /> */}
        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } castShadow />
        <fog attach="fog" args={["#BBFCFF", 20, 40]} />

        {/* <mesh>
            <sphereGeometry position={ [ 3, 6, 3 ] } />
            <meshStandardMaterial color='red' />
        </mesh> */}

        <Island />
        <Water />
    </>
}