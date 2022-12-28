import { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useTexture } from '@react-three/drei';
import Controls from '../components/CameraControls'
// import { SplatStandardMaterial } from 'three-landscape'
import { SplatStandardMaterial } from 'three-landscape';
import { TextureLoader } from 'three/src/loaders/TextureLoader';



function Mars(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX

  // const splat1 = useLoader(TextureLoader, "/textures/mars/level0/tx_0_0.jpg");
  // const splat2 = useLoader(TextureLoader, "/textures/mars/level0/tx_0_1.jpg");
  // const splat3 = useLoader(TextureLoader, "/textures/mars/level1/tx_1_0.jpg");


  const [splat1, splat2, noise] = useTexture([
    '/textures/mars/level0/tx_0_0.jpg',
    '/textures/mars/level0/tx_0_1.jpg',
    '/textures/simplex-noise.png'
  ]);


  return (
    <mesh
      {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      // onClick={(event) => click(!clicked)}
      // onPointerOver={(event) => hover(true)}
      // onPointerOut={(event) => hover(false)}
      >
      <sphereGeometry args={[1, 128, 128]} />
      {/* <meshStandardMaterial
        color={"red"}
       /> */}
        <SplatStandardMaterial
          // normalMap={normal}
          splats={[splat1, splat2]}
          // normalMaps={[n1, n2, n3]}
          // normalWeights={[1.0, 1.0, 1.0]}
          diffuseMaps={[splat1, splat1]}
          scale={[128, 128]}
          noise={noise}
          // displacementMap={displacement}
          // displacementScale={10}
          // displacementBias={-10}
        />
    </mesh>
  )
}

export default function Home() {
  return (
    <div id="canvas-container">
    <Canvas  dpr={[1, 2]}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Mars position={[0, 0, 0]} />
      <Controls />
    </Canvas>
  </div>
  )
}
