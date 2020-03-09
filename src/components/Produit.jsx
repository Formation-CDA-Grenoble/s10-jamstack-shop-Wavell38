import React, { Component } from 'react';
import Axios from 'axios';

const makeQuery = (slug) => `
query MyQuery {
  produit(filter: {slug: {eq: "${slug}"}}) {
    createdAt
    id
    title
    content
    slug
    price
    img { jpeg: url(imgixParams: {fm: jpg, q: 60})}
  }
}`;

export default class Produit extends Component {
  state = {
    data: null,
  }

  componentDidMount = () => {
    const slug = this.props.match.params.slug;
    const query = makeQuery(slug);

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

    const { produit } = data;

    return (
      <article>
        <h1>{produit.title}</h1>
        <p>{produit.content}</p>
        <p>{produit.price}</p>
      </article>
    );
  }
}
