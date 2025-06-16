
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';

interface RealisticAvatar3DProps {
  skinTone: string;
  braidStyle: string;
  braidLength: string;
  braidColor: string;
}

const RealisticAvatarModel: React.FC<RealisticAvatar3DProps> = ({ 
  skinTone, 
  braidStyle, 
  braidLength, 
  braidColor 
}) => {
  const headRef = useRef<Mesh>(null);
  const hairRef = useRef<Mesh>(null);
  const shouldersRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (headRef.current && hairRef.current && shouldersRef.current) {
      const time = state.clock.getElapsedTime();
      const subtleRotation = Math.sin(time * 0.15) * 0.015;
      headRef.current.rotation.y = subtleRotation;
      hairRef.current.rotation.y = subtleRotation;
      shouldersRef.current.rotation.y = subtleRotation;
    }
  });

  const getSkinColor = (tone: string) => {
    const colors = {
      'light': '#F5D5AE',
      'medium': '#DDB180',
      'tan': '#C89664',
      'dark': '#8D5524',
      'deep': '#654321'
    };
    return colors[tone as keyof typeof colors] || colors.medium;
  };

  const getHairColor = (color: string) => {
    const colors = {
      'natural-black': '#0A0A0A',
      'chocolate-brown': '#6F4E37',
      'honey-blonde': '#D4AF37',
      'auburn': '#A0522D',
      'burgundy': '#722F37',
      'blue-black': '#1C1C2B'
    };
    return colors[color as keyof typeof colors] || colors['burgundy'];
  };

  const getLengthMultiplier = () => {
    switch (braidLength) {
      case 'short': return 0.7;
      case 'medium': return 1.0;
      case 'long': return 1.5;
      case 'extra-long': return 2.0;
      default: return 1.0;
    }
  };

  const lengthMultiplier = getLengthMultiplier();
  const skinColor = getSkinColor(skinTone);
  const hairColor = getHairColor(braidColor);

  return (
    <group position={[0, -0.5, 0]}>
      {/* Realistic Shoulders and Collar Bone */}
      <mesh ref={shouldersRef} position={[0, -2.5, 0]}>
        <boxGeometry args={[2.4, 1.2, 1.0]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.3}
          metalness={0.02}
        />
      </mesh>

      {/* Collar bone definition */}
      <mesh position={[0, -1.8, 0.3]}>
        <boxGeometry args={[1.6, 0.15, 0.4]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.25}
          metalness={0.02}
        />
      </mesh>

      {/* Realistic Neck */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.32, 0.38, 0.9, 24]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.2}
          metalness={0.02}
        />
      </mesh>

      {/* Main Head - More realistic oval shape */}
      <mesh ref={headRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.18}
          metalness={0.02}
        />
      </mesh>

      {/* Forehead shaping */}
      <mesh position={[0, 0.35, 0.5]} scale={[0.9, 0.7, 0.8]}>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.18}
          metalness={0.02}
        />
      </mesh>

      {/* Cheekbone structure - more pronounced */}
      <mesh position={[-0.4, 0.05, 0.6]} scale={[0.4, 0.3, 0.6]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.18}
          metalness={0.02}
        />
      </mesh>
      <mesh position={[0.4, 0.05, 0.6]} scale={[0.4, 0.3, 0.6]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.18}
          metalness={0.02}
        />
      </mesh>

      {/* Jawline definition */}
      <mesh position={[0, -0.4, 0.45]} scale={[0.8, 0.35, 0.7]}>
        <sphereGeometry args={[0.45, 20, 16]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.18}
          metalness={0.02}
        />
      </mesh>

      {/* Realistic Eye Sockets */}
      <mesh position={[-0.28, 0.15, 0.72]} scale={[0.7, 0.5, 0.6]}>
        <sphereGeometry args={[0.18, 20, 16]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0.28, 0.15, 0.72]} scale={[0.7, 0.5, 0.6]}>
        <sphereGeometry args={[0.18, 20, 16]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>

      {/* Detailed Iris */}
      <mesh position={[-0.28, 0.15, 0.78]}>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial 
          color="#2D4A3A" 
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      <mesh position={[0.28, 0.15, 0.78]}>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial 
          color="#2D4A3A" 
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Pupils with realistic reflection */}
      <mesh position={[-0.28, 0.15, 0.82]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial 
          color="#000000" 
          roughness={0.0}
          metalness={0.9}
        />
      </mesh>
      <mesh position={[0.28, 0.15, 0.82]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial 
          color="#000000" 
          roughness={0.0}
          metalness={0.9}
        />
      </mesh>

      {/* Eye highlights */}
      <mesh position={[-0.26, 0.17, 0.83]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          roughness={0.0}
          metalness={0.0}
          emissive="#FFFFFF"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0.3, 0.17, 0.83]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          roughness={0.0}
          metalness={0.0}
          emissive="#FFFFFF"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Natural Eyebrows */}
      <mesh position={[-0.28, 0.32, 0.7]} scale={[0.5, 0.12, 0.25]} rotation={[0, 0, 0.15]}>
        <sphereGeometry args={[0.35, 16, 12]} />
        <meshStandardMaterial 
          color="#2A1810" 
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      <mesh position={[0.28, 0.32, 0.7]} scale={[0.5, 0.12, 0.25]} rotation={[0, 0, -0.15]}>
        <sphereGeometry args={[0.35, 16, 12]} />
        <meshStandardMaterial 
          color="#2A1810" 
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Realistic Nose Bridge */}
      <mesh position={[0, 0.05, 0.8]} scale={[0.2, 0.8, 0.4]}>
        <sphereGeometry args={[0.15, 12, 16]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.18}
          metalness={0.02}
        />
      </mesh>

      {/* Nose Tip */}
      <mesh position={[0, -0.08, 0.85]} scale={[0.35, 0.6, 0.5]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.18}
          metalness={0.02}
        />
      </mesh>

      {/* Nostrils */}
      <mesh position={[-0.06, -0.12, 0.88]} scale={[0.4, 0.3, 0.4]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial 
          color="#1A1A1A" 
          roughness={1.0}
          metalness={0.0}
        />
      </mesh>
      <mesh position={[0.06, -0.12, 0.88]} scale={[0.4, 0.3, 0.4]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial 
          color="#1A1A1A" 
          roughness={1.0}
          metalness={0.0}
        />
      </mesh>

      {/* Realistic Lips */}
      <mesh position={[0, -0.32, 0.78]} scale={[0.75, 0.25, 0.35]}>
        <sphereGeometry args={[0.18, 20, 16]} />
        <meshStandardMaterial 
          color="#B8756B" 
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Upper lip definition */}
      <mesh position={[0, -0.28, 0.8]} scale={[0.6, 0.15, 0.25]}>
        <sphereGeometry args={[0.15, 16, 12]} />
        <meshStandardMaterial 
          color="#A86B5F" 
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Lip highlight */}
      <mesh position={[0, -0.26, 0.82]} scale={[0.3, 0.05, 0.1]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          roughness={0.0}
          metalness={0.0}
          emissive="#FFFFFF"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Chin definition */}
      <mesh position={[0, -0.55, 0.5]} scale={[0.6, 0.4, 0.6]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.18}
          metalness={0.02}
        />
      </mesh>

      {/* Hair Volume Base */}
      <mesh 
        ref={hairRef}
        position={[0, 0.4, -0.2]}
        scale={[1.15, 0.85, 1.15]}
      >
        <sphereGeometry args={[0.88, 24, 24]} />
        <meshStandardMaterial 
          color={hairColor} 
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* Hairline definition */}
      <mesh position={[0, 0.25, 0.65]} scale={[0.95, 0.25, 0.4]}>
        <sphereGeometry args={[0.6, 16, 12]} />
        <meshStandardMaterial 
          color={hairColor} 
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>

      {/* Box Braids - Individual strands with realistic movement */}
      {Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2;
        const radius = 0.6 + (Math.random() - 0.5) * 0.15;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const yOffset = -0.1 + (Math.random() - 0.5) * 0.2;
        
        return (
          <group key={i}>
            {/* Main braid strand */}
            <mesh
              position={[x, yOffset, z]}
              rotation={[Math.PI / 10 + (Math.random() - 0.5) * 0.3, angle, (Math.random() - 0.5) * 0.15]}
            >
              <cylinderGeometry args={[0.028, 0.018, lengthMultiplier * 2.0, 12]} />
              <meshStandardMaterial 
                color={hairColor} 
                roughness={0.85}
                metalness={0.02}
              />
            </mesh>
            
            {/* Braid texture segments */}
            {Array.from({ length: Math.floor(lengthMultiplier * 10) }, (_, j) => (
              <mesh
                key={j}
                position={[
                  x + Math.sin(j * 0.4) * 0.025, 
                  yOffset - (j * 0.18), 
                  z + Math.cos(j * 0.4) * 0.025
                ]}
                rotation={[0, angle + j * 0.15, 0]}
                scale={[1, 0.8 + Math.sin(j * 0.5) * 0.2, 1]}
              >
                <sphereGeometry args={[0.032, 8, 6]} />
                <meshStandardMaterial 
                  color={hairColor} 
                  roughness={0.9}
                  metalness={0.0}
                />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Baby hairs around hairline */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 0.78 + (Math.random() - 0.5) * 0.05;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh
            key={`baby-hair-${i}`}
            position={[x, 0.4 + Math.random() * 0.15, z]}
            rotation={[Math.random() * 0.3, angle, Math.random() * 0.2]}
          >
            <cylinderGeometry args={[0.006, 0.003, 0.15 + Math.random() * 0.1, 4]} />
            <meshStandardMaterial 
              color={hairColor} 
              roughness={0.95}
              metalness={0.0}
            />
          </mesh>
        );
      })}

      {/* Side hair wisps */}
      {Array.from({ length: 8 }, (_, i) => {
        const side = i < 4 ? -1 : 1;
        const localIndex = i % 4;
        const x = side * (0.65 + localIndex * 0.1);
        const y = 0.2 - localIndex * 0.1;
        const z = 0.3 + localIndex * 0.1;
        
        return (
          <mesh
            key={`side-wisp-${i}`}
            position={[x, y, z]}
            rotation={[0, side * 0.3, side * 0.2]}
          >
            <cylinderGeometry args={[0.012, 0.006, 0.3, 6]} />
            <meshStandardMaterial 
              color={hairColor} 
              roughness={0.9}
              metalness={0.0}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const LoadingFallback = () => (
  <div className="w-full h-96 bg-gradient-to-br from-salon-pink/10 to-salon-grey/10 rounded-2xl flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-salon-pink"></div>
      <div className="text-salon-dark/70">Crafting your perfect look...</div>
    </div>
  </div>
);

const ErrorFallback = () => (
  <div className="w-full h-96 bg-gradient-to-br from-salon-pink/10 to-salon-grey/10 rounded-2xl flex items-center justify-center">
    <div className="text-salon-dark/70">3D Avatar temporarily unavailable</div>
  </div>
);

const RealisticAvatar3D: React.FC<RealisticAvatar3DProps> = (props) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <ErrorFallback />;
  }

  return (
    <div className="w-full h-96 bg-gradient-to-br from-salon-pink/10 to-salon-grey/10 rounded-2xl overflow-hidden shadow-xl">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          camera={{ position: [0, 0, 3.2], fov: 45 }}
          onCreated={() => console.log('Realistic Avatar Canvas created successfully')}
          onError={(error) => {
            console.error('Canvas error:', error);
            setHasError(true);
          }}
        >
          {/* Enhanced studio lighting for photorealism */}
          <ambientLight intensity={0.35} color="#f8f8ff" />
          
          {/* Key light - main illumination */}
          <directionalLight 
            position={[2, 3, 4]} 
            intensity={1.2} 
            color="#ffffff"
            castShadow 
          />
          
          {/* Fill light */}
          <directionalLight 
            position={[-1.5, 1.5, 2]} 
            intensity={0.6} 
            color="#f5f5f5"
          />
          
          {/* Rim light for definition */}
          <pointLight 
            position={[0, 1, -2]} 
            intensity={0.4} 
            color="#ffe4e1"
          />
          
          {/* Face illumination */}
          <pointLight 
            position={[0, 0, 3]} 
            intensity={0.3} 
            color="#fff8dc"
          />

          {/* Side accent lights */}
          <pointLight 
            position={[-2, 0, 1]} 
            intensity={0.2} 
            color="#f0f8ff"
          />
          <pointLight 
            position={[2, 0, 1]} 
            intensity={0.2} 
            color="#f0f8ff"
          />
          
          <RealisticAvatarModel {...props} />
          
          <OrbitControls 
            enablePan={false} 
            enableZoom={true}
            minDistance={2.5}
            maxDistance={5.5}
            autoRotate={true}
            autoRotateSpeed={0.3}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            target={[0, -0.1, 0]}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default RealisticAvatar3D;
