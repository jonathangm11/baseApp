import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1> 404 - Not found..</h1>
    <p>Go back to <Link to="/">Home</Link></p>
  </div>
);

export default NotFound;
