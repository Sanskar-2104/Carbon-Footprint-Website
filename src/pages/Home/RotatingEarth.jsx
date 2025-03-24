import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import EarthTexture from "./earth-smoke.avif"; // Make sure it's a FULL Earth image

const Earth = () => {
  const texture = useLoader(TextureLoader, EarthTexture);

  return (
    <mesh scale={[3.5, 3.5, 3.5]} position={[0, 0, -1]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Earth;
