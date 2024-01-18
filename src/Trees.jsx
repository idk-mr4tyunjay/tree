import React, { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { RedFormat, DataTexture} from "three";

export const Trees = forwardRef((props, ref) => {
  const { nodes} = useGLTF("/trees.glb");
  const  toneMap = useMemo (() => {
    const format = RedFormat;
    const colors = new Uint8Array(4)
    for (let c  = 0; c <= colors.length; c++){
        colors[c] = (c / colors.length) * 256
    }
    const gradientMap = new DataTexture(colors, colors.length, 1, format);
    gradientMap.needsUpdate = true
    return gradientMap
  }, [])

  return (
    <group ref={ref} {...props} dispose={null}>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Foliage.geometry}
            position={[0.327, -0.046, -0.684]} >
            <meshStToonMaterial gradientMap={toneMap} color={'#234549'} />
        </mesh> 
    </group>
  );
})

useGLTF.preload("/trees.glb");