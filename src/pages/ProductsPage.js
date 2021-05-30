import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "../actions/productActions";
import Header from "../components/Header";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useState(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <ProductForm
        open={open}
        handleClose={handleClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <ProductTable
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        setCurrentId={setCurrentId}
      />
    </div>
  );
};

export default ProductsPage;
