import { Environment, Lightformer } from "@react-three/drei";
import { Light } from "three";

const StudioLights = () => {
  return (
    <group>
      <Environment resolution={256}>
        <group>
          <Lightformer
            form="rect"
            intensity={10}
            position={[-10, 5, -5]}
            scale={10}
            rotation-y={Math.PI / 2}
          />
          <Lightformer
            form="rect"
            intensity={10}
            position={[10, 0, 1]}
            scale={10}
            rotation-y={Math.PI / 2}
          />
        </group>
      </Environment>
      <spotLight
        angle={0.15}
        intensity={Math.PI * 0.2}
        decay={0}
        position={[-2, 10, 5]}
      />
      <spotLight
        angle={0.15}
        intensity={Math.PI * 0.2}
        decay={0}
        position={[0, -25, 10]}
      />
      <spotLight
        angle={0.15}
        intensity={Math.PI * 1}
        decay={0.1}
        position={[0, 15, 5]}
      />
    </group>
  );
};

export default StudioLights;
