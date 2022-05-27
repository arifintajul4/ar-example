import React, { Fragment, Suspense, useRef, useState } from "react";
import {
  ZapparCamera,
  InstantTracker,
  ZapparCanvas,
  BrowserCompatibility,
} from "@zappar/zappar-react-three-fiber";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";

function Model({ active }: { active?: boolean }) {
  const mesh = useRef<any>(null);
  const gltf = useLoader(GLTFLoader, "./assets/old_car.glb");
  gltf.scene.traverse((node: any) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });

  useFrame(() => {
    if (active) {
      mesh.current.rotation.y = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <primitive
        ref={mesh}
        castShadow
        onClick={() => alert("asas")}
        scale="0.003"
        // rotation={[0, 90, 0]}
        object={gltf.scene}
        position={[0, 0, 0]}
      />
    </group>
  );
}

function Lights() {
  return (
    <group>
      <ambientLight intensity={0.6} color="white" />
      <directionalLight
        castShadow
        position={[0, 30, 0]}
        intensity={0.8}
        shadow-bias={0.0001}
        shadow-camera-right={4}
        shadow-camera-left={-4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-radius={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </group>
  );
}

function App() {
  const [placementMode, setPlacementMode] = useState(true);
  const [active, setActive] = useState(false);

  return (
    <Fragment>
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera environmentMap poseMode="anchor-origin" />
        <InstantTracker
          placementMode={placementMode}
          placementCameraOffset={[0, 0, -2]}
        >
          <Suspense
            fallback={
              <Html>
                <div
                  style={{ color: "white", fontWeight: "bold", width: "100vw" }}
                >
                  Model Loading...
                </div>
              </Html>
            }
          >
            <Model active={active} />
          </Suspense>
          <Lights />
        </InstantTracker>
      </ZapparCanvas>
      <div
        id="zappar-button"
        role="button"
        onKeyPress={() => {
          setActive(!active);
          setPlacementMode((currentPlacementMode) => !currentPlacementMode);
        }}
        tabIndex={0}
        onClick={() => {
          setActive(!active);
          setPlacementMode((currentPlacementMode) => !currentPlacementMode);
        }}
      >
        Tap here to
        {placementMode ? " place " : " pick up "}
        the object
      </div>
      <button
        style={{
          position: "fixed",
          right: "10rem",
          top: "50vh",
        }}
        onKeyPress={() => {}}
        tabIndex={0}
        onClick={() => {
          alert("tes");
        }}
      >
        rotate right
      </button>
    </Fragment>
  );
}

export default App;
