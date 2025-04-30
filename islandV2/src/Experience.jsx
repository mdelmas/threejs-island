import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

import Island from './components/Island.jsx';
import Water from './components/Water.jsx';

export default function Experience()
{
    const { skyColor } = useControls({ skyColor: '#c6f6ff'});
        
    return <>
        <OrbitControls 
            target={[-0.4, 0, 0]} 
            // limit zoom in/out
            minDistance={1.5}
            maxDistance={5}
            // limit horizontal rotation
            minPolarAngle={Math.PI / 12}
            maxPolarAngle={Math.PI / 2 - 0.03} 
            // limit vertical rotation
            minAzimuthAngle={-Math.PI / 4 - Math.PI / 6} 
            maxAzimuthAngle={Math.PI / 4 + Math.PI / 6} 
        />

        <color args={ [ skyColor ] } attach="background" />
        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } castShadow />
        <fog attach="fog" args={[skyColor, 20, 40]} />

        <Island />
        <Water />
    </>
}