'use client';

import React, { Suspense, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls, Float, PerspectiveCamera } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/watch.glb');
  
  // Disable frustum culling to prevent the model from "vanishing" during rotation
  useLayoutEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.frustumCulled = false;
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

export default function WatchScene() {
  return (
    <div className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center">
      <Canvas 
        shadows 
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          logarithmicDepthBuffer: true // Prevents flickering and Z-fighting issues
        }}
        // Wider clipping planes to prevent vanishing during movement
        camera={{ position: [0, 0, 10], fov: 15, near: 0.1, far: 2000 }}
      >
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#C8A97E" />

        <Suspense fallback={null}>
          <Float
            speed={1.5} 
            rotationIntensity={0.2} 
            floatIntensity={0.5}
          >
            {/* Stage provides centering and studio environmental lighting */}
            <Stage 
              intensity={0.5} 
              environment="city" 
              shadows="contact" 
              adjustCamera={1} 
              center
            >
              <Model />
            </Stage>
          </Float>
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          makeDefault 
          minPolarAngle={Math.PI / 3.5} 
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Interaction UI */}
      <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="w-10 h-[1px] bg-[#C8A97E]" />
        <span className="text-[9px] uppercase tracking-[0.5em] text-white font-sans font-bold">Interactive Inspection</span>
        <div className="w-10 h-[1px] bg-[#C8A97E]" />
      </div>
    </div>
  );
}

// Preload the model
useGLTF.preload('/watch.glb');
