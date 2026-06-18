import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Inner core component representing the AI core
const AICore = ({ hovered }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    // Pulse animation: faster and slightly larger on hover
    const pulseFactor = hovered ? 4.5 : 2.0;
    const baseScale = 0.45;
    const scale = baseScale + Math.sin(elapsed * pulseFactor) * 0.04;
    meshRef.current.scale.set(scale, scale, scale);
    
    // Rotation of the core
    meshRef.current.rotation.y = elapsed * 0.6;
    meshRef.current.rotation.x = elapsed * 0.4;
  });

  return (
    <group>
      {/* Inner glowing wireframe core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.0, 2]} />
        <meshBasicMaterial 
          color={hovered ? "#B026FF" : "#00F5FF"} 
          wireframe 
          transparent
          opacity={0.85}
        />
      </mesh>
      
      {/* Core glowing point light */}
      <pointLight 
        intensity={hovered ? 12 : 7} 
        distance={6} 
        color={hovered ? "#B026FF" : "#00F5FF"} 
      />
    </group>
  );
};

// Orbiting Ring with an electron particle
const OrbitRing = ({ radius, angleX, angleZ, speed, color, electronSpeed }) => {
  const groupRef = useRef();
  const electronRef = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Slow continuous rotation of the ring plane itself
    groupRef.current.rotation.y = elapsed * speed;
    
    // Move electron particle along the circumference of the ring
    if (electronRef.current) {
      const theta = elapsed * electronSpeed;
      electronRef.current.position.x = Math.cos(theta) * radius;
      electronRef.current.position.z = Math.sin(theta) * radius;
    }
  });

  return (
    <group ref={groupRef} rotation={[angleX, 0, angleZ]}>
      {/* Tilted Torus Ring */}
      <mesh>
        <torusGeometry args={[radius, 0.012, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      
      {/* Electron Point Particle */}
      <mesh ref={electronRef}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={color} />
        <pointLight intensity={2.0} distance={1.2} color={color} />
      </mesh>
    </group>
  );
};

// Holographic Floating Platform
const Platform = ({ hovered }) => {
  const ringRef = useRef();
  const ringRef2 = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    // Counter-rotating platform rings
    if (ringRef.current) ringRef.current.rotation.z = -elapsed * 0.15;
    if (ringRef2.current) ringRef2.current.rotation.z = elapsed * 0.25;
  });

  return (
    <group position={[0, -1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Cybernetic Base Plate */}
      <mesh>
        <cylinderGeometry args={[1.4, 1.5, 0.06, 32]} />
        <meshStandardMaterial 
          color="#0b0f19" 
          roughness={0.3} 
          metalness={0.9} 
          transparent 
          opacity={0.95} 
        />
      </mesh>
      
      {/* Outer concentric neon ring */}
      <mesh ref={ringRef} position={[0, 0, 0.04]}>
        <ringGeometry args={[1.3, 1.34, 32]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner concentric neon ring */}
      <mesh ref={ringRef2} position={[0, 0, 0.05]}>
        <ringGeometry args={[0.8, 0.84, 32]} />
        <meshBasicMaterial color="#B026FF" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Spotlight projecting upwards onto the core */}
      <spotLight 
        intensity={hovered ? 7 : 4} 
        angle={Math.PI / 3.5} 
        penumbra={0.8} 
        position={[0, 0, 0.08]} 
        color="#B026FF" 
      />
    </group>
  );
};

// Energy particle cloud drifting around the sphere
const EnergyParticles = ({ count = 75 }) => {
  const pointsRef = useRef();
  
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 1.3 + Math.random() * 1.4; // Distributed shell around the glass sphere
      
      pos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = dist * Math.cos(phi);
    }
    return [pos];
  }, [count]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.04;
      pointsRef.current.rotation.x = elapsed * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.035} 
        color="#00F5FF" 
        transparent 
        opacity={0.75} 
        sizeAttenuation 
        depthWrite={false}
      />
    </points>
  );
};

// 3D Elements Scene
const OrbScene = ({ theme }) => {
  const mainGroup = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const pointer = state.pointer;
    
    // Slow elegant floating oscillation (up/down)
    mainGroup.current.position.y = Math.sin(elapsed * 1.2) * 0.12;
    
    // Interactive mouse follow rotation
    const targetRotX = -pointer.y * 0.25;
    // Auto rotation around Y axis plus slight mouse drag contribution
    const targetRotY = pointer.x * 0.25 + elapsed * 0.08;
    
    mainGroup.current.rotation.x = THREE.MathUtils.lerp(mainGroup.current.rotation.x, targetRotX, 0.05);
    mainGroup.current.rotation.y = THREE.MathUtils.lerp(mainGroup.current.rotation.y, targetRotY, 0.05);
    
    // Hover scale dynamic feedback
    const targetScale = hovered ? 1.12 : 1.0;
    mainGroup.current.scale.setScalar(THREE.MathUtils.lerp(mainGroup.current.scale.x, targetScale, 0.08));
  });

  return (
    <group 
      ref={mainGroup}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 1. Pulsing inner core */}
      <AICore hovered={hovered} />
      
      {/* 2. Glassmorphism refraction sphere */}
      <mesh>
        <sphereGeometry args={[1.0, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={1.0}
          roughness={0.14}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          thickness={1.4}
          ior={1.45}
          chromaticAberration={0.05}
          anisotropy={0.2}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.05}
          color="#ffffff"
        />
      </mesh>
      
      {/* 3. Concentric Orbiting Neon Rings */}
      <OrbitRing radius={1.45} angleX={Math.PI / 4.5} angleZ={Math.PI / 5} speed={0.3} color="#00F5FF" electronSpeed={1.4} />
      <OrbitRing radius={1.8} angleX={-Math.PI / 4} angleZ={-Math.PI / 3.5} speed={-0.2} color="#B026FF" electronSpeed={1.1} />
      <OrbitRing radius={2.15} angleX={Math.PI / 2.2} angleZ={0} speed={0.2} color="#FF007F" electronSpeed={1.7} />
      
      {/* 4. Base Platform */}
      <Platform hovered={hovered} />

      {/* 5. Cloud of floating particles */}
      <EnergyParticles count={75} />
    </group>
  );
};

// Top-level exported component
const HolographicOrb = ({ theme }) => {
  return (
    <div className="w-full h-full min-h-[350px] lg:min-h-[550px] flex items-center justify-center select-none overflow-visible">
      <Canvas
        camera={{ position: [0, 0.2, 5.0], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lights setup */}
        <ambientLight intensity={theme === 'dark' ? 0.35 : 0.75} />
        <directionalLight position={[10, 8, 5]} intensity={1.2} />
        <pointLight position={[-10, -5, -10]} intensity={0.8} color="#00F5FF" />
        <pointLight position={[10, 8, 10]} intensity={1.2} color="#B026FF" />

        {/* The 3D Scene */}
        <OrbScene theme={theme} />
      </Canvas>
    </div>
  );
};

export default HolographicOrb;
