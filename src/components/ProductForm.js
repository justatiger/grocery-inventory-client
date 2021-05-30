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

const useStyles = makeStyles((theme) => ({
  file: {
    marginTop: "15px",
  },
}));

const ProductForm = ({ currentId, setCurrentId, open, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const initialState = {
    name: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
  };

  const [productData, setProductData] = useState(initialState);

  const productDetails = useSelector((state) =>
    currentId ? state.products.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (productDetails) setProductData(productDetails);
  }, [productDetails]);

  const clearData = () => {
    setProductData(initialState);
    setCurrentId(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    if (currentId === 0) {
      dispatch(createProduct(productData));
    } else {
      dispatch(updateProduct(currentId, productData));
    }

    clearData();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Product Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`${currentId === 0 ? "add" : "update"} product details.`}
        </DialogContentText>

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
