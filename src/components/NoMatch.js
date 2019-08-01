import React from 'react';
import {Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';


const NoMatch = () => {
  return(
  <Card className="noMatchStyle col-md-12 col-sm-12">
    <Card.Header>Error: 404 - Page Not Found</Card.Header>
    <Card.Body>Whoops. This page doesn't exist. Please return <Link to='/' style={{cursor: 'pointer', color: 'blue'}}>Home</Link>.</Card.Body>
  </Card>
  )
}

export default NoMatch; 