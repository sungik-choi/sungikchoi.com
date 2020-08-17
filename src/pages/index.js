import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from 'components/layout/layout';
import convertToKorDate from 'utils/convertToKorDate';

const Home = ({ data }) => {
  return (
    <Layout>
      <Background>
        <Post>
          <section>
            <Content>
              <Grid>
                {data.allMarkdownRemark.edges.map(({ node }) => {
                  const { title, desc, date, tag } = node.frontmatter;
                  const korDate = convertToKorDate(date);
                  const ariaLabel = `${title} - ${tag} - Posted on ${korDate}`;
                  return (
                    <List key={node.id}>
                      <Link to={node.fields.slug} aria-label={ariaLabel}>
                        <Card>
                          <ImageContainer>
                            <Image src="https://miro.medium.com/max/2880/1*GgLVXXfYDuS08V1SQQQaeQ.jpeg" />
                          </ImageContainer>
                          <Text>
                            <Tag>{tag}</Tag>
                            <Title>{title}</Title>
                            <Desc>{desc}</Desc>
                            <DateTime role="text" dateTime={date}>
                              {korDate}
                            </DateTime>
                          </Text>
                        </Card>
                      </Link>
                    </List>
                  );
                })}
              </Grid>
            </Content>
          </section>
        </Post>
      </Background>
    </Layout>
  );
};

const Background = styled.div`
  background-color: ${({ theme }) => theme.color.gray1};
  height: 100%;
`;

const Post = styled.main`
  padding-top: ${({ theme }) => theme.sizing.lg};
  max-width: 980px;
  margin: 0 auto;
`;

const Content = styled.div``;

const Grid = styled.ul`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(12, 1fr);
  list-style: none;
  margin: 0;
  padding: 0;
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;*/
`;

const List = styled.li`
  grid-column: span 6;
`;

const Card = styled.article`
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.color.shadow};
`;

const ImageContainer = styled.div`
  width: 100%;
  /* position: relative; */
`;

const Image = styled.img`
  width: 100%;
  /* padding-top: 80%; */
  height: auto;
`;

const Title = styled.h2`
  margin-top: 8px;
  padding: 0;
  font-size: 24px;
  font-weight: 600;
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

const Text = styled.div`
  padding: 24px;
  & > ${Title}, & > ${Tag}, & > ${Desc}, & > ${DateTime} {
    display: block;
    margin-bottom: 0;
  }
`;

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            tag
            date(formatString: "YYYY-MM-DD")
            desc
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default Home;
