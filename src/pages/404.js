import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SEO from 'components/seo';
import Layout from 'components/layout/layout';
import GlowParticle from 'utils/glowParticle';

const COLORS = [
  { r: 0, g: 122, b: 255 }, // blue
  { r: 52, g: 199, b: 89 }, // green
  { r: 88, g: 86, b: 214 }, // indigo
  { r: 255, g: 149, b: 0 }, // orange
  { r: 255, g: 45, b: 85 }, // pink
  { r: 175, g: 82, b: 222 }, // purple
  { r: 255, g: 59, b: 48 }, // red
  { r: 90, g: 200, b: 250 }, // teal
  { r: 255, g: 204, b: 0 }, //yellow
];

const NotFound = () => {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const isCreated = useRef(false);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    let stageWidth = canvasObj.clientWidth;
    let stageHeight = canvasObj.clientHeight;
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    const totalParticles = 1;
    const maxRadius = 90;
    const minRadius = 40;

    const createParticles = () => {
      let colorIndex = 0;
      setParticles([]);

      for (let i = 0; i < totalParticles; i++) {
        const newParticle = new GlowParticle({
          x: Math.random() * stageWidth,
          y: Math.random() * stageHeight,
          radius: Math.random() * (maxRadius - minRadius) + minRadius,
          rgb: COLORS[colorIndex],
        });

        if (++colorIndex >= COLORS.length) colorIndex = 0;

        setParticles((prevParticles) => [...prevParticles, newParticle]);
      }
    };

    let requestId;
    const render = () => {
      ctx.clearRect(0, 0, stageWidth, stageHeight);
      for (let i = 0; i < totalParticles; i++) {
        const item = particles[i];
        if (!item) return;
        item.animate(ctx, stageWidth, stageHeight);
      }
      requestId = requestAnimationFrame(render);
    };

    const resize = () => {
      stageWidth = canvasObj.clientWidth;
      stageHeight = canvasObj.clientHeight;

      canvasObj.width = stageWidth * pixelRatio;
      canvasObj.height = stageHeight * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
      ctx.clearRect(0, 0, stageWidth, stageHeight);

      isCreated.current = true;
      createParticles();
    };

    if (!isCreated.current) resize();
    render();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(requestId);
    };
  });

  return (
    <Layout>
      <SEO title="Not found" />
      <Container>
        <Canvas ref={canvasRef} />
      </Container>
    </Layout>
  );
};

const Container = styled.main`
  min-height: calc(100vh - var(--nav-height) - var(--footer-height));
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default NotFound;
