import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import { div } from "three/tsl";

const ModelSwitcher = ({ scale, isMobile }) => {
  const smallMacbookRef = useRef();
  const largeMacbookRef = useRef();

  const showLargeMacbook = scale === 0.08 || scale === 0.05;

  return (
    <>
      <PresentationControls>
        <group></group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
