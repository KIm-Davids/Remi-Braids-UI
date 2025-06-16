
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';

interface Avatar3DProps {
  skinTone: string;
  braidStyle: string;
  braidLength: string;
  braidColor: string;
}

const AvatarModel: React.FC<Avatar3DProps> = ({ skinTone, braidStyle, braidLength, braidColor }) => {
  const headRef = useRef<Mesh>(null);
  const hairRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (headRef.current && hairRef.current) {
      const time = state.clock.getElapsedTime();
      headRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      hairRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  const getSkinColor = (tone: string) => {
    const colors = {
      'light': '#FDBCB4',
      'medium': '#E1956F',
      'tan': '#CB9E6F',
      'dark': '#8D5524',
      'deep': '#4B2C20'
    };
    return colors[tone as keyof typeof colors] || colors.medium;
  };

  const getHairColor = (color: string) => {
    const colors = {
      'natural-black': '#1a1a1a',
      'chocolate-brown': '#8B4513',
      'honey-blonde': '#DAA520',
      'auburn': '#A52A2A',
      'burgundy': '#800020',
      'blue-black': '#0f0f23'
    };
    return colors[color as keyof typeof colors] || colors['natural-black'];
  };

  const getHairGeometry = () => {
    switch (braidStyle) {
      case 'box-braids':
        return [1.2, 1.4, 1.2];
      case 'cornrows':
        return [1.1, 1.2, 1.1];
      case 'french-braids':
        return [1.3, 1.5, 1.3];
      case 'dutch-braids':
        return [1.3, 1.5, 1.3];
      default:
        return [1.2, 1.4, 1.2];
    }
  };

  const getLengthMultiplier = () => {
    switch (braidLength) {
      case 'short': return 0.8;
      case 'medium': return 1.0;
      case 'long': return 1.4;
      case 'extra-long': return 1.8;
      default: return 1.0;
    }
  };

  const [hairWidth, hairHeight, hairDepth] = getHairGeometry();
  const lengthMultiplier = getLengthMultiplier();

  return (
    <group>
      {/* Head */}
      <mesh ref={headRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial color={getSkinColor(skinTone)} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhongMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhongMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.3, 0.2, 0.85]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhongMaterial color="#000000" />
      </mesh>
      <mesh position={[0.3, 0.2, 0.85]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhongMaterial color="#000000" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, -0.1, 0.9]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} />
        <meshPhongMaterial color={getSkinColor(skinTone)} />
      </mesh>

      {/* Lips */}
      <mesh position={[0, -0.4, 0.8]} scale={[1, 0.3, 0.5]}>
        <sphereGeometry args={[0.15, 16, 8]} />
        <meshPhongMaterial color="#d4756b" />
      </mesh>

      {/* Hair/Braids */}
      <mesh 
        ref={hairRef}
        position={[0, 0.5, -0.2]}
      >
        <boxGeometry args={[hairWidth, hairHeight * lengthMultiplier, hairDepth]} />
        <meshPhongMaterial color={getHairColor(braidColor)} />
      </mesh>

      {/* Braid strands for box braids */}
      {braidStyle === 'box-braids' && Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (i % 4 - 1.5) * 0.3,
            0.3,
            -0.3 + Math.floor(i / 4) * 0.2
          ]}
        >
          <boxGeometry args={[0.1, hairHeight * lengthMultiplier * 0.8, 0.1]} />
          <meshPhongMaterial color={getHairColor(braidColor)} />
        </mesh>
      ))}
    </group>
  );
};

const LoadingFallback = () => (
  <div className="w-full h-96 bg-gradient-to-br from-salon-pink/10 to-salon-grey/10 rounded-2xl flex items-center justify-center">
    <div className="text-salon-dark/70">Loading 3D Avatar...</div>
  </div>
);

const ErrorFallback = () => (
  <div className="w-full h-96 bg-gradient-to-br from-salon-pink/10 to-salon-grey/10 rounded-2xl flex items-center justify-center">
    <div className="text-salon-dark/70">3D Avatar temporarily unavailable</div>
  </div>
);

const Avatar3D: React.FC<Avatar3DProps> = (props) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <ErrorFallback />;
  }

  return (
    <div className="w-full h-96 bg-gradient-to-br from-salon-pink/10 to-salon-grey/10 rounded-2xl overflow-hidden">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 50 }}
          onCreated={() => console.log('Canvas created successfully')}
          onError={(error) => {
            console.error('Canvas error:', error);
            setHasError(true);
          }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <AvatarModel {...props} />
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            autoRotate={true}
            autoRotateSpeed={2}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Avatar3D;
