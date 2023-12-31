import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Space = ({ isMobile }) => {
  const space = useGLTF('./space_boi/scene.gltf');

  return (
    <mesh>
      <primitive 
        object={space.scene} 
        scale={isMobile ? 0.07 : 0.10} 
        position={isMobile ? [0, -0.5, 0] : [0, -0.5, 0]} 
      />
    </mesh>
  );
};

const SpaceCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    
    // Set the initial value of the 'isMobile' state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas 
      frameLoop="demand"   
      shadows 
      camera={{ position: [0, 0, 2], fov: 45 }} 
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 2}
          autoRotate
        />
        <Space isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default SpaceCanvas;