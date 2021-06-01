import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../actions/productActions";
import Header from "../components/Header";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import { makeStyles } from "@material-ui/core/styles";

// custom styles
const useStyles = makeStyles((theme) => ({
  table: {
    padding: "2em",
  },
}));

// Default function
const ProductsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  // Open add product form
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close add product form
  const handleClose = () => {
    setOpen(false);
  };

  // triggers to get all products
  useState(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Get the state of user login and user details
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      {/* Top Bar */}
      <Header userInfo={userInfo} />
      {/* Add product button */}
      <ProductForm
        open={open}
        handleClose={handleClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      {/* Product Table */}
      <div className={classes.table}>
        <ProductTable
          open={open}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          setCurrentId={setCurrentId}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
