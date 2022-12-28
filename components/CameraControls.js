import * as THREE from "three";
import CameraControls from "camera-controls";
import { useMemo } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";

CameraControls.install({ THREE });
extend({ CameraControls });

const Controls = () => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);

  camera.far = 100000000;
  camera.near = 0.001;
  camera.fov = 50;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  return useFrame((state, delta) => {
    return controls.update(delta);
  });
};

export default Controls;
