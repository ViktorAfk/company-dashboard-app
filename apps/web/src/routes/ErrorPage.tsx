import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
  return (
    <section>
      <p>Oops! Something went wrong!</p>
      <Link to={'/'}>Go Home</Link>
    </section>
  );
};
