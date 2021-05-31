import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../actions/productActions";
import Header from "../components/Header";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    padding: "2em",
  },
}));

const ProductsPage = () => {
  const classes = useStyles();
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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <Header userInfo={userInfo} />
      <ProductForm
        open={open}
        handleClose={handleClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
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
