import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProduitPreview = ({ title, content, createdAt, slug, price, img }) =>
  <Card>
    <Card.Header as="h3">
      {title}
    </Card.Header>
    <Card.Body>
        <Image src={img.jpeg} fluid />
      {content}
      <div>{price}</div>
      <div>
        <Link to={`/produit/${slug}`}>
          <Button variant="primary">Read more...</Button>
        </Link>
      </div>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">
        Published on {new Date(createdAt).toLocaleString('en-EN')}
      </small>
    </Card.Footer>
  </Card>
;

export default ProduitPreview;
