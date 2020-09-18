import React from 'react';
import styled from 'styled-components';

import CenteredImg from 'components/centeredImg';

import Category from 'styles/category';
import DateTime from 'styles/dateTime';

const Card = ({ thumbnail, alt, category, title, desc, date, korDate }) => {
  return (
    <Wrapper>
      <CenteredImg src={thumbnail} alt={alt} />
      <Text>
        <div>
          <Category>{category}</Category>
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
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.color.white};

  /* Fix Safari overflow:hidden with border radius not working error */
  transform: translateZ(0);
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
  padding: ${({ theme }) => theme.sizing.md};

  & > * {
    display: block;
  }

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    padding: ${({ theme }) => theme.sizing.md};
  }
`;

const Title = styled.h2`
  margin-top: ${({ theme }) => theme.sizing.sm};
  font-size: ${({ theme }) => theme.text.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 1.3;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    font-size: ${({ theme }) => theme.text.lg};
  }
`;

const Desc = styled.p`
  line-height: 1.5;
  margin-top: 0.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Card;
