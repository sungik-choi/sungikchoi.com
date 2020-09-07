import React from 'react';
import styled from 'styled-components';

const CenteredImg = ({ src }) => {
  return (
    <ThumbnailWrapper>
      <Thumbnail>
        <ThumbnailCentered>
          <Image src={src} />
        </ThumbnailCentered>
      </Thumbnail>
    </ThumbnailWrapper>
  );
};

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: ${({ theme }) => theme.color.dimmed};
    transition: 300ms ease;
  }
`;

const ThumbnailCentered = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
`;

const Thumbnail = styled.div`
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
`;

export const Image = styled.img`
  transform: translate(-50%, -50%);
  transition: opacity 1s ease-out, transform 250ms ease;
`;

export default CenteredImg;
