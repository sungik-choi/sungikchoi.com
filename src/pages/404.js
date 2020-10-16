import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import SEO from 'components/seo';
import Layout from 'components/layout/layout';
import ThemeContext from 'components/themeContext';
import { DARK } from 'constants/constants';

const NotFound = () => {
  const canvasRef = useRef(null);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const NAV_N_FOOTER_HEIGHT = 114;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / (window.innerHeight - NAV_N_FOOTER_HEIGHT),
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(
      window.innerWidth,
      window.innerHeight - NAV_N_FOOTER_HEIGHT
    );
    canvasRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    const loader = new THREE.FontLoader();

    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
      const geometry = new THREE.TextGeometry('404', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5,
      });
    });

    scene.background = null;
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    const onResize = () => {
      camera.aspect =
        window.innerWidth / (window.innerHeight - NAV_N_FOOTER_HEIGHT);
      camera.updateProjectionMatrix();
      renderer.setSize(
        window.innerWidth,
        window.innerHeight - NAV_N_FOOTER_HEIGHT
      );
    };

    animate();

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <Layout>
      <SEO title="Not found" />
      <main>
        {/* <h1>찾으시는 페이지가 없습니다</h1> */}
        <CanvasWrap ref={canvasRef}></CanvasWrap>
      </main>
    </Layout>
  );
};

const CanvasWrap = styled.div`
  display: flex;
`;

export default NotFound;
