import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      I am Index Page
      <Link to="/products">Go to Contact Page</Link>
    </div>
  );
};

export default Index;
