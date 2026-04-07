'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, PresentationControls, Float } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/watch.glb');
  return <primitive object={scene} scale={25} position={[0, -0.05, 0]} rotation={[0.4, 0, 0]} />;
}

export default function WatchScene() {
  return (
    <div className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        
        <Suspense fallback={null}>
          <Float
            speed={1.5} 
            rotationIntensity={0.5} 
            floatIntensity={0.5}
          >
            <PresentationControls
              global
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
              rotation={[0, 0.3, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
            >
               <Model />
            </PresentationControls>
          </Float>
          
          <Environment preset="studio" />
          <ContactShadows 
            position={[0, -1.4, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          makeDefault
        />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/watch.glb');
