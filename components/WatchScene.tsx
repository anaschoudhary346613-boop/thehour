'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls, Float, PerspectiveCamera } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/watch.glb');
  
  // Ensure the model doesn't have any strange default transforms
  return <primitive object={scene} />;
}

export default function WatchScene() {
  return (
    <div className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center">
      <Canvas 
        shadows 
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Luxury Telephoto Camera to minimize distortion */}
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={15} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />

        <Suspense fallback={null}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0.3, 0.5, 0]} // Dynamic entry rotation
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <Float
              speed={2} 
              rotationIntensity={0.2} 
              floatIntensity={0.5}
            >
              {/* Stage handles centering and premium studio lighting environment automatically */}
              <Stage 
                intensity={0.5} 
                environment="city" 
                shadows="contact" 
                adjustCamera={1} // 1 = fit perfectly in view
                center
              >
                <Model />
              </Stage>
            </Float>
          </PresentationControls>
        </Suspense>
      </Canvas>
      
      {/* Subtle indicator that the model is interactive */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-20 hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="w-8 h-[1px] bg-white" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-sans font-medium">Click & Rotate</span>
        <div className="w-8 h-[1px] bg-white" />
      </div>
    </div>
  );
}

// Preload the model
useGLTF.preload('/watch.glb');
