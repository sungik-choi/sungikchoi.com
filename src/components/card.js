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

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.color.card};

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
`;

const Title = styled.h3`
  margin-top: ${({ theme }) => theme.sizing.xs};
  font-size: ${({ theme }) => theme.text.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 1.3;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    font-size: ${({ theme }) => theme.text.md};
  }
`;

const Desc = styled.p`
  line-height: 1.5;
  margin-top: 0.4rem;
  padding-bottom: ${({ theme }) => theme.sizing.sm};
  color: ${({ theme }) => theme.color.text2};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Card;
