/* This file displays the pop up FORM */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import {
  DialogActions,
  TextField,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { createProduct, updateProduct } from "../actions/productActions";

// Custom styles
const useStyles = makeStyles((theme) => ({
  file: {
    marginTop: "15px",
  },
}));

// Pass in the currentId to decide if user is adding new data or update an existing data
const ProductForm = ({ currentId, setCurrentId, open, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // Initial object with empty fields
  const initialState = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
  };

  // Initialize product data with empty fields
  const [productData, setProductData] = useState(initialState);

  // Retrieve if there's a matching product id
  const productDetails = useSelector((state) =>
    currentId ? state.products.find((p) => p._id === currentId) : null
  );

  // Trigger once to set product details if there's data retrieved
  useEffect(() => {
    if (productDetails) setProductData(productDetails);
  }, [productDetails]);

  // Resets data to empty string again
  const clearData = () => {
    setProductData(initialState);
    setCurrentId(0);
  };

  // handles form on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    if (currentId === 0) {
      dispatch(createProduct(productData));
    } else {
      dispatch(updateProduct(currentId, productData));
    }

    // Resets form
    clearData();
  };

  return (
    // Pop up Form
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      {/* Form Title */}
      <DialogTitle id="form-dialog-title">Product Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`${currentId === 0 ? "add" : "update"} product details.`}
        </DialogContentText>

        {/* Input fields */}
        <TextField
          autoFocus
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={productData.name}
          onChange={(e) =>
            setProductData({ ...productData, name: e.target.value })
          }
        />
        <TextField
          autoFocus
          id="description"
          label="Description"
          multiline
          rows={3}
          type="text"
          fullWidth
          value={productData.description}
          onChange={(e) =>
            setProductData({ ...productData, description: e.target.value })
          }
        />
        <TextField
          autoFocus
          id="price"
          label="Price"
          type="text"
          fullWidth
          value={productData.price}
          onChange={(e) =>
            setProductData({ ...productData, price: e.target.value })
          }
        />
        <TextField
          autoFocus
          id="quantity"
          label="Quantity"
          type="text"
          fullWidth
          value={productData.quantity}
          onChange={(e) =>
            setProductData({ ...productData, quantity: e.target.value })
          }
        />
        <div className={classes.file}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setProductData({ ...productData, imageUrl: base64 })
            }
          />
        </div>
      </DialogContent>
      {/* Buttons */}
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          {`${currentId === 0 ? "Add" : "Update"} Product`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
