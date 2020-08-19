import React from 'react';
import styled from 'styled-components';

const Card = ({ thumbnail, tag, title, desc, date, korDate }) => {
  return (
    <Wrapper>
      <ThumbnailWrapper>
        <Thumbnail>
          <ThumbnailCentered>
            <Image src={thumbnail} />
          </ThumbnailCentered>
        </Thumbnail>
      </ThumbnailWrapper>
      <Text>
        <div>
          <Tag>{tag}</Tag>
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
        </div>
        <DateTime dateTime={date}>{korDate}</DateTime>
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.shadow};
  background-color: ${({ theme }) => theme.color.white};

  /* Fix Safari overflow:hidden with border radius not working error */
  transform: translateZ(0);

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    border-radius: ${({ theme }) => theme.text.md};
  }
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;

  &::after {
    background-color: transparent;
    transition: background-color 250ms ease;
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

const Text = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
  padding: ${({ theme }) => theme.sizing.base};

  & > * {
    display: block;
    margin-bottom: 0;
  }

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    padding: ${({ theme }) => theme.sizing.md};
  }
`;

const Title = styled.h2`
  margin-bottom: 0;
  margin-top: ${({ theme }) => theme.sizing.sm};
  padding: 0;
  font-size: ${({ theme }) => theme.text.md};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  line-height: 1.3;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    font-size: ${({ theme }) => theme.text.lg};
  }
`;

const Tag = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.text.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.color.pink};
`;

const Desc = styled.p`
  line-height: 1.5;
  font-size: 1.0625rem;
  margin-top: 0.8rem;
`;

const DateTime = styled.time`
  margin-top: ${({ theme }) => theme.sizing.md};
  font-size: ${({ theme }) => theme.text.sm};
  color: ${({ theme }) => theme.color.gray2};
`;

export default Card;
