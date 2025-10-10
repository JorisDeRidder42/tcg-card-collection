import React from 'react';
import { useNavigate } from 'react-router-dom';

const Fault = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h1 className="display-1">404</h1>
      <p className="lead">Page not found</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Back Home
      </button>
    </div>
  );
};

export default Fault;
