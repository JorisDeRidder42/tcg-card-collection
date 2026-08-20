import React from 'react';
import { useNavigate } from 'react-router-dom';

const Fault = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h1 className="text-light">404</h1>
      <h6 className="text-light">Page not found</h6>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Back Home
      </button>
    </div>
  );
};

export default Fault;
