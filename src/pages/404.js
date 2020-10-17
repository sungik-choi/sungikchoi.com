import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SEO from 'components/seo';
import Layout from 'components/layout/layout';
import GlowParticle from 'utils/glowParticle';

const COLORS = [
  { r: 255, g: 149, b: 0 }, // orange
  { r: 255, g: 45, b: 85 }, // pink
  { r: 175, g: 82, b: 222 }, // purple
  { r: 255, g: 59, b: 48 }, // red
  { r: 255, g: 204, b: 0 }, //yellow
  // { r: 0, g: 122, b: 255 }, // blue
  // { r: 52, g: 199, b: 89 }, // green
  // { r: 88, g: 86, b: 214 }, // indigo
  // { r: 90, g: 200, b: 250 }, // teal
];

const NotFound = () => {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const isCreated = useRef(false);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    let stageWidth = document.body.clientWidth;
    let stageHeight = document.body.clientHeight;
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    const totalParticles = 5;
    const maxRadius = 900;
    const minRadius = 500;

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
      stageWidth = document.body.clientWidth;
      stageHeight = document.body.clientHeight;

      canvasObj.width = stageWidth * pixelRatio;
      canvasObj.height = stageHeight * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
      ctx.globalCompositeOperation = 'saturation';
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
        <TitleWrap>
          <Title>404</Title>
          <Divider />
          <Desc>Page not found</Desc>
        </TitleWrap>
        <Canvas ref={canvasRef} />
      </Container>
    </Layout>
  );
};

const Container = styled.main`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 45, 85);
`;

const Divider = styled.div`
  width: 100%;
  height: 4px;
  margin: 1rem 0 1.5rem 0;
  background-color: rgba(255, 255, 255, 0.5);
`;

const TitleWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
`;

const Title = styled.h1`
  color: white;
  font-size: 8rem;
`;

const Desc = styled.h2`
  color: white;
  font-size: 2.5rem;
`;

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default NotFound;