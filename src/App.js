import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import ProductsPage from "./pages/ProductsPage";

const App = () => {
  return (
    <Router>
      {/* Sign in page */}
      <Route path="/" exact component={Auth} />
      {/* Product page */}
      <Route path="/products" exact component={ProductsPage} />
    </Router>
  );
};

export default App;
