import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import { features } from "../constants";
import clsx from "clsx";
import { useRef } from "react";
import { Suspense } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/MacbookModel";
import { useMediaQuery } from "react-responsive";

const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase">Loding</h1>
          </Html>
        }
      >
        <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features">
      <h2>See it all in a new light.</h2>
      <Canvas id="f-canvas" camare={{}}>
        <StudioLights />
        <ambientLight intensity={0.5} />
        <ModelScroll />
      </Canvas>
      <div className="absolute inset-0">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={clsx("box", `box${index + 1}`, feature.styles)}
          >
            {feature.text}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
