import React from 'react';
import styled from 'styled-components';
import CenteredImg from './centeredImg';
import Category from 'styles/category';
import DateTime from 'styles/dateTime';

const PostList = ({ thumbnail, alt, category, title, desc, date, korDate }) => {
  return (
    <div>
      <CenteredImg src={thumbnail} alt={alt} />
      <div>
        <div>
          <Category>{category}</Category>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
        <DateTime dateTime={date}>{korDate}</DateTime>
      </div>
    </div>
  );
};

export default PostList;
