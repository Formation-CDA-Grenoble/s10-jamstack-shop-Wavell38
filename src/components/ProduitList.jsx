import React, { Component } from 'react';
import Axios from 'axios';
import ProduitPreview from './ProduitPreview';
import { Button } from 'react-bootstrap';

const query = `
query MyQuery {
  allProduits {
    id
    title
    content
    createdAt
    slug
    price
    img  { jpeg: url(imgixParams: {fm: jpg, q: 60})}
  }
}`;

const queryCategories = `
query MyQuery {
  allCategories {
    id
    title
    createdAt
    slug
    color {
        hex
        }
  }
}`;

export default class ProduitList extends Component {
  state = {
    data: null,
    dataCategories: null
  }

    componentDidMount = () => {
        this.getAllCategories();
        this.getAllProduits();
    }

    getAllProduits = () => {
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

  getAllCategories = () => {
    Axios.post(
        // GraphQL endpoint
        'https://graphql.datocms.com/',
        // Requête GraphQL
        { query:queryCategories },
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
          this.setState({ dataCategories: data });
        }
      })
      .catch(error => console.error(error));
    }

    getAllProduitsByCategory = (id) => {

        const produitsByCategory = `
            query MyQuery {
                allProduits(filter: {produitCategories: {allIn: "${id}"}}) {
                id
                price
                slug
                title
                img { jpeg: url(imgixParams: {fm: jpg, q: 60})}
                produitCategories {
                    title
                    slug
                    color {
                    hex
                    }
                }
                }
            }
          `;
        Axios.post(
            // GraphQL endpoint
            'https://graphql.datocms.com/',
            // Requête GraphQL
            { query: produitsByCategory },
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

    handleClick = (event, id) => {
        this.getAllProduitsByCategory(id);
    }

  render = () => {
    const { data, dataCategories } = this.state;
    if (data === null || dataCategories === null) {
      return <div>Loading...</div>;
    }

    return (
        <>
        <nav>
            <ul style={{ listStyle: 'none' }}>
                { dataCategories.allCategories.map((category, index) => {
                    return(
                        <li key={ `category${index}` }>
                            <Button style={{ backgroundColor: category.color.hex, borderColor: category.color.hex }}onClick={ (event, id = category.id) => { this.handleClick(event, id) }}>
                                { category.title }
                            </Button>
                        </li>
                    )
                }) }
            </ul>
        </nav>
      <ul style={{ listStyle: 'none' }}>
        { data.allProduits.map( (produit, index) =>
          <li key={index}>
            <ProduitPreview {...produit} />
          </li>
        )}
      </ul>
      </>
    );
  }
}
