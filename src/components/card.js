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
        <Tag>{tag}</Tag>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
        <DateTime dateTime={date}>{korDate}</DateTime>
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background-color: #fff;
  border-radius: 18px;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.color.shadow};
`;

const ThumbnailWrapper = styled.div`
  width: 100%;
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

const Image = styled.img`
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
`;

const Text = styled.div`
  padding: 24px;
  & > * {
    display: block;
    margin-bottom: 0;
  }
`;

const Title = styled.h2`
  margin-top: 8px;
  padding: 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
`;

const Tag = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #e94256;
`;

const Desc = styled.p`
  margin-top: 18px;
`;

const DateTime = styled.time`
  margin-top: 24px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray2};
`;

export default Card;
