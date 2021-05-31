import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import Auth from "./pages/Auth";
import ProductsPage from "./pages/ProductsPage";

const App = () => {
  return (
    <Container>
      <Router>
        <Route path="/" exact component={Auth} />
        <Route path="/products" exact component={ProductsPage} />
      </Router>
    </Container>
  );
};

export default App;
