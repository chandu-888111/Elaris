import React from "react";
import { View, PerspectiveCamera } from "@react-three/drei";

export interface SharedCanvasProps {
  children?: React.ReactNode;
  camera?: {
    position?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
}

export function SharedCanvas({ children, camera }: SharedCanvasProps) {
  return (
    <View className="w-full h-full">
      {camera && (
        <PerspectiveCamera
          makeDefault
          position={camera.position || [0, 0, 8]}
          fov={camera.fov || 45}
          near={camera.near || 0.1}
          far={camera.far || 1000}
        />
      )}
      {!camera && <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />}
      {children}
    </View>
  );
}
