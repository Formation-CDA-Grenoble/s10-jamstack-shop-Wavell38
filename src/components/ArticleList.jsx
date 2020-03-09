import React, { Component } from 'react';
import Axios from 'axios';
import ArticlePreview from './ArticlePreview';

const query = `
query MyQuery {
  allArticles {
    id
    title
    content
    createdAt
    slug
    cover {
      url
    }
    category {
      id
      name
    }
  }
}`;

export default class ArticleList extends Component {
  state = {
    data: null,
  }

  componentDidMount = () => {
    Axios.post(
      // GraphQL endpoint
      'https://graphql.datocms.com/',
      // Requête GraphQL
      { query },
      // Options pour authentifier notre requête
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_DATOCMS_API_KEY}`,
        } 
      },
    )
    .then(response => {
      if (response.data.hasOwnProperty('errors')) {
        for (let error of response.data.errors) {
          console.error('Error while querying GraphQL API:', error.message);
        }
      } else {
        const { data } = response.data;
        this.setState({ data });
      }
    })
    .catch(error => console.error(error));
  }

  render = () => {
    const { data } = this.state;

    if (data === null) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {data.allArticles.map( (article, index) =>
          <li key={index}>
            <ArticlePreview {...article} />
          </li>
        )}
      </ul>
    );
  }
}
